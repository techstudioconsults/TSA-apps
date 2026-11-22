"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import { tokenManager } from "@/lib/http/token-manager";
import { queryKeys } from "@/lib/react-query/query-keys";
import { authService } from "./auth.service";

export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.me,
    queryFn: authService.me,
    enabled: typeof window !== "undefined" && tokenManager.isAuthenticated(),
    staleTime: 10 * 60 * 1000,
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.login(email, password),
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (email: string) => authService.forgotPassword(email),
  });
}

export function useVerifyLink(token: string | null) {
  return useQuery({
    queryKey: ["password-link", token],
    queryFn: () => authService.verifyLink(token as string),
    enabled: Boolean(token),
    retry: false,
    staleTime: Infinity,
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: ({ token, password }: { token: string; password: string }) =>
      authService.resetPassword(token, password),
  });
}
