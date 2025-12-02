/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { queryKeys } from "@/lib/react-query/query-keys";
import { createServiceHooks } from "@/lib/react-query/use-service-query";
import { authService, type User, type LoginResult } from "./auth.service";

export interface LoginVariables {
  email: string;
  password: string;
}

/**
 * Auth queries and mutations (React Query) layered over AuthService.
 * - Keeps API details isolated in the service
 * - Keeps query/mutation lifecycle in the data layer (not in UI components)
 * - Uses createServiceHooks for standardized React Query integration
 */
const { useServiceQuery, useServiceMutation } = createServiceHooks(authService);
// Queries
export const useCurrentUser = (options?: any) =>
  useServiceQuery<ApiResponse<User> | undefined>(
    queryKeys.auth.currentUser(),
    (service) => service.getCurrentUser(),
    options,
  );

// Mutations
export const useLogin = (options?: any) =>
  useServiceMutation<LoginResult, LoginVariables>(
    (service, { email, password }) => service.login(email, password),
    options,
  );
