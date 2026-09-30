"use client";

import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { cn } from "@workspace/ui/lib";
import { INDEPENDENCE_OFFER } from "@/lib/campaigns/independence";

/**
 * Nigeria @ 66 announcement bar — shown on every page from 1 to 30 October
 * 2026 (visibility is driven by CSS via the `campaign-only` class, so it never
 * flashes). Links to the Independence offer page.
 */
export const INDEPENDENCE_BANNER_HEIGHT = "h-[44px] lg:h-[48px]";

interface IndependenceBannerProps {
  onDismiss?: () => void;
  className?: string;
}

/** Three-stripe flag mark — green, white, green. */
const FlagMark = () => (
  <span
    aria-hidden
    className="hidden h-3.5 w-5 shrink-0 overflow-hidden rounded-[2px] ring-1 ring-white/40 sm:flex"
  >
    <span className="w-1/3 bg-[#008751]" />
    <span className="w-1/3 bg-white" />
    <span className="w-1/3 bg-[#008751]" />
  </span>
);

export const IndependenceBanner = ({
  onDismiss,
  className,
}: IndependenceBannerProps) => {
  return (
    <div
      role="region"
      aria-label="Independence Day offer"
      className={cn(
        "campaign-only fixed inset-x-0 top-0 z-[1000] border-b border-white/15 bg-primary text-background",
        INDEPENDENCE_BANNER_HEIGHT,
        className,
      )}
    >
      <div className="mx-auto flex h-full max-w-[1240px] items-center justify-center gap-3 px-10 sm:px-12">
        <p className="flex min-w-0 items-center gap-2 truncate text-xs font-light sm:text-sm">
          <FlagMark />
          <span className="shrink-0 rounded-full bg-white px-2 py-[2px] text-[10px] font-semibold uppercase tracking-wide text-mid-blue sm:text-[11px]">
            Nigeria @ {INDEPENDENCE_OFFER.years}
          </span>
          <span className="hidden truncate sm:inline">
            Happy Independence! Celebrate with
          </span>
          <span className="truncate font-semibold text-secondary">
            <span className="sm:hidden">
              Up to {INDEPENDENCE_OFFER.discountShort} off
            </span>
            <span className="hidden sm:inline">
              up to {INDEPENDENCE_OFFER.discount} off all courses
            </span>
          </span>
        </p>

        <Link
          href={INDEPENDENCE_OFFER.pagePath}
          className="group inline-flex shrink-0 items-center gap-1 rounded-full bg-secondary px-3 py-[6px] text-[11px] font-semibold text-primary transition-colors hover:bg-secondary/85 sm:text-xs"
        >
          <span className="sm:hidden">Details</span>
          <span className="hidden sm:inline">See the offer</span>
          <ArrowRight
            className="size-3.5 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
      </div>

      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss Independence Day offer"
          className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-background/70 transition-colors hover:bg-white/10 hover:text-background sm:right-3"
        >
          <X className="size-4" aria-hidden />
        </button>
      ) : null}
    </div>
  );
};

export default IndependenceBanner;
