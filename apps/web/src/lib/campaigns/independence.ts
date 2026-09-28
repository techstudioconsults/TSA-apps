/**
 * Nigeria @ 66 — Independence Month campaign (1–30 October 2026).
 *
 * Single source of truth for the campaign window and offer. While the window
 * is open (Lagos time), the site switches every TSA brand blue to Nigerian
 * green, shows the Independence bar on every page, and serves green versions
 * of blue image assets (see `src/middleware.ts`).
 *
 * Nothing needs to be deployed on 1 October or 31 October: the switch is
 * date-driven. To end early, set INDEPENDENCE_END earlier and redeploy.
 *
 * Preview before launch: add `?campaign=independence` to any URL (sets a
 * 1-day cookie). `?campaign=off` forces the normal theme; `?campaign=auto`
 * clears the override.
 */

/** Opens 00:00 WAT, 1 October 2026. */
export const INDEPENDENCE_START = "2026-10-01T00:00:00+01:00";
/** Closes at the end of 30 October 2026 (00:00 WAT, 31 October). */
export const INDEPENDENCE_END = "2026-10-31T00:00:00+01:00";

export const INDEPENDENCE_OFFER = {
  years: 66,
  discount: "₦66,000",
  discountShort: "₦66k",
  datesLabel: "1–30 October 2026",
  deadlineLabel: "30 October 2026",
  pagePath: "/independence",
} as const;

export const CAMPAIGN_ATTR = "data-campaign";
export const CAMPAIGN_VALUE = "independence";
export const CAMPAIGN_PREVIEW_COOKIE = "tsa_campaign_preview";

const START_MS = Date.parse(INDEPENDENCE_START);
const END_MS = Date.parse(INDEPENDENCE_END);

export type CampaignPhase = "upcoming" | "active" | "ended";

export function getIndependencePhase(
  now: number,
  preview?: string | null,
): CampaignPhase {
  if (preview === CAMPAIGN_VALUE) return "active";
  if (now >= END_MS) return "ended";
  if (now < START_MS || preview === "off") return "upcoming";
  return "active";
}

export function isIndependenceActive(now: number, preview?: string | null) {
  return getIndependencePhase(now, preview) === "active";
}

/**
 * Sets `data-campaign="independence"` on <html> when the campaign is on (or
 * previewed). Self-contained on purpose: it is serialised into the inline
 * <head> script below AND called from React as a fallback, because pages
 * that fall back to client rendering (e.g. a course page whose server render
 * fails) replace the whole document and never run the inline script.
 */
export function applyIndependenceTheme(
  startMs: number,
  endMs: number,
  cookieName: string,
  value: string,
  attr: string,
) {
  try {
    const query = new URLSearchParams(window.location.search).get("campaign");
    if (query === value || query === "off") {
      document.cookie = `${cookieName}=${query};path=/;max-age=86400;samesite=lax`;
    } else if (query === "auto") {
      document.cookie = `${cookieName}=;path=/;max-age=0;samesite=lax`;
    }
    const match = document.cookie.match(
      new RegExp(`(?:^|; )${cookieName}=([^;]*)`),
    );
    const preview = match ? match[1] : null;
    const now = Date.now();
    const on =
      preview === value || (preview !== "off" && now >= startMs && now < endMs);
    if (on) document.documentElement.setAttribute(attr, value);
    else document.documentElement.removeAttribute(attr);
  } catch {
    // Never let the theme switch break the page.
  }
}

const THEME_ARGS = [
  START_MS,
  END_MS,
  CAMPAIGN_PREVIEW_COOKIE,
  CAMPAIGN_VALUE,
  CAMPAIGN_ATTR,
] as const;

export const runIndependenceTheme = () => applyIndependenceTheme(...THEME_ARGS);

/**
 * Inline <head> script: applies the theme before first paint, so the green
 * theme and the campaign bar never flash.
 */
export const INDEPENDENCE_BOOT_SCRIPT = `(${applyIndependenceTheme.toString()})(${THEME_ARGS.map((a) => JSON.stringify(a)).join(",")});`;
