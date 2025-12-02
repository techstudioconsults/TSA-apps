import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Course } from "./store.types";

type coursesState = {
  allCourses: Course[];
  loading: boolean;
  error: string | null;
  activeCourse: Course | null;
  setCourses: (courses: Course[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setActiveCourse: (course: Course) => void;
};

const useCoursesStore = create<coursesState>()(
  devtools((set) => ({
    allCourses: [],
    loading: true,
    error: null,
    activeCourse: null,

    setCourses: (courses: Course[]) =>
      set({ allCourses: courses, loading: false }),

    setLoading: (loading: boolean) => set({ loading }),

    setError: (error: string | null) => set({ error, loading: false }),

    setActiveCourse: (course: Course) => set({ activeCourse: course }),
  })),
);

export default useCoursesStore;
