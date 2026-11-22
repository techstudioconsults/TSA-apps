"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { tokenManager } from "@/lib/http/token-manager";
import { useCurrentUser } from "@/services/auth/auth.queries";
import { STUDENT_ROLE } from "@/services/auth/auth.service";

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const { data: user } = useCurrentUser();

  useEffect(() => {
    if (!tokenManager.isAuthenticated()) {
      router.replace(
        `/login?redirect=${encodeURIComponent(window.location.pathname)}`,
      );
      return;
    }
    setReady(true);
  }, [router]);

  useEffect(() => {
    // Staff accounts belong on the dashboard; their token would get 403s everywhere here
    if (user && user.role !== STUDENT_ROLE) {
      tokenManager.logout();
      router.replace("/login");
    }
  }, [user, router]);

  if (!ready) return null;
  return <div className="bg-surface-sunken min-h-screen">{children}</div>;
}
