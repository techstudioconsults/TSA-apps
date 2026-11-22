"use client";

import Cookies from "js-cookie";

const ACCESS_COOKIE = "authToken";

/**
 * Stores the API access token in a cookie (same approach as the dashboard).
 * The API does not issue refreshable sessions yet, so an expired token means
 * logging in again.
 */
class TokenManager {
  getAccessToken(): string | null {
    const token = Cookies.get(ACCESS_COOKIE);
    if (!token) return null;
    if (this.isExpired(token)) {
      this.logout();
      return null;
    }
    return token;
  }

  isAuthenticated(): boolean {
    return this.getAccessToken() !== null;
  }

  setAuth(accessToken: string): void {
    const expires = this.expiryDate(accessToken) ?? 1;
    Cookies.set(ACCESS_COOKIE, accessToken, {
      expires,
      secure: true,
      sameSite: "strict",
    });
  }

  logout(): void {
    Cookies.remove(ACCESS_COOKIE);
  }

  private payload(token: string): { exp?: number; role?: string } | null {
    try {
      const part = token.split(".")[1];
      if (!part) return null;
      const base64 = part.replace(/-/g, "+").replace(/_/g, "/");
      const padded = base64.padEnd(
        base64.length + ((4 - (base64.length % 4)) % 4),
        "=",
      );
      return JSON.parse(atob(padded));
    } catch {
      return null;
    }
  }

  private isExpired(token: string): boolean {
    const exp = this.payload(token)?.exp;
    return typeof exp === "number" ? Date.now() >= exp * 1000 : false;
  }

  private expiryDate(token: string): Date | null {
    const exp = this.payload(token)?.exp;
    return typeof exp === "number" ? new Date(exp * 1000) : null;
  }
}

export const tokenManager = new TokenManager();
