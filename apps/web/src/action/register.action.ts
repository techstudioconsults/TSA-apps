"use server";

import { RegisterFormData } from "~/schemas";

const BASE_URL = process.env["NEXT_PUBLIC_API_URL"];
const API_URL = `${BASE_URL}/auth/register`;

interface RegisterFormResponse {
  success?: string;
  error?: string;
}

export const submitRegisterForm = async (
  data: RegisterFormData,
): Promise<RegisterFormResponse> => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      return { error: errorResponse.message || "Failed to register course." };
    }

    const responseData = await response.json();

    return { success: responseData.message };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return { error: errorMessage };
  }
};
