"use client";

import { Input } from "@workspace/ui/components";
import { CustomButton } from "@workspace/ui/lib";
import {
  BookOpen,
  FileSpreadsheet,
  LayoutDashboard,
  LogOut,
  LucideIcon,
  Megaphone,
  Search,
  Users,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { tokenManager } from "@/lib/http/token-manager";

interface RouteButton {
  label: string;
  path: string;
}

export type NavItem = {
  icon: LucideIcon;
  label: string;
  path: string;
  subPath: string;
};

const ROUTE_BUTTONS: Record<string, RouteButton> = {
  "/courses": {
    label: "Create Course",
    path: "/createcourse",
  },
  "/classes": {
    label: "Create Class",
    path: "/createclass",
  },
  "/sheets": {
    label: "Create Sheet",
    path: "/createsheet",
  },
};

export const NAV_ITEMS: NavItem[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/",
    subPath: "",
  },
  {
    icon: BookOpen,
    label: "Courses",
    path: "/courses",
    subPath: "/createcourse",
  },
  {
    icon: Users,
    label: "Classes",
    path: "/classes",
    subPath: "/createclass",
  },

  {
    icon: FileSpreadsheet,
    label: "Sheets",
    path: "/sheets",
    subPath: "/createsheet",
  },
  {
    icon: Megaphone,
    label: "Market Cycle",
    path: "/marketcycle",
    subPath: "/createmarketcycle",
  },
];

const TopNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isCreateSheetModalOpen, setIsCreateSheetModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownReference = useRef<HTMLDivElement>(null);

  const currentNavItem = NAV_ITEMS.find(
    (item) => item.path === pathname || item.subPath === pathname,
  ) || {
    label: "Dashboard",
  };

  const routeButton = ROUTE_BUTTONS[pathname];

  // Check if current path is one of the main routes
  const isMainRoute = ["/courses", "/classes", "/sheets"].includes(pathname);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownReference.current &&
        !profileDropdownReference.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle logout
  const handleLogout = async () => {
    tokenManager.logout();
    router.push("/login");
  };

  // Common components
  const TitleSection = (
    <div className="flex items-center gap-4">
      <h1 className="text-xl font-semibold capitalize">
        {currentNavItem.label}
      </h1>
    </div>
  );

  const SearchSection = (
    <form className="relative hidden md:block" role="search">
      <Input
        type="search"
        placeholder="Search..."
        aria-label="Search for courses, classes, students and more"
        className="w-64 cursor-not-allowed rounded-lg border px-4 py-2 pr-10 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 lg:w-96"
      />
      <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
    </form>
  );

  const ProfileSection = (
    <div className="relative" ref={profileDropdownReference}>
      <div
        className="flex cursor-pointer items-center gap-3"
        onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
      >
        <div
          className="h-8 w-8 rounded-full bg-gray-200 ring-2 ring-transparent ring-offset-2 transition-all hover:ring-blue-500"
          role="img"
          aria-label="Admin profile picture"
        />
        <span className="hidden font-medium sm:inline-block">Admin</span>
      </div>

      {/* Profile dropdown */}
      {isProfileDropdownOpen && (
        <div className="absolute right-0 top-full mt-2 w-28 rounded-md border border-gray-200 bg-white shadow-md">
          <button
            className="flex w-full items-center gap-2 rounded-md px-4 py-3 text-red-600 hover:bg-gray-100"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 text-red-600" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );

  // Handle Create Sheet button click
  const handleCreateSheetClick = () => {
    if (pathname === "/sheets") {
      setIsCreateSheetModalOpen(true);
    } else {
      router.push(routeButton.path);
    }
  };

  return (
    <section className="border-b bg-white px-8 py-5">
      {isMainRoute ? (
        // Layout for main routes (courses, classes, sheets)
        <header className="container sticky top-0 z-40 mx-auto flex items-center justify-between">
          {TitleSection}

          <div className="flex items-center gap-3">
            {SearchSection}
            {routeButton && (
              <CustomButton
                variant="primary"
                className="bg-mid-blue py-3"
                onClick={handleCreateSheetClick}
              >
                {routeButton.label}
              </CustomButton>
            )}
          </div>

          {ProfileSection}
        </header>
      ) : (
        // Layout for other routes
        <header className="container sticky top-0 z-40 mx-auto flex items-center justify-between">
          {TitleSection}

          <div className="flex items-center gap-8">
            {SearchSection}
            {ProfileSection}
          </div>
        </header>
      )}

      {/* Render the CreateSheetModal */}
      <CreateSheetModal
        isOpen={isCreateSheetModalOpen}
        onClose={() => setIsCreateSheetModalOpen(false)}
      />
    </section>
  );
};

export default TopNav;
