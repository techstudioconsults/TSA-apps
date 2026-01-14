"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@workspace/ui/components";
import { cn } from "../../../utils";
import Link from "next/link";

export function NavProjects({
  title,
  projects,
}: {
  title?: string;
  projects: {
    name: string;
    url: string;
    icon?: any;
    isActive?: boolean;
  }[];
}) {
  const { state, isMobile, setOpenMobile } = useSidebar();

  const handleProjectClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <SidebarGroup className="">
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu className="gap-5">
        {projects.map((item) => (
          <SidebarMenuItem
            className={cn(
              state === "collapsed" && "flex items-center justify-center",
            )}
            key={item.name}
          >
            <Link href={item.url} onClick={handleProjectClick}>
              <SidebarMenuButton
                className={cn(
                  "hover:bg-white/10 w-full cursor-pointer p-6 transition-all duration-75",
                  item.isActive &&
                    " bg-mid-blue text-white font-medium shadow-[0px_0px_0px_2px_#0266F333]",
                )}
              >
                <div>
                  {item.icon && <item.icon className={cn("-ml-1 size-5!")} />}
                </div>
                <span className="group-data-[collapsible=icon]:hidden font-medium">
                  {item.name}
                </span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
