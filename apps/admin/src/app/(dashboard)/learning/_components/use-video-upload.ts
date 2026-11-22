"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as tus from "tus-js-client";

import { learningService } from "@/services/learning/learning.service";
import { apiError } from "./utils";

export type UploadState =
  | { phase: "idle" }
  | { phase: "preparing"; fileName: string }
  | {
      phase: "uploading";
      fileName: string;
      sent: number;
      total: number;
      startedAt: number;
    }
  | { phase: "done"; fileName: string }
  | { phase: "error"; fileName: string; message: string };

export const MAX_VIDEO_BYTES = 8 * 1024 ** 3; // 8 GB

export function validateVideoFile(file: File): string | null {
  if (
    !file.type.startsWith("video/") &&
    !/\.(mp4|mov|m4v|mkv|webm|avi)$/i.test(file.name)
  ) {
    return "Choose a video file (MP4, MOV, MKV, WebM or AVI).";
  }
  if (file.size === 0) return "That file is empty.";
  if (file.size > MAX_VIDEO_BYTES)
    return "That file is over 8 GB. Export it at 1080p and try again.";
  return null;
}

/**
 * Uploads a video straight from the browser to Bunny Stream with TUS
 * (resumable, so a dropped connection picks up where it stopped). The API
 * only hands out a short-lived signature; the file never touches our server.
 */
export function useVideoUpload(lectureId: string, onUploaded: () => void) {
  const [state, setState] = useState<UploadState>({ phase: "idle" });
  const uploadRef = useRef<tus.Upload | null>(null);
  const onUploadedRef = useRef(onUploaded);
  onUploadedRef.current = onUploaded;

  const active = state.phase === "preparing" || state.phase === "uploading";

  // Warn before closing the tab mid-upload
  useEffect(() => {
    if (!active) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [active]);

  useEffect(() => () => void uploadRef.current?.abort(), []);

  const start = useCallback(
    async (file: File) => {
      const problem = validateVideoFile(file);
      if (problem) {
        setState({ phase: "error", fileName: file.name, message: problem });
        return;
      }
      setState({ phase: "preparing", fileName: file.name });
      try {
        const { upload } = await learningService.startVideoUpload(lectureId);
        const headers = Object.fromEntries(
          Object.entries(upload.headers).map(([k, v]) => [k, String(v)]),
        );
        const metadata: Record<string, string> = {
          filetype: file.type || "video/mp4",
        };
        for (const [key, value] of Object.entries(upload.metadata))
          if (value) metadata[key] = value;

        const startedAt = Date.now();
        const tusUpload = new tus.Upload(file, {
          endpoint: upload.endpoint,
          headers,
          metadata,
          retryDelays: [0, 3000, 5000, 10000, 20000, 60000],
          chunkSize: 50 * 1024 * 1024,
          removeFingerprintOnSuccess: true,
          onProgress: (sent, total) =>
            setState({
              phase: "uploading",
              fileName: file.name,
              sent,
              total,
              startedAt,
            }),
          onError: (error) =>
            setState({
              phase: "error",
              fileName: file.name,
              message: `Upload stopped: ${error.message.split("\n")[0]}. Choose the file again to retry.`,
            }),
          onSuccess: () => {
            setState({ phase: "done", fileName: file.name });
            onUploadedRef.current();
          },
        });
        uploadRef.current = tusUpload;
        setState({
          phase: "uploading",
          fileName: file.name,
          sent: 0,
          total: file.size,
          startedAt,
        });
        tusUpload.start();
      } catch (error) {
        setState({
          phase: "error",
          fileName: file.name,
          message: apiError(error, "Couldn't start the upload."),
        });
      }
    },
    [lectureId],
  );

  const cancel = useCallback(() => {
    void uploadRef.current?.abort(true);
    uploadRef.current = null;
    setState({ phase: "idle" });
  }, []);

  return { state, start, cancel, active };
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024 ** 2) return `${Math.max(0, Math.round(bytes / 1024))} KB`;
  if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(0)} MB`;
  return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
}

/** "About 4 min left", from bytes sent so far. */
export function timeLeft(
  sent: number,
  total: number,
  startedAt: number,
  now = Date.now(),
): string | null {
  const elapsed = (now - startedAt) / 1000;
  if (sent <= 0 || elapsed < 3) return null;
  const seconds = ((total - sent) / sent) * elapsed;
  if (seconds < 60) return "Less than a minute left";
  if (seconds < 3600) return `About ${Math.round(seconds / 60)} min left`;
  return `About ${(seconds / 3600).toFixed(1)} h left`;
}
