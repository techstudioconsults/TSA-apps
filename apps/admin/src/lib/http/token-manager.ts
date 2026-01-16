"use client";

/**
 * Token Manager - JWT token management using cookies
 *
 * This manager handles all authentication state using cookies as the source of truth.
 * No in-memory caching - always reads from cookies.
 */

import Cookies from "js-cookie";

import { refreshAuthTokens } from "@/services/auth/auth.refresh";

class TokenManager {
  private pendingRefresh: Promise<string | null> | null = null;

  /**
   * Get the current access token from cookies
   */
  async getAccessToken(): Promise<string | null> {
    const token = Cookies.get("authToken");

    // No token in cookies
    if (!token) {
      // Try to refresh if refresh token exists
      const refreshToken = Cookies.get("refreshToken");
      if (refreshToken) {
        return this.refreshAccessToken();
      }
      return null;
    }

    // Check if token is expired or near expiry
    if (this.isTokenExpired(token)) {
      return this.refreshAccessToken();
    }

    return token;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!Cookies.get("authToken") || !!Cookies.get("refreshToken");
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
  }

  /**
   * Logout user (clear all auth data)
   */
  logout(): void {
    Cookies.remove("authToken");
    Cookies.remove("refreshToken");
  }

  /**
   * Check if token is expired or near expiry (within 5 minutes)
   */
  private isTokenExpired(token: string): boolean {
    const expiryMs = this.getJwtExpiryMs(token);

    if (!expiryMs) {
      // Can't decode token, assume it's valid and let backend handle it
      return false;
    }

    const BUFFER = 5 * 60 * 1000; // 5 minutes
    return Date.now() >= expiryMs - BUFFER;
  }

  /**
   * Decode JWT exp (seconds since epoch) without verifying signature.
   * Returns null if token is not a JWT or cannot be decoded.
   */
  private getJwtExpiryMs(token: string): number | null {
    try {
      const parts = token.split(".");
      if (parts.length < 2) return null;

      // base64url -> base64
      const payloadBase64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
      const padded = payloadBase64.padEnd(
        payloadBase64.length + ((4 - (payloadBase64.length % 4)) % 4),
        "=",
      );

      const json = atob(padded);
      const payload = JSON.parse(json) as { exp?: number };

      if (!payload.exp || typeof payload.exp !== "number") return null;
      return payload.exp * 1000;
    } catch {
      return null;
    }
  }

  /**
   * Refresh the access token using the refresh token
   * Calls backend directly to get a new access token
   */
  async refreshAccessToken(): Promise<string | null> {
    // De-dupe concurrent refreshes (multiple 401s at once)
    if (this.pendingRefresh) return this.pendingRefresh;

    this.pendingRefresh = (async () => {
      try {
        const currentRefreshToken = Cookies.get("refreshToken");

        if (!currentRefreshToken) {
          console.error("TokenManager: No refresh token available");
          this.logout();
          return null;
        }

        const refreshed = await refreshAuthTokens(currentRefreshToken);

        if (!refreshed || !refreshed.accessToken) {
          console.error("TokenManager: Refresh response invalid");
          this.logout();
          return null;
        }

        const newAccessToken = refreshed.accessToken;
        const newRefreshToken = refreshed.refreshToken ?? currentRefreshToken;

        // Persist new tokens
        this.setAuth(newAccessToken, newRefreshToken);
        return newAccessToken;
      } catch (error) {
        console.error("TokenManager: Failed to refresh token", error);
        this.logout();
        return null;
      } finally {
        this.pendingRefresh = null;
      }
    })();

    return this.pendingRefresh;
  }
}

// Singleton instance
export const tokenManager = new TokenManager();
