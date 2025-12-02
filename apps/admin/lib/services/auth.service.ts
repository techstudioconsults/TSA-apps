// Auth service layer: encapsulates API calls and DTO mapping
import { http } from "~/lib/http/client";

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

export const AuthService = {
  async login(email: string, password: string): Promise<LoginResult> {
    try {
      const dto = await http<LoginResponseDTO>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (
        dto?.message === "success" &&
        dto?.data?.tokens?.access &&
        dto?.data?.tokens?.refresh
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
        error: dto?.error || "Unexpected response from the server",
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        return { success: false, error: err.message };
      }
      return { success: false, error: "Unknown error" };
    }
  },
};
