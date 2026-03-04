"use client";

import { queryKeys } from "@/lib/react-query/query-keys";
import { createServiceHooks } from "@/lib/react-query/use-service-query";
import { authService, type User } from "./auth.service";

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
  useServiceMutation(
    (
      service,
      {
        email,
        password,
      }: {
        email: string;
        password: string;
      },
    ) => service.login(email, password),
    options,
  );
