import { beforeEach, describe, expect, it, vi } from "vitest";

import { Activity, getAllActivityAction } from "../activity.actions";

const mockActivities: Activity[] = [
  {
    id: "1",
    activity: "Login",
    description: "User logged in",
    createdAt: "2024-04-08T10:00:00Z",
  },
  {
    id: "2",
    activity: "Logout",
    description: "User logged out",
    createdAt: "2024-04-08T12:00:00Z",
  },
];

const mockResponseData = {
  data: {
    items: mockActivities,
    metadata: {
      totalPages: 5,
    },
  },
};

describe("getAllActivityAction", () => {
  const token = "fake-token";

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("fetches activities successfully", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponseData,
    });

    const result = await getAllActivityAction(token, 1, 2);

    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}/activities?page=1&limit=2`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(result.data).toEqual(mockActivities);
    expect(result.totalPages).toBe(5);
  });

  it("throws an error when fetch fails", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      statusText: "Unauthorized",
    });

    await expect(getAllActivityAction(token)).rejects.toThrow(
      "Failed to fetch activities: Unauthorized",
    );
  });

  it("throws an error if fetch throws", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

    await expect(getAllActivityAction(token)).rejects.toThrow("Network error");
  });
});
