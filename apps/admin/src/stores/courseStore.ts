// import { create } from "zustand";

// import {
//   createCourseAction,
//   deleteCourseAction,
//   fetchCoursesAction,
//   getCourseByIdAction,
//   getTotalCourseAction,
//   updateCourseAction,
// } from "~/action/course.actions";
// import { courseFormData } from "~/schemas";

// export interface CourseData {
//   id: string;
//   title: string;
//   about: string;
//   duration: {
//     online: number;
//     weekday: number;
//     weekend: number;
//   };
//   curriculum?: File | string | null; // Make curriculum optional with ?
// }

// interface CourseState {
//   courses: CourseData[];
//   isLoading: boolean;
//   error: string | null;
//   fetchCourses: (token: string) => Promise<void>;
//   createCourse: (formData: FormData, token: string) => Promise<courseFormData>;
//   getCourseById: (id: string, token: string) => Promise<CourseData | undefined>;
//   deleteCourse: (id: string, token: string) => Promise<void>;
//   updateCourse: (
//     id: string,
//     formData: FormData,
//     token: string,
//   ) => Promise<void>;
//   totalCourse: number;
//   fetchTotalCourse: (token: string) => Promise<void>;
// }

// export const useCourseStore = create<CourseState>((set, get) => ({
//   courses: [],
//   isLoading: false,
//   error: null,
//   totalCourse: 0,

//   fetchCourses: async (token) => {
//     set({ isLoading: true, error: null });
//     try {
//       const courses = await fetchCoursesAction(token);
//       const coursesWithCurriculum = courses.map((course) => ({
//         ...course,
//         curriculum: null,
//       }));
//       set({ courses: coursesWithCurriculum, isLoading: false });
//     } catch (error) {
//       set({ error: "Failed to load courses", isLoading: false });
//       console.error("Error fetching courses:", error);
//     }
//   },

//   createCourse: async (formData, token) => {
//     try {
//       const newCourse = await createCourseAction(formData, token);
//       const curriculumFile = formData.get("curriculum") as File;

//       const generatedId = crypto.randomUUID();

//       const courseWithCurriculum: CourseData = {
//         id: generatedId,
//         title: newCourse.title,
//         about: newCourse.about,
//         duration: {
//           online: newCourse.onlineDuration,
//           weekday: newCourse.weekdayDuration,
//           weekend: newCourse.weekendDuration,
//         },
//         curriculum: curriculumFile,
//       };

//       set({ courses: [...get().courses, courseWithCurriculum] });
//       return newCourse;
//     } catch (error) {
//       console.error("Error creating course:", error);
//       throw error;
//     }
//   },

//   getCourseById: async (id, token) => {
//     set({ isLoading: true, error: null });
//     try {
//       const course = await getCourseByIdAction(id, token);
//       set({ isLoading: false });
//       if (course) {
//         return {
//           ...course,
//           // curriculum: null,
//         };
//       }
//       return;
//     } catch (error) {
//       console.error("Error fetching course by ID:", error);
//       return;
//     }
//   },

//   updateCourse: async (id, formData, token) => {
//     try {
//       await updateCourseAction(id, formData, token);

//       // Fetch the updated course to refresh the store
//       const updatedCourse = await getCourseByIdAction(id, token);

//       if (updatedCourse) {
//         // Get curriculum file from formData if it exists
//         const curriculumFile = formData.get("curriculum") as File | null;

//         // Update the courses array with the updated course
//         set({
//           courses: get().courses.map((course) =>
//             course.id === id
//               ? { ...updatedCourse, curriculum: curriculumFile }
//               : course,
//           ),
//         });
//       }
//     } catch (error) {
//       console.error("Error updating course:", error);
//       throw error;
//     }
//   },

//   deleteCourse: async (id, token) => {
//     try {
//       await deleteCourseAction(id, token);
//       set({ courses: get().courses.filter((course) => course.id !== id) });
//     } catch (error) {
//       console.error("Error deleting course:", error);
//     }
//   },

//   fetchTotalCourse: async (token) => {
//     set({ isLoading: true, error: null });
//     try {
//       const total = await getTotalCourseAction(token);
//       set({ totalCourse: total, isLoading: false });
//     } catch (error) {
//       console.error("Error:", error);
//       set({ error: "Failed to load total courses", isLoading: false });
//     }
//   },
// }));
export {};
