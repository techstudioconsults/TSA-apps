import { HttpAdapter } from "@/lib/http/http-adapter";
import { SheetFormData } from "@/schemas";

const httpAdapter = new HttpAdapter();

export interface Sheet {
  id: string;
  spreadsheetId: string;
  title: string;
  url: string;
  month: string;
  year: string;
  createdAt: string;
}

export class SheetService {
  async getSheets(filters: Filters) {
    const response = await httpAdapter.get<PaginatedApiResponse<Sheet>>(
      "/spreadsheets",
      {
        ...filters,
      },
    );
    if (response?.status === 200) {
      return response.data;
    }
  }

  async getSheetById(id: string) {
    const response = await httpAdapter.get<ApiResponse<Sheet>>(
      `/spreadsheets/${id}`,
    );
    if (response?.status === 200) {
      return response.data.data;
    }
  }

  async getTotalSheets() {
    const response = await httpAdapter.get("/spreadsheets/total");
    if (response?.status === 200) {
      return response.data;
    }
  }

  async createSheet(payload: SheetFormData) {
    const response = await httpAdapter.post("/spreadsheets", payload);
    if (response?.status === 201) {
      return response.data;
    }
  }

  async updateSheet(id: string, payload: SheetFormData) {
    const response = await httpAdapter.patch(`/spreadsheets/${id}`, payload);
    if (response?.status === 200) {
      return response.data;
    }
  }

  async deleteSheet(id: string) {
    const response = await httpAdapter.delete(`/spreadsheets/${id}`);
    if (response?.status === 200) {
      return response.data;
    }
  }
}

export const sheetService = new SheetService();
