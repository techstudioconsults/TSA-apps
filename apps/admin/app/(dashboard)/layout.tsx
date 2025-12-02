"use client";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components";
import { IoBookSharp } from "react-icons/io5";
import { AppSidebar } from "@workspace/ui/lib";
import { BsFileEarmarkSpreadsheetFill } from "react-icons/bs";
import { SiGoogleclassroom } from "react-icons/si";
import { MdDashboard } from "react-icons/md";
import { MdAnnouncement } from "react-icons/md";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar
        navSecondary={[]}
        navMain={[
          {
            title: "Overview",
            url: "/",
            icon: MdDashboard,
            isActive: true,
          },
          {
            title: "Courses",
            url: "/courses",
            icon: IoBookSharp,
            isActive: true,
          },
          {
            title: "Classes",
            url: "/classes",
            icon: SiGoogleclassroom,
            isActive: true,
          },
          {
            title: "Sheets",
            url: "/sheets",
            icon: BsFileEarmarkSpreadsheetFill,
            isActive: true,
          },
          {
            title: "Market Cycle",
            url: "/market-cycle",
            icon: MdAnnouncement,
            isActive: true,
          },
        ]}
        navMainTitle="Dashboard"
      />
      <SidebarInset>
        <main className="flex flex-1 flex-col gap-4 p-4">
          <SidebarTrigger className="-ml-1" />
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
