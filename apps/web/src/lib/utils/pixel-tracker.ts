/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect } from "react";

type PixelOptions = {
  autoConfig?: boolean;
  debug?: boolean;
};

const trackEvent = (event: string, data?: any) => {
  if (typeof window !== "undefined") {
    import("react-facebook-pixel")
      .then((module) => {
        module.default.track(event, data);
      })
      .catch(console.error);
  }
};

const useFacebookPixel = (
  pixelId?: string,
  advancedMatching?: any,
  options?: PixelOptions,
) => {
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    if (!pixelId) {
      console.warn("Facebook Pixel ID is required");
      return;
    }

    // Dynamically import the library only on client side
    import("react-facebook-pixel")
      .then((module) => {
        const ReactPixel = module.default;
        // Initialize the pixel
        ReactPixel.init(pixelId, advancedMatching, {
          autoConfig: options?.autoConfig ?? true,
          debug: options?.debug ?? false,
        });
      })
      .catch((error) => {
        console.error("Failed to load Facebook Pixel", error);
      });
  }, [pixelId, advancedMatching, options]);

  // Similar implementations for other tracking methods...

  return {
    trackEvent,
    // Add other pixel methods as needed
  };
};

export default useFacebookPixel;
