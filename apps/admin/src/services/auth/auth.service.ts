// Auth service layer: encapsulates API calls and DTO mapping

import { HttpAdapter } from "@/lib/http/http-adapter";

const httpAdapter = new HttpAdapter();

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string | null;
  role: string;
  createdAt: string;
}

export class AuthService {
  async login(email: string, password: string) {
    const response = await httpAdapter.post<
      ApiResponse<{
        user: User;
        tokens: any;
      }>
    >("/auth/login", {
      email,
      password,
    });

    if (response?.status === 200) {
      return response.data.data;
    }
  }

  //current user
  async getCurrentUser() {
    const response = await httpAdapter.get<ApiResponse<User>>("/users/me");
    if (response?.status === 200) {
      return response.data;
    }
  }

  // Password reset (public endpoints) -------------------------------------
  async forgotPassword(email: string) {
    const response = await httpAdapter.post<ApiResponse<{ message: string }>>(
      "/auth/forgot-password",
      {
        email: email.trim(),
      },
    );
    return response?.data.data;
  }

  async verifyResetLink(token: string) {
    const response = await httpAdapter.post<
      ApiResponse<{
        valid: true;
        purpose: "reset" | "invite";
        email: string;
        firstName: string;
      }>
    >("/auth/reset-password/verify", { token });
    return response?.data.data;
  }

  async resetPassword(token: string, password: string) {
    const response = await httpAdapter.post<ApiResponse<{ reset: true }>>(
      "/auth/reset-password",
      { token, password },
    );
    return response?.data.data;
  }
}

export const authService = new AuthService();
