import Link from "next/link";
import { INDEPENDENCE_OFFER } from "@/lib/campaigns/independence";

/**
 * Compact Independence notice for pages without the main navbar (e.g.
 * /register). Only visible 1–30 October 2026 (`campaign-only`).
 */
export const IndependenceStrip = () => (
  <div className="campaign-only w-full max-w-[560px] rounded-lg border border-mid-blue/25 bg-low-blue px-4 py-3 text-sm text-primary">
    <span className="font-semibold">Nigeria @ {INDEPENDENCE_OFFER.years}:</span>{" "}
    {INDEPENDENCE_OFFER.discount} off every course when you register by{" "}
    {INDEPENDENCE_OFFER.deadlineLabel}.{" "}
    <Link
      href={INDEPENDENCE_OFFER.pagePath}
      className="font-semibold text-mid-blue underline underline-offset-2"
    >
      Offer details
    </Link>
  </div>
);

export default IndependenceStrip;
