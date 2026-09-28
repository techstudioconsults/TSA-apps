"use client";

import { useSyncExternalStore } from "react";
import {
  CAMPAIGN_ATTR,
  CAMPAIGN_PREVIEW_COOKIE,
  CAMPAIGN_VALUE,
  type CampaignPhase,
  getIndependencePhase,
} from "./independence";

const subscribeToHtmlAttribute = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: [CAMPAIGN_ATTR],
  });
  return () => observer.disconnect();
};

const noopSubscribe = () => () => {};

const readPreviewCookie = () => {
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${CAMPAIGN_PREVIEW_COOKIE}=([^;]*)`),
  );
  return match ? match[1] : null;
};

/**
 * True while the Independence theme is on. Reads the attribute the <head>
 * boot script sets, so it always agrees with what the CSS is showing.
 * Returns false during server render / hydration, then updates.
 */
export function useIndependenceActive(): boolean {
  return useSyncExternalStore(
    subscribeToHtmlAttribute,
    () =>
      document.documentElement.getAttribute(CAMPAIGN_ATTR) === CAMPAIGN_VALUE,
    () => false,
  );
}

/** Campaign phase for copy that differs before / during / after the offer. */
export function useIndependencePhase(): CampaignPhase | null {
  return useSyncExternalStore(
    noopSubscribe,
    () => getIndependencePhase(Date.now(), readPreviewCookie()),
    () => null,
  );
}
