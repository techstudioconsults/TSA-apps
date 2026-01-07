"use client";

import { SidebarTrigger } from "@workspace/ui/components";
import { CustomButton, NotificationWidget, UserMenu } from "@workspace/ui/lib";
import { cn } from "@workspace/ui/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { GlobalSearchInput } from "../search-input";
import { useModalStore } from "@/store/modalStore";
import { tokenManager } from "@/lib/http/token-manager";

type TopBarProperties = {
  adminName: string;
  adminEmail?: string;
  adminAvatar?: string;
  adminRole?: string;
  notifications?: Notification[];
  className?: string;
  isLoading?: boolean;
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
  const router = useRouter();

  const handleLogout = () => {
    try {
      // Logout = remove tokens stored in the browser (cookies) and redirect.
      tokenManager.logout();
      router.push("/login");
    } catch {
      toast.error("Something went wrong");
    }
  };

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
          "bg-background sticky z-[555] top-0 flex h-16 items-center px-2 shadow",
          className,
        )}
      >
        <section className="flex flex-row items-center justify-between w-full max-w-[1440px] gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="" />
            <TopBarTitle />
          </div>
          {/* Dynamic Title */}
          <div className="">
            <TopBarActions />
          </div>
          {/* Right Section */}
          <div className="flex items-center justify-end gap-2 md:gap-4">
            {/* Notification Widget */}
            <NotificationWidget
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
              className="min-w-fit cursor-pointer"
              isLoading={isLoading}
            />
          </div>
        </section>
      </header>
      {/* <AppEventsListener /> */}
    </>
  );
}

function TopBarActions() {
  const pathname = usePathname();
  const { openCreateSheetModal, openCreateMarketingCycleModal } =
    useModalStore();

  const map = [
    {
      match: (p: string) => p.includes("/market-cycle"),
      label: "Create Marketing Cycle",
      href: "#",
      onClick: () => {
        openCreateMarketingCycleModal();
        console.log(`testing`);
      },
    },
    {
      match: (p: string) => p.includes("/courses"),
      label: "Create Course",
      href: "/courses/create",
      onClick: undefined,
    },
    {
      match: (p: string) => p.includes("/classes"),
      label: "Create Class",
      href: "/classes/create",
      onClick: undefined,
    },
    {
      match: (p: string) => p.includes("/cohorts"),
      label: "Create Cohort",
      href: "/cohorts/create",
      onClick: undefined,
    },
    {
      match: (p: string) => p.includes("/sheets"),
      label: "Create Sheet",
      href: "#",
      onClick: openCreateSheetModal,
    },
  ];

  const fallback = { label: "Create", href: "#", onClick: undefined };
  const current = map.find((m) => m.match(pathname)) ?? fallback;

  return (
    <div className="flex items-center gap-2 sm:gap-3 justify-end">
      {/* Search only on large screens and above to reduce crowding */}
      <div className="hidden xl:block flex-1">
        <GlobalSearchInput disabled className="w-full bg-primary/10" />
      </div>
      {pathname !== "/" && (
        <CustomButton
          variant="primary"
          className="whitespace-nowrap px-3 py-1 text-xs sm:text-sm"
          href={current.onClick ? undefined : current.href}
          onClick={current.onClick}
        >
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
    {
      match: (p: string) => p.includes("/market-cycle"),
      title: "Marketing Cycles",
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

  return <h5 className="hidden lg:flex">{current}</h5>;
}
