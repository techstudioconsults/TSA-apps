"use client";

import { SidebarTrigger } from "@workspace/ui/components";
import { NotificationWidget, UserMenu, Wrapper } from "@workspace/ui/lib";
import { cn } from "@workspace/ui/lib/utils";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { GlobalSearchInput } from "../search-input";

type TopBarProperties = {
  adminName: string;
  adminEmail?: string;
  adminAvatar?: string;
  adminRole?: string;
  notifications?: Notification[];
  className?: string;
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
          "bg-background  top-0 flex h-20 items-center px-6 shadow lg:px-4",
          className,
        )}
      >
        <div className="relative hidden w-fit items-center gap-4 md:flex">
          <SidebarTrigger className="absolute top-16 -left-[30px] bg-[#1F2666] text-white shadow-none" />
        </div>
        <Wrapper className="flex items-center max-w-[1440px] justify-between">
          {/* Search Input */}
          <h5>Dashboard</h5>

          {/* Right Section */}
          <div className="flex items-center justify-end gap-2 md:gap-4">
            <GlobalSearchInput />
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
            />
          </div>
        </Wrapper>
      </header>
      {/* <AppEventsListener /> */}
    </>
  );
}
