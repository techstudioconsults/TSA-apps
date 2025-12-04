"use client";

import { SidebarTrigger } from "@workspace/ui/components";
import {
  CustomButton,
  NotificationWidget,
  UserMenu,
  Wrapper,
} from "@workspace/ui/lib";
import { cn } from "@workspace/ui/lib/utils";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { GlobalSearchInput } from "../search-input";

type TopBarProperties = {
  adminName: string;
  adminEmail?: string;
  adminAvatar?: string;
  adminRole?: string;
  notifications?: Notification[];
  className?: string;
  isLoading?: boolean;
};

const handleLogout = async () => {
  try {
    await signOut({
      redirect: true,
      callbackUrl: `/login`,
    });
  } catch {
    toast.error(`Something went wrong`);
  }
};

export default function TopBar({
  adminName,
  adminEmail,
  adminAvatar,
  adminRole,
  notifications = [],
  isLoading = false,
  className = "",
}: TopBarProperties) {
  // locales removed; use root paths
  // const [notificationsList, setNotificationsList] =
  //   useState<Notification[]>(notifications)

  // const handleNotificationClick = (notification: Notification) => {
  //   // Navigate to notification action URL if available
  //   if (notification.actionUrl) {
  //     window.location.href = notification.actionUrl
  //   }
  // }

  // const handleMarkAsRead = (notificationId: string) => {
  //   setNotificationsList((previous) =>
  //     previous.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
  //   )
  // }

  // const handleMarkAllAsRead = () => {
  //   setNotificationsList((previous) =>
  //     previous.map((n) => ({ ...n, read: true }))
  //   )
  // }

  // const handleClearAll = () => {
  //   setNotificationsList([])
  // }

  return (
    <>
      <header
        className={cn(
          "bg-background sticky top-0 flex h-16 items-center px-6 shadow lg:px-4",
          className,
        )}
      >
        <div className="relative hidden w-fit items-center gap-4 md:flex">
          <SidebarTrigger className="absolute top-16 -left-[30px] bg-[#1F2666] text-white shadow-none" />
        </div>
        <Wrapper className="flex items-center max-w-[1440px] justify-between">
          {/* Dynamic Title */}
          <TopBarTitle />
          <TopBarActions />
          {/* Right Section */}
          <div className="flex items-center justify-end gap-2 md:gap-4">
            {/* Notification Widget */}
            <NotificationWidget
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              notifications={notifications as any}
              onNotificationClick={() => {}}
              onMarkAsRead={() => {}}
              onMarkAllAsRead={() => {}}
              onClearAll={() => {}}
            />

            {/* User Menu */}
            <UserMenu
              userName={adminName}
              userEmail={adminEmail}
              userAvatar={adminAvatar}
              userRole={adminRole}
              onProfileClick={() => {
                // Navigate to profile page
                window.location.href = `/profile`;
              }}
              onSettingsClick={() => {
                // Navigate to settings page
                window.location.href = `/settings`;
              }}
              onLogout={handleLogout}
              className="min-w-fit"
              isLoading={isLoading}
            />
          </div>
        </Wrapper>
      </header>
      {/* <AppEventsListener /> */}
    </>
  );
}

function TopBarActions() {
  const pathname = usePathname();

  const map = [
    {
      match: (p: string) => p.includes("/courses"),
      label: "Create Course",
      href: "/courses/create",
    },
    {
      match: (p: string) => p.includes("/classes"),
      label: "Create Class",
      href: "/classes/create",
    },
    {
      match: (p: string) => p.includes("/cohorts"),
      label: "Create Cohort",
      href: "/cohorts/create",
    },
    {
      match: (p: string) => p.includes("/sheets"),
      label: "Create Sheet",
      href: "/sheets/create",
    },
  ];

  const fallback = { label: "Create", href: "#" };
  const current = map.find((m) => m.match(pathname)) ?? fallback;

  return (
    <div className="flex gap-4">
      <GlobalSearchInput className="max-w-md bg-primary/10" />
      {pathname !== "/" && (
        <CustomButton variant="primary" href={current.href}>
          {current.label}
        </CustomButton>
      )}
    </div>
  );
}

function TopBarTitle() {
  const pathname = usePathname();

  const titleMap = [
    {
      match: (p: string) => p === "/" || p === "/Dashboard",
      title: "Dashboard",
    },
    { match: (p: string) => p.includes("/courses"), title: "Courses" },
    { match: (p: string) => p.includes("/classes"), title: "Classes" },
    { match: (p: string) => p.includes("/cohorts"), title: "Cohorts" },
    { match: (p: string) => p.includes("/sheets"), title: "Sheets" },
    { match: (p: string) => p.includes("/activities"), title: "Activities" },
    { match: (p: string) => p.includes("/settings"), title: "Settings" },
    { match: (p: string) => p.includes("/profile"), title: "Profile" },
  ];

  const fallback = "Dashboard";
  const current = titleMap.find((m) => m.match(pathname))?.title ?? fallback;

  return <h5 className="">{current}</h5>;
}
