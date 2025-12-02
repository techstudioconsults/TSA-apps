import { SheetFormData } from "~/schemas";
import { httpAdapter } from "@/lib/http/http-adapter";

const BASE_URL = `/spreadsheets`;

// Create Spreadsheet Action
export const createSpreadsheetAction = async (
  data: SheetFormData,
): Promise<void> => {
  try {
    await httpAdapter.post(BASE_URL, data);
  } catch (error) {
    console.error("Error in createSpreadsheetAction:", error);
    throw error;
  }
};

// Get All Spreadsheets Action
export const getSpreadsheetsAction = async () => {
  try {
    const response = await httpAdapter.get(BASE_URL);
    return response.data?.items || []; // Ensure we extract the correct array
  } catch (error) {
    console.error("Error in getSpreadsheetsAction:", error);
    throw error;
  }
};

export const getTotalSheetAction = async (): Promise<number> => {
  try {
    const response = await httpAdapter.get(`${BASE_URL}/total`);

    // Add validation for response structure
    if (typeof response.data?.totalSpreadsheet !== "number") {
      throw new TypeError("Invalid total spreadsheet count format");
    }

    return response.data.totalSpreadsheet;
  } catch (error) {
    console.error("Error in getTotalSheetAction:", error);
    throw error;
  }
};
