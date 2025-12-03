"use client";

import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { cn } from "../utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Skeleton,
} from "@workspace/ui/components";

export interface UserMenuProperties {
  userName: string;
  userEmail?: string;
  userAvatar?: string;
  userRole?: string;
  isLoading?: boolean;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogout?: () => void;
  className?: string;
}

export function UserMenu({
  userName,
  userEmail,
  userAvatar,
  userRole,
  onProfileClick,
  onSettingsClick,
  onLogout,
  className,
  isLoading,
}: UserMenuProperties) {
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "focus-visible:ring-ring flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors focus:outline-none focus-visible:ring-2",
          className,
        )}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="hidden md:flex flex-col gap-1">
              <Skeleton className="h-3 w-24 rounded-sm" />
              <Skeleton className="h-3 w-32 rounded-sm" />
            </div>
          </div>
        ) : (
          <>
            <Avatar className="size-8">
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="hidden flex-col items-start text-left md:flex">
              <span className="text-sm leading-none font-medium capitalize">
                {userName}
              </span>
              {userEmail && (
                <p className="text-muted-foreground text-xs font-normal">
                  {userEmail}
                </p>
              )}
            </div>
            <ChevronDown className="text-muted-foreground size-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={14}
        align="end"
        className="min-w-56 shadow-none"
      >
        {isLoading ? (
          <div className="p-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-3 w-28 rounded-sm" />
                <Skeleton className="h-3 w-20 rounded-sm" />
              </div>
            </div>
          </div>
        ) : (
          <>
            <DropdownMenuLabel>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium capitalize">{userName}</p>
                {userRole && (
                  <span className="text-gray mt-1 text-[11px] capitalize">
                    {userRole}
                  </span>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={onProfileClick}
                className="cursor-pointer"
              >
                <User className="mr-2 size-4" />
                <span>My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onSettingsClick}
                className="cursor-pointer"
              >
                <Settings className="mr-2 size-4" />
                <span>Account Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={onLogout}
              className="text-destructive focus:text-destructive cursor-pointer"
              variant="destructive"
            >
              <LogOut className="mr-2 size-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
