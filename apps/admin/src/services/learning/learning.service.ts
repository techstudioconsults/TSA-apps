import { HttpAdapter } from "@/lib/http/http-adapter";
import type {
  AdminLecture,
  AdminLectureDetail,
  AdminSection,
  CohortOption,
  CourseContentSummary,
  CourseEnrolments,
  CourseOption,
  Curriculum,
  EnrolmentStatus,
  LectureType,
  VideoUpload,
} from "./learning.types";

const http = new HttpAdapter();
const id = (value: string) => encodeURIComponent(value);

async function data<T>(
  request: Promise<HttpResponse<ApiResponse<T>> | undefined>,
): Promise<T> {
  const response = await request;
  if (!response) throw new Error("No response from the server");
  return response.data.data;
}

export class LearningService {
  // Content ----------------------------------------------------------------
  getCoursesSummary() {
    return data<CourseContentSummary[]>(http.get("/content/courses"));
  }

  getCurriculum(courseId: string) {
    return data<Curriculum>(http.get(`/courses/${id(courseId)}/curriculum`));
  }

  createSection(courseId: string, title: string) {
    return data<Omit<AdminSection, "lectures">>(
      http.post(`/courses/${id(courseId)}/sections`, { title }),
    );
  }

  reorderSections(courseId: string, ids: string[]) {
    return data<unknown>(
      http.patch(`/courses/${id(courseId)}/sections/reorder`, { ids }),
    );
  }

  renameSection(sectionId: string, title: string) {
    return data<unknown>(http.patch(`/sections/${id(sectionId)}`, { title }));
  }

  deleteSection(sectionId: string) {
    return data<unknown>(http.delete(`/sections/${id(sectionId)}`));
  }

  createLecture(
    sectionId: string,
    payload: { title: string; type: LectureType },
  ) {
    return data<AdminLecture>(
      http.post(`/sections/${id(sectionId)}/lectures`, payload),
    );
  }

  reorderLectures(sectionId: string, ids: string[]) {
    return data<unknown>(
      http.patch(`/sections/${id(sectionId)}/lectures/reorder`, { ids }),
    );
  }

  getLecture(lectureId: string) {
    return data<AdminLectureDetail>(http.get(`/lectures/${id(lectureId)}`));
  }

  updateLecture(
    lectureId: string,
    payload: Partial<{
      title: string;
      body: string | null;
      isPreview: boolean;
      published: boolean;
      sectionId: string;
    }>,
  ) {
    return data<AdminLecture>(
      http.patch(`/lectures/${id(lectureId)}`, payload),
    );
  }

  deleteLecture(lectureId: string) {
    return data<unknown>(http.delete(`/lectures/${id(lectureId)}`));
  }

  startVideoUpload(lectureId: string) {
    return data<VideoUpload>(
      http.post(`/lectures/${id(lectureId)}/video-upload`, {}),
    );
  }

  syncVideo(lectureId: string) {
    return data<AdminLecture>(
      http.post(`/lectures/${id(lectureId)}/video-sync`, {}),
    );
  }

  // Enrolments -------------------------------------------------------------
  getCourseEnrolments(courseId: string, page = 1, limit = 50) {
    return data<CourseEnrolments>(
      http.get(`/courses/${id(courseId)}/enrolments`, { page, limit }),
    );
  }

  enrolStudent(payload: {
    courseId: string;
    email: string;
    expiresAt?: string | null;
  }) {
    return data<unknown>(http.post("/enrolments", payload));
  }

  enrolCohort(cohortId: string, expiresAt?: string | null) {
    return data<{
      cohortId: string;
      courseId: string;
      students: number;
      created: number;
    }>(
      http.post(
        `/cohorts/${id(cohortId)}/enrolments`,
        expiresAt ? { expiresAt } : {},
      ),
    );
  }

  updateEnrolment(
    enrolmentId: string,
    payload: Partial<{ status: EnrolmentStatus; expiresAt: string | null }>,
  ) {
    return data<unknown>(http.patch(`/enrolments/${id(enrolmentId)}`, payload));
  }

  sendPasswordLink(userId: string) {
    return data<{ sent: true; expiresAt: string }>(
      http.post(`/users/${id(userId)}/password-link`, {}),
    );
  }

  // Lookups for the enrol form ---------------------------------------------
  async getCourseOptions() {
    const response = await http.get<PaginatedApiResponse<CourseOption>>(
      "/courses",
      { page: 1, limit: 100 },
    );
    return response?.data.data.items ?? [];
  }

  async getCohortOptions(courseId: string) {
    const response = await http.get<PaginatedApiResponse<CohortOption>>(
      "/cohorts",
      { courseId, page: 1, limit: 100 },
    );
    return response?.data.data.items ?? [];
  }
}

export const learningService = new LearningService();
