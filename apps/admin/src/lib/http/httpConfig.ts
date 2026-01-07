import axios from "axios";

import { tokenManager } from "./token-manager";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;
const TIMEOUTMSG = "Waiting for too long...Aborted!";

// Axios instance configuration
const config = {
  baseURL: BASE_URL,
  timeoutErrorMessage: TIMEOUTMSG,
  headers: {
    "Content-Type": "application/json",
  },
};

const http = axios.create(config);

// Add request interceptor to add auth token
http.interceptors.request.use(
  async (config) => {
    // Get cached or fresh access token
    const accessToken = await tokenManager.getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add response interceptor to handle 401 errors and token refresh
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const status: number | undefined = error.response?.status;
    const responseMessage = String(
      error.response?.data?.message ??
        error.response?.data?.error ??
        error.message ??
        "",
    ).toLowerCase();

    // If the backend tells us the JWT is expired, force logout.
    // (Useful when refresh isn't possible / refresh also fails.)
    if (
      (status === 401 || status === 403) &&
      responseMessage.includes("jwt expired")
    ) {
      tokenManager.logout();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      throw error;
    }

    // If we get a 401 and haven't already retried, try to refresh the token
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the access token
        const newAccessToken = await tokenManager.refreshAccessToken();

        if (newAccessToken) {
          // Update the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          // Retry the original request
          return http(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, clear auth and redirect to login
        tokenManager.logout();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        throw refreshError;
      }
    }

    // For other errors or if refresh failed, invalidate the token cache
    if (status === 401 || status === 403) {
      tokenManager.logout();
    }

    throw error;
  },
);

export default http;
