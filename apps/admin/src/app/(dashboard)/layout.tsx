"use client";

import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopBar from "@/components/shared/top-bar";
import { ActiveTargetProvider } from "@/context/active-target";
import { useCurrentUser } from "@/services/auth/auth.mutations";
import { tokenManager } from "@/lib/http/token-manager";
import { SidebarInset, SidebarProvider } from "@workspace/ui/components";
import { Icons } from "@workspace/ui/icons";
import { AppSidebar, Logo, Wrapper } from "@workspace/ui/lib";
import { cn } from "@workspace/ui/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  useEffect(() => {
    if (!tokenManager.isAuthenticated()) {
      router.replace("/login");
    }
  }, [router]);
  const { data: currentUser, isLoading } = useCurrentUser();
  return (
    <SidebarProvider>
      <AppSidebar
        className={cn("z-[999] bg-primary text-white")}
        navMain={[]}
        navSecondary={[
          { name: "Dashboard", url: "/", icon: Icons.dashboard },
          { name: "Courses", url: "/courses", icon: Icons.book },
          { name: "Classes", url: "/classes", icon: Icons.users },
          { name: "Sheets", url: "/sheets", icon: Icons.sheet },
          { name: "Market Cycle", url: "/market-cycle", icon: Icons.megaphone },
        ]}
        teams={[
          {
            name: "Tech Studio Academy",
            logo: <Logo logo="/images/logo.png" />,
            plan: "techstudioacademy.com",
          },
        ]}
      />
      <SidebarInset className="dark:bg-background bg-[#F8F8F9]">
        <ActiveTargetProvider>
          <TopBar
            adminName={`${currentUser?.data.lastName} ${currentUser?.data.firstName}`}
            adminRole={currentUser?.data.role}
            adminEmail={`${currentUser?.data.email}`}
            notifications={[]}
            isLoading={isLoading}
          />
          <Suspense fallback={<div>Loading dashboard...</div>}>
            <Wrapper className="w-full !py-6 !px-4 2xl:min-w-[1440px] lg:!py-10 !my-0">
              {children}
            </Wrapper>
          </Suspense>
        </ActiveTargetProvider>
      </SidebarInset>
    </SidebarProvider>
  );
}
