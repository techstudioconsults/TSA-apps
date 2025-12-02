"use server";

import { ContactFormData } from "~/schemas";

const BASE_URL = process.env["NEXT_PUBLIC_API_URL"] || "http://localhost:3000";
const API_URL = `${BASE_URL}/contactus`;

interface ContactFormResponse {
  success?: string;
  error?: string;
}

export const submitContactForm = async (
  data: ContactFormData,
): Promise<ContactFormResponse> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      return { error: errorResponse.message || "Failed to send your message." };
    }

    const responseData = await response.json();
    return { success: responseData.message };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return { error: errorMessage };
  }
};
