"use server";

import { LeadFormData, MarketingCycle } from "~/schemas/lead-form";

const BASE_URL = process.env["NEXT_PUBLIC_API_URL"];

export async function getLatestMarketingCycle(): Promise<MarketingCycle> {
  const response = await fetch(`${BASE_URL}/marketing-cycles/latest`);
  if (!response.ok) {
    throw new Error("Failed to fetch latest marketing cycle");
  }
  return response.json();
}

export async function submitLeadForm(
  data: LeadFormData,
  marketingCycleId: string,
) {
  try {
    const response = await fetch(
      `${BASE_URL}/marketing-cycles/${marketingCycleId}/leads`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || "Failed to submit lead form" };
    }

    const responseData = await response.json();
    return { success: responseData.message };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
