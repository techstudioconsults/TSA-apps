import {
  MarketingCycle,
  MarketingCycleFormData,
} from "~/schemas/marketing-cycle.schema";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/marketing-cycles`;

export async function fetchMarketingCycles(
  token: string,
): Promise<MarketingCycle[]> {
  const response = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Failed to fetch marketing cycles");

  const result = await response.json();
  console.log("API Response:", result);

  // Handle the paginated response structure
  if (result.success && result.data && result.data.items) {
    return result.data.items;
  }

  throw new Error("Invalid response format from server");
}

export async function createMarketingCycle(
  data: MarketingCycleFormData,
  token: string,
) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create marketing cycle");
  }
  return response.json();
}

export async function updateMarketingCycle(
  id: string,
  data: Partial<MarketingCycleFormData>,
  token: string,
) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update marketing cycle");
  }
  return response.json();
}

export async function deleteMarketingCycle(id: string, token: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete marketing cycle");
  }
  return response.json();
}
