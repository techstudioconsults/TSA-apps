import { create } from "zustand";

import {
  createSpreadsheetAction,
  // deleteSpreadsheetAction,
  getSpreadsheetsAction,
  getTotalSheetAction,
} from "@/action/sheet.actions";

interface Sheet {
  id: string;
  title: string;
  url: string;
  createdAt: string;
}

// API response type
interface FetchSheetsResponse {
  id: string;
  title: string;
  url: string;
  createdAt: string;
}

interface SheetState {
  sheetData: Sheet[];
  isLoading: boolean;
  error: string | null;
  fetchSheets: () => Promise<void>;
  createSheet: (data: { title: string }) => Promise<void>;
  // deleteSheet: (sheetId: string) => Promise<void>;
  totalSheet: number;
  fetchTotalSheets: () => Promise<void>;
}

export const useSheetStore = create<SheetState>((set) => ({
  sheetData: [],
  totalSheet: 0,
  error: null,
  isLoading: false,

  fetchSheets: async () => {
    set({ isLoading: true, error: null });
    try {
      const sheets: FetchSheetsResponse[] = await getSpreadsheetsAction();
      const formattedSheets = sheets.map((sheet) => ({
        id: sheet.id,
        title: sheet.title,
        url: sheet.url,
        createdAt: sheet.createdAt,
      }));
      set({ sheetData: formattedSheets, isLoading: false, error: null });
    } catch (error) {
      set({ error: "Failed to load sheets", isLoading: false });
      console.error("Failed to fetch sheets:", error);
    }
  },

  createSheet: async (data) => {
    try {
      await createSpreadsheetAction(data);
      set((state) => ({
        sheetData: [
          ...state.sheetData,
          {
            ...data,
            id: Date.now().toString(),
            url: "",
            createdAt: new Date().toISOString(),
          },
        ],
      }));
    } catch (error) {
      console.error("Failed to create sheet:", error);
    }
  },

  fetchTotalSheets: async () => {
    try {
      const total = await getTotalSheetAction();
      set({ totalSheet: total });
    } catch (error) {
      console.error("Error fetching total sheets:", error);
    }
  },
}));

// deleteSheet: async (sheetId, token) => {
//   try {
//     await deleteSpreadsheetAction(sheetId, token);
//     set((state) => ({
//       sheetData: state.sheetData.filter((sheet) => sheet.id !== sheetId),
//     }));
//   } catch (error) {
//     console.error("Failed to delete sheet:", error);
//   }
// },
