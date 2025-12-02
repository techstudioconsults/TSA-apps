import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  createSpreadsheetAction,
  getSpreadsheetsAction,
  getTotalSheetAction,
} from "~/action/sheet.actions";
import { SheetFormData } from "~/schemas"; // adjust import as needed

const token = "test-token";

const dummySheetData: SheetFormData = {
  title: "Test Sheet",
};

describe("Spreadsheet Actions", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("createSpreadsheetAction", () => {
    it("successfully creates a spreadsheet", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
      });

      await expect(
        createSpreadsheetAction(dummySheetData, token),
      ).resolves.toBeUndefined();

      expect(fetch).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_API_URL}/spreadsheets`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dummySheetData),
        },
      );
    });

    it("throws an error when creation fails", async () => {
      const errorResponse = {
        message: "Invalid data",
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => errorResponse,
      });

      await expect(
        createSpreadsheetAction(dummySheetData, token),
      ).rejects.toEqual({
        status: 400,
        message: "Invalid data",
        details: errorResponse,
      });
    });
  });

  describe("getSpreadsheetsAction", () => {
    const spreadsheetMock = [
      { id: "1", title: "Sheet 1" },
      { id: "2", title: "Sheet 2" },
    ];

    it("successfully fetches spreadsheets", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          data: { items: spreadsheetMock },
        }),
      });

      const result = await getSpreadsheetsAction(token);

      expect(fetch).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_API_URL}/spreadsheets`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      expect(result).toEqual(spreadsheetMock);
    });

    it("throws an error when fetching fails", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        statusText: "Forbidden",
      });

      await expect(getSpreadsheetsAction(token)).rejects.toThrow(
        "Failed to fetch spreadsheets: Forbidden",
      );
    });
  });

  describe("getTotalSheetAction", () => {
    it("successfully fetches total spreadsheet count", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          data: {
            totalSpreadsheet: 42,
          },
        }),
      });

      const result = await getTotalSheetAction(token);

      expect(fetch).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_API_URL}/spreadsheets/total`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      expect(result).toBe(42);
    });

    it("throws an error if total is not a number", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          data: {
            totalSpreadsheet: "not-a-number",
          },
        }),
      });

      await expect(getTotalSheetAction(token)).rejects.toThrow(
        "Invalid total spreadsheet count format",
      );
    });

    it("throws an error if fetch fails", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        statusText: "Internal Server Error",
      });

      await expect(getTotalSheetAction(token)).rejects.toThrow(
        "Failed to fetch total Sheets: Internal Server Error",
      );
    });
  });
});
