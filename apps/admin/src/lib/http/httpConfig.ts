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

    // Handle 401 or 403 - unauthorized/forbidden
    if (status === 401 || status === 403) {
      // Check if backend explicitly says JWT expired
      if (
        responseMessage.includes("jwt expired") ||
        responseMessage.includes("unauthorized")
      ) {
        // Try to refresh token first if we haven't retried yet
        if (!originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newAccessToken = await tokenManager.refreshAccessToken();

            if (newAccessToken) {
              // Successfully refreshed, retry the request
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              return http(originalRequest);
            }
          } catch (refreshError) {
            // Refresh failed - force logout and redirect
            tokenManager.logout();
            if (typeof window !== "undefined") {
              window.location.href = "/login";
            }
            return Promise.reject(refreshError);
          }
        }

        // If retry already happened or refresh failed, logout
        tokenManager.logout();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }

      // For any other 401/403, also try refresh once
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const newAccessToken = await tokenManager.refreshAccessToken();

          if (newAccessToken) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return http(originalRequest);
          } else {
            // No new token - logout and redirect
            tokenManager.logout();
            if (typeof window !== "undefined") {
              window.location.href = "/login";
            }
            return Promise.reject(error);
          }
        } catch (refreshError) {
          tokenManager.logout();
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
          return Promise.reject(refreshError);
        }
      }

      // Already retried - force logout
      tokenManager.logout();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }

    // For all other errors, just reject
    throw error;
  },
);

export default http;
