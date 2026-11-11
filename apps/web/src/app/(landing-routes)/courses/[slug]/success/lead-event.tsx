"use client";

import { useEffect } from "react";
import { firePendingLead } from "@/lib/utils/meta-lead";

/** Sends the Meta Lead event once per real form submission (see meta-lead.ts). */
export function LeadEvent() {
  useEffect(() => {
    firePendingLead();
  }, []);
  return null;
}
