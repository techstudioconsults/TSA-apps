"use server";

import { newsletterFormData } from "../schemas";

const BASE_URL = process.env[`NEXT_PUBLIC_API_URL`];
const API_URL = `${BASE_URL}/external/newsletter`;

interface NewsletterFormResponse {
  success?: string;
  error?: string;
}

export const submitNewsletterForm = async (
  data: newsletterFormData,
): Promise<NewsletterFormResponse> => {
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
      return { error: errorResponse.message || "Failed to send your message" };
    }

    const responseData = await response.json();
    return { success: responseData.message };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};
