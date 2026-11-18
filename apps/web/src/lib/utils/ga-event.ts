/**
 * Send a GA4 event through gtag.js (loaded by components/miscellaneous/google-analytics.tsx).
 *
 * gtag only exists in production, outside Vercel previews. On a hard page load
 * the init script may not have run yet, so wait up to 5 seconds for it. If it
 * never appears (dev, previews, blocked by an ad blocker), do nothing.
 */

declare global {
  interface Window {
    gtag?: (...arguments_: unknown[]) => void;
  }
}

export function sendGaEvent(name: string, parameters: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  const send = () => window.gtag?.("event", name, parameters);

  if (window.gtag) {
    send();
    return;
  }
  let tries = 0;
  const timer = window.setInterval(() => {
    tries += 1;
    if (window.gtag) {
      window.clearInterval(timer);
      send();
    } else if (tries >= 25) {
      window.clearInterval(timer);
    }
  }, 200);
}
