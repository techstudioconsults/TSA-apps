"use client";

import { useEffect, useRef, useState } from "react";

export type ScrollDirection = "up" | "down" | "none";

export type UseScrolledOptions = {
  threshold?: number; // Pixels from top before considered "scrolled"
  initial?: boolean; // If true, scrolled when y > threshold. If false, y >= threshold
  debounce?: number; // Debounce time in ms. 0 = no debounce (uses rAF)
};

export function useScrolled(options: UseScrolledOptions = {}) {
  const { threshold = 10, initial = true, debounce = 0 } = options;
  const [y, setY] = useState(0);
  const [direction, setDirection] = useState<ScrollDirection>("none");
  const lastYRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY || window.pageYOffset || 0;

      if (debounce > 0) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setY(currentY);
          setDirection(
            currentY > lastYRef.current
              ? "down"
              : currentY < lastYRef.current
                ? "up"
                : "none",
          );
          lastYRef.current = currentY;
        }, debounce);
        return;
      }

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setY(currentY);
        setDirection(
          currentY > lastYRef.current
            ? "down"
            : currentY < lastYRef.current
              ? "up"
              : "none",
        );
        lastYRef.current = currentY;
      });
    };

    // initialize
    const initY = window.scrollY || window.pageYOffset || 0;
    setY(initY);
    lastYRef.current = initY;

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [debounce]);

  const scrolled = initial ? y > threshold : y >= threshold;
  return { scrolled, y, direction };
}
