"use client";

import TopBar from "@/components/shared/top-bar";
import { ActiveTargetProvider } from "@/context/active-target";
import { SidebarInset, SidebarProvider } from "@workspace/ui/components";
import { AppSidebar, Logo, Wrapper } from "@workspace/ui/lib";
import { cn } from "@workspace/ui/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar
        className={cn("z-1 bg-[#1F2666] text-white")}
        navMain={[]}
        navSecondary={[]}
        teams={[
          {
            name: "Tech Studio Academy",
            logo: <Logo logo="/images/logo.png" />,
            plan: "techstudioacademy.com",
          },
        ]}
      />
      <SidebarInset className="dark:bg-background bg-[#F8F8F9]">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea corrupti
          labore a maiores error doloribus eveniet iusto molestias maxime,
          tempora fugit impedit. Numquam laborum officiis beatae? Tempore ullam
          neque sequi!
        </p>
        <ActiveTargetProvider>
          <TopBar
            adminName={`Kingsley Solomon`}
            adminRole={`Administrator`}
            adminEmail={`kinxly@gmail.com`}
            notifications={[]}
          />
          <Wrapper className="max-w-[1440px] py-10">{children}</Wrapper>
        </ActiveTargetProvider>
      </SidebarInset>
    </SidebarProvider>
  );
}
