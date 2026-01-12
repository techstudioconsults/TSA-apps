"use client";

import Lenis from "@studio-freight/lenis";
import { useEffect, useRef, type ReactNode } from "react";

interface LenisProviderProperties {
  children: ReactNode;
}

/**
 * LenisProvider
 *
 * Single, app-wide Lenis instance wired to requestAnimationFrame.
 *
 * Key points:
 * - Only runs on the client
 * - Respects `prefers-reduced-motion: reduce` by not initializing Lenis
 * - Cleans up the rAF loop and Lenis instance on unmount
 */
export function LenisProvider({ children }: LenisProviderProperties) {
  const frameReference = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Respect users that prefer reduced motion: keep native scrolling.
    if (mediaQuery.matches) {
      return;
    }

    const lenisOptions = {
      duration: 1.1,
      smoothWheel: true,
      smoothTouch: false,
      gestureDirection: "vertical",
    } as const;

    const lenis = new Lenis(lenisOptions);

    // Expose lenis instance globally for hooks to access
    (window as any).lenis = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      frameReference.current = window.requestAnimationFrame(raf);
    };

    frameReference.current = window.requestAnimationFrame(raf);

    return () => {
      if (frameReference.current !== null) {
        window.cancelAnimationFrame(frameReference.current);
      }

      // Clean up global reference
      (window as any).lenis = null;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
