// import useFAQStore from ".";
// import { act } from "react";
// import { beforeEach, describe, expect, it, vi } from "vitest";

// import { mockResponse, renderHook } from "~/test/utils";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// globalThis.fetch = vi.fn();

// describe("FAQs test", () => {
//   beforeEach(() => {
//     useFAQStore.setState({
//       faq: [],
//       loading: false,
//       error: null,
//       currentPage: 1,
//       totalPages: 1,
//     });
//     vi.resetAllMocks();
//   });

//   it("should fetch all FAQs successfully", async () => {
//     const mockFAQs = {
//       data: [
//         {
//           id: 1,
//           question: "What is Zustand?",
//           answer: "A state management library.",
//         },
//       ],
//       pageNumber: 1,
//       pages: 1,
//     };

//     (fetch as any).mockResolvedValueOnce(mockResponse(200, { data: mockFAQs }));
//     const { result } = renderHook(() => useFAQStore());

//     await act(async () => {
//       await result.current.getFAQ();
//     });

//     const store = result.current;
//     expect(store.loading).toBe(false);
//     expect(store.faq).toEqual(mockFAQs.data);
//     expect(store.error).toBe(null);
//     expect(fetch).toHaveBeenCalledWith(
//       `${BASE_URL}/faq?page=${mockFAQs.pages}`,
//       expect.objectContaining({
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//         cache: "no-store",
//       }),
//     );
//   });

//   it("should handle fetch error correctly", async () => {
//     const errorMessage = "Not Found";

//     (fetch as any).mockResolvedValueOnce({
//       ok: false,
//       status: 404,
//       statusText: errorMessage,
//       json: async () => ({ message: errorMessage }),
//     });

//     const { result } = renderHook(() => useFAQStore());

//     await act(async () => {
//       await result.current.getFAQ();
//     });

//     const store = result.current;
//     expect(store.loading).toBe(false);
//     expect(store.error).toContain("Error");
//     expect(store.faq).toEqual([]);
//   });

//   it("should handle unexpected errors", async () => {
//     const unexpectedError = new Error("Network Error");
//     (fetch as any).mockRejectedValueOnce(unexpectedError);

//     const { result } = renderHook(() => useFAQStore());

//     await act(async () => {
//       const error = await result.current.getFAQ();
//       expect(error).toBe(unexpectedError.message);
//     });

//     const store = useFAQStore.getState();
//     expect(store.loading).toBe(false);
//     expect(store.error).toBe(unexpectedError.message);
//   });
// });
export {};
