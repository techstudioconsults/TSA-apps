import axios from "axios";

import type {
  AdminLecture,
  VideoStatus,
} from "@/services/learning/learning.types";
import type { PillTone } from "./status-pill";

/** The API's message, or a fallback a person can act on. */
export function apiError(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
): string {
  if (axios.isAxiosError(error)) {
    if (!error.response)
      return "Couldn't reach the server. Check your connection and try again.";
    const message = (error.response.data as { message?: unknown } | undefined)
      ?.message;
    if (typeof message === "string" && message) return message;
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

export function formatDuration(totalSeconds: number): string {
  const seconds = Math.max(0, Math.floor(totalSeconds || 0));
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

export function formatDate(value: string | null | undefined): string {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
}

/** yyyy-mm-dd for <input type="date">, from an ISO string. */
export function toDateInput(value: string | null | undefined): string {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

/** End of the chosen day in Lagos (UTC+1), as ISO. */
export function fromDateInput(value: string): string | null {
  if (!value) return null;
  return new Date(`${value}T23:59:59+01:00`).toISOString();
}

export const videoStatusLabel: Record<VideoStatus, string> = {
  none: "No video",
  uploading: "Uploading",
  processing: "Processing",
  ready: "Video ready",
  failed: "Processing failed",
};

/** What a lecture's status pill says. Video lectures can't be published until Bunny has finished. */
export function lectureState(lecture: AdminLecture): {
  tone: PillTone;
  label: string;
} {
  if (lecture.type === "video" && lecture.videoStatus !== "ready") {
    const tone: PillTone =
      lecture.videoStatus === "failed"
        ? "danger"
        : lecture.videoStatus === "none"
          ? "neutral"
          : "info";
    return {
      tone,
      label:
        lecture.videoStatus === "none"
          ? "Needs video"
          : videoStatusLabel[lecture.videoStatus],
    };
  }
  return lecture.published
    ? { tone: "success", label: "Published" }
    : { tone: "warning", label: "Ready to publish" };
}
