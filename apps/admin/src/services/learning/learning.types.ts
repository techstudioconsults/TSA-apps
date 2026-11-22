export type LectureType = "video" | "text";
export type VideoStatus =
  | "none"
  | "uploading"
  | "processing"
  | "ready"
  | "failed";
export type EnrolmentStatus = "active" | "revoked";

export interface CourseContentSummary {
  id: string;
  title: string;
  slug: string | null;
  sections: number;
  lectures: number;
  published: number;
  readyToPublish: number;
  processing: number;
  failed: number;
  enrolled: number;
  averageProgress: number;
}

export interface AdminLecture {
  id: string;
  courseId: string;
  sectionId: string;
  title: string;
  type: LectureType;
  position: number;
  body: string | null;
  isPreview: boolean;
  published: boolean;
  publishedAt: string | null;
  videoStatus: VideoStatus;
  bunnyVideoId: string | null;
  durationSeconds: number;
}

export interface AdminLectureDetail extends AdminLecture {
  embed: { url: string; expiresAt: string } | null;
}

export interface AdminSection {
  id: string;
  courseId: string;
  title: string;
  position: number;
  lectures: AdminLecture[];
}

export interface Curriculum {
  course: {
    id: string;
    title: string;
    slug: string | null;
    bunnyCollectionId: string | null;
  };
  sections: AdminSection[];
}

export interface VideoUpload {
  lecture: AdminLecture;
  upload: {
    endpoint: string;
    headers: Record<string, string | number>;
    metadata: Record<string, string | null>;
    expiresAt: string;
  };
}

export interface EnrolmentRow {
  id: string;
  studentId: string;
  courseId: string;
  cohortId: string | null;
  source: string;
  status: EnrolmentStatus;
  startsAt: string;
  expiresAt: string | null;
  completedAt: string | null;
  active: boolean;
  student: {
    id: string;
    userId: string | null;
    firstName: string;
    lastName: string;
    email: string;
  };
  cohort: { id: string; title: string } | null;
  progress: {
    completedLectures: number;
    totalLectures: number;
    percent: number;
    lastActivityAt: string | null;
  };
}

export interface CourseEnrolments {
  course: { id: string; title: string };
  totalLectures: number;
  page: number;
  limit: number;
  total: number;
  enrolments: EnrolmentRow[];
}

export interface CohortOption {
  id: string;
  title: string;
  type: string;
  startDate: string;
}

export interface CourseOption {
  id: string;
  title: string;
}
