"use client";

import { createServiceHooks } from "@/lib/react-query/use-service-query";
import { authService, type LoginResult } from "./auth.service";

export interface LoginVariables {
  email: string;
  password: string;
}

/**
 * Auth mutations (React Query) layered over AuthService.
 * - Keeps API details isolated in the service
 * - Keeps mutation lifecycle in the data layer (not in UI components)
 * - Uses createServiceHooks for standardized React Query integration
 */
const { useServiceMutation } = createServiceHooks(authService);

export const useLoginMutation = (
  options?: Parameters<
    typeof useServiceMutation<LoginResult, LoginVariables>
  >[1],
) =>
  useServiceMutation<LoginResult, LoginVariables>(
    (service, { email, password }) => service.login(email, password),
    options,
  );
