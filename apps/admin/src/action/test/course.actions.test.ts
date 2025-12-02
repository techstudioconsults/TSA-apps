import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  createCourseAction,
  deleteCourseAction,
  fetchCoursesAction,
  getCourseByIdAction,
  getTotalCourseAction,
  updateCourseAction,
} from "~/action/course.actions";

const token = "dummy-token";
const courseId = "123";

const dummyCourse = {
  id: courseId,
  title: "React",
  about: "Learn React",
  duration: { online: 4, weekday: 6, weekend: 8 },
  classCount: { onlineCount: 1, weekdayCount: 2, weekendCount: 3 },
  createdAt: "2024-01-01",
  curriculum: "url.pdf",
};

beforeEach(() => {
  vi.resetAllMocks();
});

describe("Course Actions", () => {
  it("fetches all courses", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          data: { items: [dummyCourse] },
        }),
      }),
    );

    const result = await fetchCoursesAction(token);
    expect(result).toEqual([
      {
        id: courseId,
        title: "React",
        description: "Learn React",
        duration: dummyCourse.duration,
        curriculum: "url.pdf",
      },
    ]);
  });

  it("throws error if fetchCoursesAction fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, statusText: "Forbidden" }),
    );
    await expect(fetchCoursesAction(token)).rejects.toThrow(
      "Failed to fetch courses: Forbidden",
    );
  });

  it("creates a course", async () => {
    const formData = new FormData();
    formData.append("title", "React");

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ title: "React" }),
      }),
    );

    const result = await createCourseAction(formData, token);
    expect(result).toEqual({ title: "React" });
  });

  it("throws error if course creation fails", async () => {
    const formData = new FormData();
    formData.append("title", "React");

    const errorBody = { message: "Title is required" };
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => errorBody,
      }),
    );

    await expect(createCourseAction(formData, token)).rejects.toEqual({
      status: 400,
      message: "Title is required",
      details: errorBody,
    });
  });

  it("fetches a course by ID", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ data: dummyCourse }),
      }),
    );

    const result = await getCourseByIdAction(courseId, token);
    expect(result).toEqual({
      id: courseId,
      title: "React",
      description: "Learn React",
      duration: dummyCourse.duration,
      curriculum: "url.pdf",
    });
  });

  it("throws error if getCourseById fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        statusText: "Not Found",
      }),
    );

    await expect(getCourseByIdAction(courseId, token)).rejects.toThrow(
      "Failed to fetch course: Not Found",
    );
  });

  it("updates a course", async () => {
    const formData = new FormData();
    formData.append("title", "Updated React");

    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));

    await expect(
      updateCourseAction(courseId, formData, token),
    ).resolves.toBeUndefined();
  });

  it("throws error if update fails", async () => {
    const formData = new FormData();
    formData.append("title", "React");

    const errorBody = { message: "Invalid data" };
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 422,
        json: async () => errorBody,
      }),
    );

    await expect(updateCourseAction(courseId, formData, token)).rejects.toEqual(
      {
        status: 422,
        message: "Invalid data",
        details: errorBody,
      },
    );
  });
  it("deletes a course", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));

    await expect(deleteCourseAction(courseId, token)).resolves.toBeUndefined();
  });

  it("throws error if delete fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        statusText: "Not Found",
      }),
    );

    await expect(deleteCourseAction(courseId, token)).rejects.toThrow(
      "Failed to delete course: Not Found",
    );
  });

  it("gets total number of courses", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ data: { totalCourses: 5 } }),
      }),
    );

    const result = await getTotalCourseAction(token);
    expect(result).toBe(5);
  });

  it("returns 0 on error in getTotalCourseAction", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Server Error")),
    );

    const result = await getTotalCourseAction(token);
    expect(result).toBe(0);
  });
});
