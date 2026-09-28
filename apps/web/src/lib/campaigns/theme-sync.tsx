"use client";

import { useLayoutEffect } from "react";
import { runIndependenceTheme } from "./independence";

/**
 * Fallback for the <head> boot script. If React has to client-render the
 * whole document (e.g. a page whose server render failed), the inline script
 * never runs; this re-applies the Independence theme before paint.
 */
export function IndependenceThemeSync() {
  useLayoutEffect(() => {
    runIndependenceTheme();
  }, []);
  return null;
}
