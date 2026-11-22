"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query";

import { queryKeys } from "@/lib/react-query/query-keys";
import { learnService } from "./learn.service";

export function useMyCourses() {
  return useQuery({
    queryKey: queryKeys.courses,
    queryFn: learnService.myCourses,
  });
}

export function useContinueLearning() {
  return useQuery({
    queryKey: queryKeys.continue,
    queryFn: learnService.continueLearning,
  });
}

export function useCourseOutline(idOrSlug: string) {
  return useQuery({
    queryKey: queryKeys.outline(idOrSlug),
    queryFn: () => learnService.outline(idOrSlug),
  });
}

export function useLecture(id: string) {
  return useQuery({
    queryKey: queryKeys.lecture(id),
    queryFn: () => learnService.lecture(id),
    // The player URL is signed for 2 hours; refetch rather than reuse a stale one
    staleTime: 30 * 60 * 1000,
  });
}

/**
 * Refreshes the views that show progress. Skips the open lecture itself:
 * refetching it would issue a new signed URL and reload the video.
 */
export function refreshProgressViews(client: QueryClient) {
  return client.invalidateQueries({
    predicate: (query) =>
      query.queryKey[0] === "learn" && query.queryKey[1] !== "lecture",
  });
}

/** Marks a reading lecture as done and refreshes every view that shows progress. */
export function useCompleteLecture(lectureId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: () => learnService.complete(lectureId),
    onSuccess: () => refreshProgressViews(client),
  });
}
