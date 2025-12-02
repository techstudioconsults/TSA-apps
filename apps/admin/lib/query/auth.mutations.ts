"use client";

import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { AuthService, type LoginResult } from "../services/auth.service";

export interface LoginVariables {
  email: string;
  password: string;
}

/**
 * Auth mutations (React Query) layered over AuthService.
 * - Keeps API details isolated in the service
 * - Keeps mutation lifecycle in the data layer (not in UI components)
 */
export const useLoginMutation = (
  options?: Omit<
    UseMutationOptions<LoginResult, Error, LoginVariables>,
    "mutationFn"
  >,
) =>
  useMutation<LoginResult, Error, LoginVariables>({
    mutationFn: ({ email, password }) => AuthService.login(email, password),
    ...options,
  });
