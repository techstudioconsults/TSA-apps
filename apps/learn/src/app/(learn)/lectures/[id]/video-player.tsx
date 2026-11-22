"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

import {
  ProgressReporter,
  resumePosition,
} from "@/features/player/progress-reporter";
import { useBunnyPlayer } from "@/features/player/use-bunny-player";
import { learnService } from "@/services/learn/learn.service";
import { refreshProgressViews } from "@/services/learn/learn.queries";
import { queryKeys } from "@/lib/react-query/query-keys";
import type { LectureDetail } from "@/services/learn/learn.types";

/**
 * Keeps the cached lecture in step with the player, so coming back to it
 * resumes from the latest position instead of the one fetched on first open.
 * (Refetching would also work, but issues a new signed URL and reloads the video.)
 */
function rememberProgress(
  client: ReturnType<typeof useQueryClient>,
  lectureId: string,
  patch: Partial<LectureDetail["progress"]>,
) {
  client.setQueryData<LectureDetail>(queryKeys.lecture(lectureId), (old) =>
    old ? { ...old, progress: { ...old.progress, ...patch } } : old,
  );
}

export function VideoPlayer({
  lecture,
  track,
}: {
  lecture: LectureDetail;
  track: boolean;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const client = useQueryClient();
  const reporter = useRef(
    new ProgressReporter(lecture.progress.lastPositionSeconds),
  );
  const completed = useRef(lecture.progress.completed);
  const sending = useRef(false);

  const queuedEnded = useRef(false);

  const send = async (ended = false): Promise<void> => {
    if (!track) return;
    if (sending.current) {
      // Never drop the final report; send it once the current one returns
      if (ended) queuedEnded.current = true;
      return;
    }
    sending.current = true;
    const position = reporter.current.markSent(Date.now());
    try {
      const result = await learnService.saveProgress(
        lecture.id,
        position,
        ended,
      );
      rememberProgress(client, lecture.id, {
        lastPositionSeconds: position,
        completed: result.completed,
      });
      if (result.completed && !completed.current) {
        completed.current = true;
        toast.success("Lecture done. Nice work.");
        void refreshProgressViews(client);
      }
    } catch {
      // A missed heartbeat is caught up by the next one
    } finally {
      sending.current = false;
      if (queuedEnded.current) {
        queuedEnded.current = false;
        void send(true);
      }
    }
  };

  useBunnyPlayer(iframeRef, lecture.video?.url, {
    onReady: (player) => {
      const start = resumePosition(
        lecture.progress.lastPositionSeconds,
        lecture.durationSeconds,
      );
      if (start > 0) player.setCurrentTime(start);
    },
    onTime: (seconds) => {
      if (reporter.current.update(seconds, Date.now())) void send();
    },
    onPause: () => {
      if (reporter.current.hasUnsent()) void send();
    },
    onEnded: () => void send(true),
  });

  // Save on tab hide / close and when leaving the lecture inside the app
  useEffect(() => {
    if (!track) return;
    const flush = () => {
      if (reporter.current.hasUnsent()) {
        const position = reporter.current.markSent(Date.now());
        learnService.saveProgressOnLeave(lecture.id, position);
        rememberProgress(client, lecture.id, { lastPositionSeconds: position });
      }
    };
    const onVisibility = () => document.visibilityState === "hidden" && flush();
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", flush);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", flush);
      flush();
      void refreshProgressViews(client);
    };
  }, [lecture.id, track, client]);

  if (!lecture.video) return null;
  return (
    <div className="bg-navy relative aspect-video w-full overflow-hidden rounded-2xl">
      <iframe
        ref={iframeRef}
        src={lecture.video.url}
        title={lecture.title}
        loading="eager"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 size-full border-0"
      />
    </div>
  );
}
