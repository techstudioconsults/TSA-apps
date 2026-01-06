// import { beforeEach, describe, expect, it, vi } from "vitest";

// import { classFormData } from "~/schemas";
// import {
//   createClassAction,
//   deleteClassAction,
//   fetchClassesByCourseIdAction,
//   getSingleClassAction,
//   getTotalCohortsAction,
//   updateClassAction,
// } from "../class.action";

// const mockClassData = {
//   id: "class-id",
//   course: { id: "course-id" },
//   courseTitle: "Course Title",
//   title: "Class Title",
//   description: "Class Description",
//   fee: "100",
//   startDate: "2025-01-01",
//   courseId: "course-id",
//   type: "online",
// };

// const mockResponse = {
//   success: true,
//   data: mockClassData,
//   message: "success",
// };

// const validClassData: classFormData = {
//   title: "Class Title",
//   type: "online", // or "weekday" or "weekend"
//   description: "Class Description",
//   fee: "100",
//   startDate: "2025-01-01",
//   courseId: "course-id",
// };

// beforeEach(() => {
//   vi.clearAllMocks();
// });

// describe("Class Actions", () => {
//   it("creates a class successfully", async () => {
//     vi.stubGlobal(
//       "fetch",
//       vi.fn().mockResolvedValue({
//         ok: true,
//         json: async () => mockResponse,
//       }),
//     );

//     const result = await createClassAction(validClassData, "dummy-token"); // Pass valid mock data here

//     expect(result.id).toBe(mockClassData.id);
//     expect(result.courseTitle).toBe(mockClassData.courseTitle);
//   });

//   // it("handles failure in createClassAction", async () => {
//   //   vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
//   //     ok: false,
//   //     json: async () => ({ message: "Failed to create class" }),
//   //   }));

//   //   const result = await createClassAction(validClassData, "dummy-token");

//   //   expect(result).toEqual({
//   //     success: false,
//   //     message: "Failed to create class",
//   //   });
//   // });

//   it("fetches classes by course ID successfully", async () => {
//     vi.stubGlobal(
//       "fetch",
//       vi.fn().mockResolvedValue({
//         ok: true,
//         json: async () => ({
//           success: true,
//           data: { items: [mockClassData] },
//         }),
//       }),
//     );

//     const result = await fetchClassesByCourseIdAction(
//       "course-id",
//       "dummy-token",
//     );

//     expect(result).toHaveLength(1);
//     expect(result[0].id).toBe(mockClassData.id);
//   });

//   // it("handles failure in fetchClassesByCourseIdAction", async () => {
//   //   vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
//   //     ok: false,
//   //     json: async () => ({ message: "Failed to fetch classes" }),
//   //   }));

//   //   const result = await fetchClassesByCourseIdAction("course-id", "dummy-token");

//   //   expect(result).toEqual({
//   //     success: false,
//   //     message: "Failed to fetch classes",
//   //   });
//   // });

//   it("deletes a class successfully", async () => {
//     vi.stubGlobal(
//       "fetch",
//       vi.fn().mockResolvedValue({
//         ok: true,
//       }),
//     );

//     const result = await deleteClassAction("class-id", "dummy-token");

//     expect(result).toBeUndefined();
//   });

//   it("handles failure in deleteClassAction", async () => {
//     vi.stubGlobal(
//       "fetch",
//       vi.fn().mockResolvedValue({
//         ok: false,
//         statusText: "Not Found",
//       }),
//     );

//     try {
//       await deleteClassAction("class-id", "dummy-token");
//     } catch (error) {
//       expect(error).toEqual(new Error("Failed to delete course: Not Found"));
//     }
//   });

//   it("fetches a single class successfully", async () => {
//     vi.stubGlobal(
//       "fetch",
//       vi.fn().mockResolvedValue({
//         ok: true,
//         json: async () => ({
//           data: mockClassData,
//         }),
//       }),
//     );

//     const result = await getSingleClassAction("class-id", "dummy-token");

//     expect(result.id).toBe(mockClassData.id);
//     expect(result.title).toBe(mockClassData.title);
//   });

//   it("handles failure in getSingleClassAction", async () => {
//     vi.stubGlobal(
//       "fetch",
//       vi.fn().mockResolvedValue({
//         ok: false,
//       }),
//     );

//     try {
//       await getSingleClassAction("class-id", "dummy-token");
//     } catch (error) {
//       expect(error).toBeInstanceOf(Error);
//     }
//   });

//   it("updates a class successfully", async () => {
//     vi.stubGlobal(
//       "fetch",
//       vi.fn().mockResolvedValue({
//         ok: true,
//       }),
//     );

//     const result = await updateClassAction(
//       "class-id",
//       validClassData,
//       "dummy-token",
//     );

//     expect(result).toBeUndefined();
//   });

//   it("handles failure in updateClassAction", async () => {
//     vi.stubGlobal(
//       "fetch",
//       vi.fn().mockResolvedValue({
//         ok: false,
//         json: async () => ({ message: "Failed to update class" }),
//       }),
//     );

//     try {
//       await updateClassAction("class-id", validClassData, "dummy-token");
//     } catch (error) {
//       expect(error).toEqual({
//         status: undefined,
//         message: "Failed to update class",
//         details: { message: "Failed to update class" },
//       });
//     }
//   });

//   it("gets total cohorts successfully", async () => {
//     vi.stubGlobal(
//       "fetch",
//       vi.fn().mockResolvedValue({
//         ok: true,
//         json: async () => ({
//           data: { totalCohorts: 10 },
//         }),
//       }),
//     );

//     const result = await getTotalCohortsAction("dummy-token");

//     expect(result).toBe(10);
//   });

//   it("handles failure in getTotalCohortsAction", async () => {
//     vi.stubGlobal(
//       "fetch",
//       vi.fn().mockResolvedValue({
//         ok: false,
//         statusText: "Bad Request",
//       }),
//     );

//     try {
//       await getTotalCohortsAction("dummy-token");
//     } catch (error) {
//       expect(error).toEqual(
//         new Error("Failed to fetch total cohorts: Bad Request"),
//       );
//     }
//   });
// });
export {};
