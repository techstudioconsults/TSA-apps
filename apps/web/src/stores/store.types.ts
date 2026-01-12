// // Centralized types for Zustand stores

// export type ID = string | number;

// export interface Course {
//   id: ID;
//   title: string;
//   about?: string;
//   // Allow additional fields from API without breaking type-checking
//   [key: string]: unknown;
// }

// export interface Cohort {
//   id: ID;
//   courseId?: ID;
//   title?: string;
//   startDate?: string; // e.g., DD-MM-YYYY or ISO depending on API
//   endDate?: string;
//   // Allow additional fields from API without breaking type-checking
//   [key: string]: unknown;
// }

export type Course = {
  imageUrl: string;
  id: string;
  slug: string;
  title: string;
  description: string;
  about: string;
  duration: number;
  startDate: string;
  fee: number;
  classes: {
    online: ClassDetail[];
    weekend: ClassDetail[];
    weekday: ClassDetail[];
  };
};

export type Cohort = {
  id: string;
  title: string;
  courseId: string;
  // description: string;
  about: string;
  type: string;
  duration: string;
  fee: number | string;
  startDate: string;
};

type ClassDetail = {
  id: string;
  title: string;
  courseId: string;
  description: string;
  preference: "online" | "weekend" | "weekday";
  startDate: string;
  endDate: string;
  fee: number;
  tutors: Tutor[];
  resources: Resources;
  createdAt: string;
};

type Tutor = {
  id: string;
  name: string;
  avatar: string | null;
};

type Resources = {
  audio: string[];
  video: string[];
  document: string[];
};
