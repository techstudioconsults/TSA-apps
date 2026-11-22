import { http, unwrap } from "@/lib/http/http";

export interface CurrentUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar: string | null;
}

export interface LoginResult {
  user: CurrentUser;
  tokens: { access: string; refresh: string };
}

export type PasswordLinkPurpose = "reset" | "invite";

export interface VerifiedLink {
  valid: true;
  purpose: PasswordLinkPurpose;
  email: string;
  firstName: string;
}

export const STUDENT_ROLE = "STUDENT";

export const authService = {
  login: (email: string, password: string) =>
    unwrap<LoginResult>(
      http.post("/auth/login", { email: email.trim(), password }),
    ),

  me: () => unwrap<CurrentUser>(http.get("/users/me")),

  forgotPassword: (email: string) =>
    unwrap<{ message: string }>(
      http.post("/auth/forgot-password", { email: email.trim() }),
    ),

  verifyLink: (token: string) =>
    unwrap<VerifiedLink>(http.post("/auth/reset-password/verify", { token })),

  resetPassword: (token: string, password: string) =>
    unwrap<{ reset: true }>(
      http.post("/auth/reset-password", { token, password }),
    ),
};
