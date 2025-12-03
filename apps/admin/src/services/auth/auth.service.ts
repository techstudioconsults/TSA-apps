// Auth service layer: encapsulates API calls and DTO mapping

import { HttpAdapter } from "@/lib/http/http-adapter";

const httpAdapter = new HttpAdapter();

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResult {
  success: boolean;
  tokens?: AuthTokens;
  error?: string;
}

interface LoginResponseDTO {
  message: string;
  data?: {
    tokens?: {
      access: string;
      refresh: string;
    };
  };
  error?: string;
}

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
  async login(email: string, password: string): Promise<LoginResult> {
    try {
      const response = await httpAdapter.post<LoginResponseDTO>("/auth/login", {
        email,
        password,
      });

      if (!response?.data) {
        return {
          success: false,
          error: "No response from server",
        };
      }

      const dto = response.data;

      if (
        dto.message === "success" &&
        dto.data?.tokens?.access &&
        dto.data?.tokens?.refresh
      ) {
        return {
          success: true,
          tokens: {
            accessToken: dto.data.tokens.access,
            refreshToken: dto.data.tokens.refresh,
          },
        };
      }

      return {
        success: false,
        error: dto.error || "Unexpected response from the server",
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        return { success: false, error: err.message };
      }
      return { success: false, error: "Unknown error" };
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
