"use client";

import { cn } from "@workspace/ui/lib";
import {
  INDEPENDENCE_END,
  INDEPENDENCE_OFFER,
} from "@/lib/campaigns/independence";
import { useIndependencePhase } from "@/lib/campaigns/use-independence";

const DAY_MS = 24 * 60 * 60 * 1000;

/** Live status pill: upcoming / days left / ended. Static text until hydrated. */
export const OfferStatus = ({ className }: { className?: string }) => {
  const phase = useIndependencePhase();

  let label: string = `Runs ${INDEPENDENCE_OFFER.datesLabel}`;
  if (phase === "upcoming") label = "Starts 1 October 2026";
  if (phase === "active") {
    const daysLeft = Math.max(
      1,
      Math.ceil((Date.parse(INDEPENDENCE_END) - Date.now()) / DAY_MS),
    );
    label =
      daysLeft === 1
        ? "Last day — ends tonight at midnight"
        : `Ends 30 October · ${daysLeft} days left`;
  }
  if (phase === "ended") label = "This offer ended on 30 October 2026";

  return (
    <p
      role="status"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm text-white",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-2 rounded-full",
          phase === "ended" ? "bg-white/50" : "bg-secondary",
        )}
      />
      {label}
    </p>
  );
};
