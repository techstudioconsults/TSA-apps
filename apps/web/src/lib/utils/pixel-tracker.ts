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
      .catch(() => {});
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
      .catch(() => {});
  }, [pixelId, advancedMatching, options]);

  // Similar implementations for other tracking methods...

  return {
    trackEvent,
    // Add other pixel methods as needed
  };
};

export default useFacebookPixel;
