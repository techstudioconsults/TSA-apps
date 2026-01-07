"use client";

/**
 * Token Manager - Efficient JWT token caching and management
 *
 * This manager handles all authentication state using cookies for persistence
 * and in-memory cache for performance. Replaces Zustand auth store.
 */

import Cookies from "js-cookie";

import { refreshAuthTokens } from "@/services/auth/auth.refresh";

interface CachedToken {
  accessToken: string;
  expiresAt: number; // timestamp in milliseconds
}

class TokenManager {
  private cache: CachedToken | null = null;
  private pendingRequest: Promise<string | null> | null = null;
  private pendingRefresh: Promise<string | null> | null = null;
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

    // Fetch token from cookies; if expired/near-expiry, refresh first.
    this.pendingRequest = this.getOrRefreshToken();

    try {
      const token = await this.pendingRequest;
      return token;
    } finally {
      this.pendingRequest = null;
    }
  }

  /**
   * Resolve a usable access token:
   * - Return cookie token if still valid
   * - Otherwise refresh using refresh token
   */
  private async getOrRefreshToken(): Promise<string | null> {
    const tokenFromCookies = await this.fetchTokenFromCookies();

    if (tokenFromCookies && this.cache && this.isTokenValid()) {
      return tokenFromCookies;
    }

    // Cookie token missing/expired: attempt refresh
    return this.refreshAccessToken();
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

    // Update cache using the access token's JWT exp when possible.
    const expiresAt =
      this.getJwtExpiryMs(accessToken) ?? Date.now() + 7 * 24 * 60 * 60 * 1000; // fallback
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

      // Cache the token with a realistic expiry (prefer JWT exp; fallback to cookie lifetime)
      const expiresAt =
        this.getJwtExpiryMs(token) ?? Date.now() + 7 * 24 * 60 * 60 * 1000; // fallback

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
          this.invalidate();
          return null;
        }

        const refreshed = await refreshAuthTokens(currentRefreshToken);
        const newAccessToken = refreshed.accessToken;
        const newRefreshToken = refreshed.refreshToken ?? currentRefreshToken;

        // Persist tokens + cache
        this.setAuth(newAccessToken, newRefreshToken);
        return newAccessToken;
      } catch (error) {
        console.error("TokenManager: Failed to refresh token", error);
        this.invalidate();
        return null;
      } finally {
        this.pendingRefresh = null;
      }
    })();

    return this.pendingRefresh;
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
