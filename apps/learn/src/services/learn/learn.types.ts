export type LectureType = "video" | "text";
export type VideoStatus =
  | "none"
  | "uploading"
  | "processing"
  | "ready"
  | "failed";

export interface CourseRef {
  id: string;
  title: string;
  slug: string | null;
}

export interface MyCourse {
  enrolmentId: string;
  active: boolean;
  expiresAt: string | null;
  completedAt: string | null;
  course: CourseRef & { about: string };
  progress: {
    completedLectures: number;
    totalLectures: number;
    percent: number;
    lastActivityAt: string | null;
  };
}

export interface OutlineLecture {
  id: string;
  title: string;
  type: LectureType;
  durationSeconds: number;
  isPreview: boolean;
  locked: boolean;
  completed: boolean;
  lastPositionSeconds: number;
}

export interface CourseOutline {
  course: CourseRef & { about: string };
  enrolment: {
    id: string;
    active: boolean;
    expiresAt: string | null;
    completedAt: string | null;
  } | null;
  progress: {
    completedLectures: number;
    totalLectures: number;
    percent: number;
  };
  sections: { id: string; title: string; lectures: OutlineLecture[] }[];
}

export interface LectureDetail {
  id: string;
  title: string;
  type: LectureType;
  body: string | null;
  durationSeconds: number;
  isPreview: boolean;
  course: CourseRef;
  section: { id: string; title: string };
  video: { url: string; expiresAt: string } | null;
  videoStatus: VideoStatus | null;
  enrolled: boolean;
  progress: {
    lastPositionSeconds: number;
    secondsWatched: number;
    completed: boolean;
  };
  previousLectureId: string | null;
  nextLectureId: string | null;
}

export interface ContinueLearning {
  course: CourseRef;
  lecture: { id: string; title: string; type: LectureType };
  lastPositionSeconds: number;
  completed: boolean;
}

export interface ProgressResult {
  tracked: boolean;
  completed: boolean;
  lastPositionSeconds?: number;
  secondsWatched?: number;
}
