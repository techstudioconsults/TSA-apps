"use client";

import { useEffect, useState } from "react";

export type ScrollDirection = "up" | "down" | "none";

export type UseScrolledOptions = {
  threshold?: number;
  initial?: boolean;
};

export function useScrolled(options: UseScrolledOptions = {}) {
  const { threshold = 10, initial = true } = options;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Initialize
    const initY = window.scrollY || window.pageYOffset || 0;
    const isScrolled = initial ? initY > threshold : initY >= threshold;
    setScrolled(isScrolled);

    // Use Lenis scroll event if available, otherwise fallback to window scroll
    const handleScroll = () => {
      const currentY = window.scrollY || window.pageYOffset || 0;
      const isNowScrolled = initial
        ? currentY > threshold
        : currentY >= threshold;

      // Only update state if the scrolled status actually changes
      setScrolled((prev) => {
        if (prev !== isNowScrolled) {
          return isNowScrolled;
        }
        return prev;
      });
    };

    // Listen on Lenis instance if available
    const lenis = (window as any).lenis;
    if (lenis && typeof lenis.on === "function") {
      lenis.on("scroll", handleScroll);
      return () => {
        lenis.off("scroll", handleScroll);
      };
    }

    // Fallback to window scroll with passive listener
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold, initial]);

  return { scrolled };
}
