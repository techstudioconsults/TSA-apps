// import { create } from "zustand";

// import {
//   ClassData,
//   createClassAction,
//   deleteClassAction,
//   fetchClassesByCourseIdAction,
//   getSingleClassAction,
//   getTotalCohortsAction,
//   SingleClassData,
//   updateClassAction,
// } from "~/action/class.action";
// import { classFormData } from "~/schemas";

// interface ClassState {
//   classes: ClassData[];
//   selectedClass: SingleClassData | null;
//   fetchClasses: (courseId: string, token: string) => Promise<void>;
//   fetchSingleClass: (id: string, token: string) => Promise<void>;
//   createClass: (
//     data: classFormData,
//     courseId: string,
//     token: string,
//   ) => Promise<void>;
//   deleteClass: (id: string, token: string) => Promise<void>;
//   updateClass: (
//     id: string,
//     data: classFormData,
//     token: string,
//   ) => Promise<void>;
//   totalCohorts: number;
//   fetchTotalCohorts: (token: string) => Promise<void>;
// }

// export const useClassStore = create<ClassState>((set) => ({
//   classes: [],
//   selectedClass: null, // Initialize as null
//   totalCohorts: 0,

//   fetchClasses: async (courseId, token) => {
//     try {
//       const classes = await fetchClassesByCourseIdAction(courseId, token);
//       set({ classes });
//     } catch {
//       console.error("Error fetching classes:");
//     }
//   },

//   createClass: async (data, token) => {
//     try {
//       const newClass = await createClassAction(data, token);

//       set((state) => ({
//         classes: [...state.classes, newClass],
//       }));
//     } catch (error) {
//       console.error("Error creating class:", error);
//       throw error;
//     }
//   },

//   fetchSingleClass: async (id, token) => {
//     try {
//       const singleClass = await getSingleClassAction(id, token);
//       set({ selectedClass: singleClass });
//     } catch (error) {
//       console.error("Error fetching single class:", error);
//     }
//   },

//   deleteClass: async (id, token) => {
//     try {
//       await deleteClassAction(id, token);
//     } catch (error) {
//       console.error("Error deleting course:", error);
//     }
//   },

//   updateClass: async (id, data, token) => {
//     try {
//       await updateClassAction(id, data, token);
//     } catch (error) {
//       console.error("Error updating class:", error);
//     }
//   },

//   fetchTotalCohorts: async (token) => {
//     try {
//       const total = await getTotalCohortsAction(token);
//       set({ totalCohorts: total });
//     } catch (error) {
//       console.error("Error fetching total cohorts:", error);
//     }
//   },
// }));
export {};
