/**
 * Token Manager - Efficient JWT token caching and management
 *
 * This manager handles all authentication state using cookies for persistence
 * and in-memory cache for performance. Replaces Zustand auth store.
 */

import Cookies from "js-cookie";

interface CachedToken {
  accessToken: string;
  expiresAt: number; // timestamp in milliseconds
}

class TokenManager {
  private cache: CachedToken | null = null;
  private pendingRequest: Promise<string | null> | null = null;
  private readonly REFRESH_BUFFER = 5 * 60 * 1000; // 5 minutes before expiry

  /**
   * Get the current access token, fetching from cookies if necessary
   */
  async getAccessToken(): Promise<string | null> {
    // If we have a valid cached token, return it
    if (this.cache && this.isTokenValid()) {
      return this.cache.accessToken;
    }

    // If there's already a pending request, wait for it
    if (this.pendingRequest) {
      return this.pendingRequest;
    }

    // Fetch token from cookies
    this.pendingRequest = this.fetchTokenFromCookies();

    try {
      const token = await this.pendingRequest;
      return token;
    } finally {
      this.pendingRequest = null;
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!Cookies.get("authToken");
  }

  /**
   * Set authentication tokens (called after successful login)
   */
  setAuth(accessToken: string, refreshToken: string): void {
    Cookies.set("authToken", accessToken, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });
    Cookies.set("refreshToken", refreshToken, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });

    // Update cache
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
    this.cache = {
      accessToken,
      expiresAt,
    };
  }

  /**
   * Logout user (clear all auth data)
   */
  logout(): void {
    Cookies.remove("authToken");
    Cookies.remove("refreshToken");
    this.invalidate();
  }

  /**
   * Check if the cached token is still valid
   */
  private isTokenValid(): boolean {
    if (!this.cache) return false;
    const now = Date.now();
    return now < this.cache.expiresAt - this.REFRESH_BUFFER;
  }

  /**
   * Fetch token from cookies
   */
  private async fetchTokenFromCookies(): Promise<string | null> {
    try {
      const token = Cookies.get("authToken");

      if (!token) {
        this.cache = null;
        return null;
      }

      // Cache the token with expiry time (7 days as set in authStore)
      const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days

      this.cache = {
        accessToken: token,
        expiresAt,
      };

      return this.cache.accessToken;
    } catch (error) {
      console.error("TokenManager: Failed to fetch token from cookies", error);
      this.cache = null;
      return null;
    }
  }

  /**
   * Refresh the access token using the refresh token
   * Calls backend directly to get a new access token
   */
  async refreshAccessToken(): Promise<string | null> {
    try {
      const refreshToken = Cookies.get("refreshToken");

      if (!refreshToken) {
        console.error("TokenManager: No refresh token available");
        this.invalidate();
        return null;
      }

      // Call backend refresh endpoint directly
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refreshToken,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to refresh token: ${response.status}`);
      }

      const data = await response.json();

      if (data.message === "success" && data.data?.tokens?.access) {
        const newAccessToken = data.data.tokens.access;

        // Update cookies
        Cookies.set("authToken", newAccessToken, {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });

        // Update cache
        const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
        this.cache = {
          accessToken: newAccessToken,
          expiresAt,
        };

        return this.cache.accessToken;
      }

      return null;
    } catch (error) {
      console.error("TokenManager: Failed to refresh token", error);
      this.invalidate();
      return null;
    }
  }

  /**
   * Invalidate the cached token (useful for logout or token refresh)
   */
  invalidate(): void {
    this.cache = null;
    this.pendingRequest = null;
  }

  /**
   * Manually set a token (useful for testing or manual token management)
   */
  setToken(accessToken: string, expiresAt: number): void {
    this.cache = { accessToken, expiresAt };
  }
}

// Singleton instance
export const tokenManager = new TokenManager();
