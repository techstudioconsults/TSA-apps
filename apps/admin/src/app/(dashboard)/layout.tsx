"use client";

import TopBar from "@/components/shared/top-bar";
import { ActiveTargetProvider } from "@/context/active-target";
import { useCurrentUser } from "@/services/auth/auth.mutations";
import { SidebarInset, SidebarProvider } from "@workspace/ui/components";
import { Icons } from "@workspace/ui/icons";
import { AppSidebar, Logo, Wrapper } from "@workspace/ui/lib";
import { cn } from "@workspace/ui/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: currentUser, isLoading } = useCurrentUser();
  return (
    <SidebarProvider>
      <AppSidebar
        className={cn("z-1 bg-primary text-white")}
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
          <Wrapper className="max-w-[1440px] py-10">{children}</Wrapper>
        </ActiveTargetProvider>
      </SidebarInset>
    </SidebarProvider>
  );
}
