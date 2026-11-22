"use client";

import { ChevronDown, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { tokenManager } from "@/lib/http/token-manager";
import { useCurrentUser } from "@/services/auth/auth.queries";
import { BrandMark } from "./brand-mark";

function initials(first?: string, last?: string) {
  return `${first?.[0] ?? ""}${last?.[0] ?? ""}`.toUpperCase() || "?";
}

export function SiteHeader() {
  const { data: user } = useCurrentUser();
  const pathname = usePathname();
  const router = useRouter();
  const client = useQueryClient();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent | KeyboardEvent) => {
      if (
        event instanceof KeyboardEvent
          ? event.key === "Escape"
          : !menuRef.current?.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  const logout = () => {
    tokenManager.logout();
    client.clear();
    router.replace("/login");
  };

  const onHome = pathname === "/";

  return (
    <header className="border-line border-b bg-white">
      <div className="mx-auto flex min-h-16 max-w-[1200px] items-center gap-4 px-4 py-2 sm:gap-8 sm:px-6">
        <BrandMark />
        <nav aria-label="Main" className="hidden flex-1 gap-1 sm:flex">
          <Link
            href="/"
            aria-current={onHome ? "page" : undefined}
            className={`rounded-md px-3.5 py-2.5 text-[15px] font-semibold no-underline ${onHome ? "bg-action-soft text-action" : "text-ink"}`}
          >
            My courses
          </Link>
        </nav>
        <div ref={menuRef} className="relative ml-auto">
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="text-ink flex h-11 items-center gap-2.5 rounded-md px-2 text-[15px] font-medium"
          >
            <span className="bg-navy flex size-9 items-center justify-center rounded-full text-[13px] font-semibold text-white">
              {initials(user?.firstName, user?.lastName)}
            </span>
            <span className="hidden sm:inline">
              {user ? `${user.firstName} ${user.lastName}` : "Account"}
            </span>
            <ChevronDown
              className="text-ink-muted size-4"
              strokeWidth={1.5}
              aria-hidden
            />
          </button>
          {open ? (
            <div
              role="menu"
              className="border-line absolute right-0 z-20 mt-2 w-56 rounded-[10px] border bg-white p-1 shadow-lg"
            >
              {user ? (
                <p className="text-ink-muted m-0 truncate px-3 py-2 text-[13px]">
                  {user.email}
                </p>
              ) : null}
              <button
                role="menuitem"
                type="button"
                onClick={logout}
                className="text-ink hover:bg-surface-sunken flex h-11 w-full items-center gap-2 rounded-md px-3 text-left text-[15px]"
              >
                <LogOut className="size-4" strokeWidth={1.5} aria-hidden /> Log
                out
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
