"use client";

import { useEffect, useState } from "react";

import { useStaffRole } from "./use-staff-role";

export function RoleGate({
  allow,
  children,
}: {
  allow: "content" | "enrolments";
  children: React.ReactNode;
}) {
  const { isLoading, canManageContent, canManageEnrolments } = useStaffRole();
  // The role is only known in the browser; render the placeholder until then so
  // the first client render matches the prerendered HTML
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted || isLoading)
    return (
      <div
        role="status"
        aria-label="Loading"
        className="bg-muted h-40 max-w-[960px] animate-pulse rounded-lg"
      />
    );
  const allowed = allow === "content" ? canManageContent : canManageEnrolments;
  if (!allowed) {
    return (
      <div className="bg-background max-w-[640px] rounded-lg border p-6">
        <h1 className="text-lg font-semibold">
          You don&apos;t have access to this page
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          {allow === "content"
            ? "Course content is managed by admins and tutors."
            : "Enrolments are managed by admins."}{" "}
          Ask a super admin if you need access.
        </p>
      </div>
    );
  }
  return <>{children}</>;
}
