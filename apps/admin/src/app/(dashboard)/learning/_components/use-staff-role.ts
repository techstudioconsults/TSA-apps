"use client";

import { useCurrentUser } from "@/services/auth/auth.mutations";

/** Role names as the API sends them. */
export const ROLES = {
  superAdmin: "SUPER ADMIN",
  admin: "ADMINISTRATION",
  tutor: "TUTOR",
} as const;

/**
 * Who may open the learning pages. Matters because the dashboard's HTTP client
 * logs people out on any 403, so a page the API forbids must not even load.
 */
export function useStaffRole() {
  const { data, isError } = useCurrentUser();
  const role = data?.data?.role;
  const isAdmin = role === ROLES.superAdmin || role === ROLES.admin;
  return {
    role,
    // "No user yet" must read as loading, on the server too, or the first
    // client render differs from the server HTML (React error #418)
    isLoading: !data && !isError,
    canManageContent: isAdmin || role === ROLES.tutor,
    canManageEnrolments: isAdmin,
  };
}
