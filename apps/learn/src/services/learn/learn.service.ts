import { config } from "@/lib/config";
import { http, unwrap } from "@/lib/http/http";
import { tokenManager } from "@/lib/http/token-manager";
import type {
  ContinueLearning,
  CourseOutline,
  LectureDetail,
  MyCourse,
  ProgressResult,
} from "./learn.types";

export const learnService = {
  myCourses: () => unwrap<MyCourse[]>(http.get("/learn/courses")),

  outline: (idOrSlug: string) =>
    unwrap<CourseOutline>(
      http.get(`/learn/courses/${encodeURIComponent(idOrSlug)}`),
    ),

  continueLearning: () =>
    unwrap<ContinueLearning | null>(http.get("/learn/continue")),

  lecture: (id: string) =>
    unwrap<LectureDetail>(
      http.get(`/learn/lectures/${encodeURIComponent(id)}`),
    ),

  saveProgress: (id: string, positionSeconds: number, ended = false) =>
    unwrap<ProgressResult>(
      http.put(`/learn/lectures/${encodeURIComponent(id)}/progress`, {
        positionSeconds: Math.max(0, Math.floor(positionSeconds)),
        ended,
      }),
    ),

  /**
   * Last-chance save when the tab is hidden or closed. `keepalive` lets the
   * request finish after the page is gone (axios can't do that).
   */
  saveProgressOnLeave: (id: string, positionSeconds: number) => {
    const token = tokenManager.getAccessToken();
    if (!token) return;
    void fetch(
      `${config.apiUrl}/learn/lectures/${encodeURIComponent(id)}/progress`,
      {
        method: "PUT",
        keepalive: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          positionSeconds: Math.max(0, Math.floor(positionSeconds)),
          ended: false,
        }),
      },
    ).catch(() => undefined);
  },

  complete: (id: string) =>
    unwrap<{ completed: true }>(
      http.post(`/learn/lectures/${encodeURIComponent(id)}/complete`),
    ),
};
