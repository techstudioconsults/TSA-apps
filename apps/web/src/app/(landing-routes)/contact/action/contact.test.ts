// import { submitContactForm } from ".";
// import { act } from "react";
// import { describe, expect, it, vi } from "vitest";

// import { ContactFormData } from "~/schemas";
// import { mockResponse } from "~/test/utils";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
// const API_URL = `${BASE_URL}/contactus`;

// globalThis.fetch = vi.fn();

// describe("Contact Form test", () => {
//   beforeEach(() => {
//     vi.clearAllMocks(); // Clear mock calls between tests
//   });

//   it("should submit contact form successfully", async () => {
//     const mockResponseData = { message: "Message sent successfully!" };

//     // Mock successful API response
//     (fetch as any).mockResolvedValueOnce(mockResponse(200, mockResponseData));

//     const formData: ContactFormData = {
//       fullName: "Alice",
//       email: "alice@example.com",
//       message: "Hello, this is a test message.",
//     };

//     // Directly call the function
//     let response;
//     await act(async () => {
//       response = await submitContactForm(formData);
//     });

//     expect(response).toEqual({ success: "Message sent successfully!" });

//     expect(fetch).toHaveBeenCalledWith(
//       API_URL,
//       expect.objectContaining({
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       }),
//     );
//   });

//   it("should handle contact form submission error correctly", async () => {
//     // Mock failed API response
//     (fetch as any).mockResolvedValueOnce(
//       mockResponse(500, { message: "Error sending message." }),
//     );

//     const formData: ContactFormData = {
//       fullName: "Bob",
//       email: "bob@example.com",
//       message: "This is another test message.",
//     };

//     let response;
//     await act(async () => {
//       response = await submitContactForm(formData);
//     });

//     // Expect the error to be returned
//     expect(response).toEqual({ error: "Error sending message." });

//     expect(fetch).toHaveBeenCalledWith(
//       API_URL,
//       expect.objectContaining({
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       }),
//     );
//   });
// });
export {};
