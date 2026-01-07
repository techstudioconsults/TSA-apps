"use client";

/**
 * Refresh-token API call (kept outside the axios instance).
 *
 * Why:
 * - Avoids axios interceptor recursion (401 -> refresh -> 401 -> refresh ...)
 * - Provides a single place to normalize backend refresh responses
 */

export interface RefreshedTokens {
  accessToken: string;
  /**
   * Some backends rotate refresh tokens; if not provided, callers should
   * continue using the previous refresh token.
   */
  refreshToken?: string;
}

interface RefreshResponseDTO {
  message: string;
  data?: {
    tokens?: {
      access?: string;
      refresh?: string;
    };
  };
  error?: string;
}

export async function refreshAuthTokens(
  refreshToken: string,
): Promise<RefreshedTokens> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not set");
  }

  const response = await fetch(`${baseUrl}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // Some backends expect the refresh token in the request body.
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error(`Failed to refresh token: ${response.status}`);
  }

  const dto = (await response.json()) as RefreshResponseDTO;

  const access = dto.data?.tokens?.access;
  if (dto.message !== "success" || !access) {
    throw new Error(dto.error || "Unexpected response from refresh endpoint");
  }

  return {
    accessToken: access,
    refreshToken: dto.data?.tokens?.refresh,
  };
}
