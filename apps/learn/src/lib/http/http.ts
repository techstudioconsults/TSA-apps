import axios, { AxiosError } from "axios";

import { config } from "@/lib/config";
import { tokenManager } from "./token-manager";

/** Axios instance for the Techstudio API. Adds the token; sends people to /login on 401. */
export const http = axios.create({
  baseURL: config.apiUrl,
  timeout: 20000,
  timeoutErrorMessage:
    "The server took too long to answer. Check your connection and try again.",
  headers: { "Content-Type": "application/json" },
});

http.interceptors.request.use((request) => {
  const token =
    typeof window !== "undefined" ? tokenManager.getAccessToken() : null;
  if (token) request.headers.Authorization = `Bearer ${token}`;
  return request;
});

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const isLogin = error.config?.url?.includes("/auth/");
    if (
      error.response?.status === 401 &&
      !isLogin &&
      typeof window !== "undefined"
    ) {
      tokenManager.logout();
      const back = encodeURIComponent(window.location.pathname);
      window.location.href = `/login?redirect=${back}`;
    }
    return Promise.reject(error);
  },
);

/** The API's error message, or a fallback a person can act on. */
export function errorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
): string {
  if (axios.isAxiosError(error)) {
    if (!error.response)
      return "We couldn't reach the server. Check your internet connection and try again.";
    const message = (error.response.data as { message?: string } | undefined)
      ?.message;
    if (message && typeof message === "string") return message;
  }
  return fallback;
}

/** Unwraps the API's { success, data, message } envelope. */
export async function unwrap<T>(
  request: Promise<{ data: ApiResponse<T> }>,
): Promise<T> {
  const response = await request;
  return response.data.data;
}
