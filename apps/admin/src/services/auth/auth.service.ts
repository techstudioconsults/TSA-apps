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
}

export const authService = new AuthService();
