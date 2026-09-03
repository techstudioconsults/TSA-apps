"use client";

import Link from "next/link";
import { ArrowRight, PartyPopper, X } from "lucide-react";
import { cn } from "@workspace/ui/lib";

/**
 * TSA 8-Year Anniversary announcement bar.
 *
 * Rendered across every landing page from `(landing-routes)/layout.tsx`.
 * To change the offer, edit the `PROMO` object below (copy, highlight,
 * button label and destination). Dismissal is handled by the layout and
 * remembered for the browser session.
 */
export const PROMO = {
  badge: "8 Years",
  message: "Celebrating our 8-year anniversary —",
  highlight: "₦100,000 off all courses",
  ctaLabel: "View courses",
  ctaHref: "/explore",
} as const;

export const PROMO_BANNER_HEIGHT = "h-[44px] lg:h-[48px]";

interface PromoBannerProps {
  onDismiss?: () => void;
  className?: string;
}

export const PromoBanner = ({ onDismiss, className }: PromoBannerProps) => {
  return (
    <div
      role="region"
      aria-label="Anniversary offer"
      className={cn(
        "fixed inset-x-0 top-0 z-[1000] border-b border-secondary/30 bg-primary text-background",
        PROMO_BANNER_HEIGHT,
        className,
      )}
    >
      <div className="mx-auto flex h-full max-w-[1240px] items-center justify-center gap-3 px-10 sm:px-12">
        <p className="flex min-w-0 items-center gap-2 truncate text-xs font-light sm:text-sm">
          <PartyPopper
            className="hidden size-4 shrink-0 text-secondary sm:block"
            aria-hidden
          />
          <span className="shrink-0 rounded-full bg-secondary px-2 py-[2px] text-[10px] font-semibold uppercase tracking-wide text-primary sm:text-[11px]">
            {PROMO.badge}
          </span>
          <span className="hidden truncate sm:inline">{PROMO.message}</span>
          <span className="truncate font-semibold text-secondary">
            {PROMO.highlight}
          </span>
        </p>

        <Link
          href={PROMO.ctaHref}
          className="group inline-flex shrink-0 items-center gap-1 rounded-full bg-secondary px-3 py-[6px] text-[11px] font-semibold text-primary transition-colors hover:bg-secondary/85 sm:text-xs"
        >
          {PROMO.ctaLabel}
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
          aria-label="Dismiss anniversary offer"
          className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-background/70 transition-colors hover:bg-white/10 hover:text-background sm:right-3"
        >
          <X className="size-4" aria-hidden />
        </button>
      ) : null}
    </div>
  );
};

export default PromoBanner;
