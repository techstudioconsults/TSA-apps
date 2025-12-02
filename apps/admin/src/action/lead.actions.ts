import { LeadResponse } from "~/schemas/lead.schema";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchMarketingCycleLeads(
  cycleId: string,
  token: string,
): Promise<LeadResponse> {
  const response = await fetch(`${API_URL}/marketing-cycles/${cycleId}/leads`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch leads");
  }

  return response.json();
}
