"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function SourceTracker() {
  const searchParameters = useSearchParams();

  useEffect(() => {
    const source = searchParameters.get("utm_source");

    if (source) {
      // Store the UTM source if present
      localStorage.setItem("utm_source", source);
    } else {
      // If no UTM parameter exists, set to "direct"
      // This ensures we always have the correct source, even if there was a previous UTM source
      localStorage.setItem("utm_source", "direct");
    }
  }, [searchParameters]);

  return null;
}
