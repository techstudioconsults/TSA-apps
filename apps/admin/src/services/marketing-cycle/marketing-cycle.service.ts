import { HttpAdapter } from "@/lib/http/http-adapter";
import {
  MarketingCycle,
  MarketingCycleFormData,
} from "@/schemas/marketing-cycle.schema";

const httpAdapter = new HttpAdapter();

export class MarketingCycleService {
  async getMarketingCycles(filters: Filters) {
    const response = await httpAdapter.get<
      PaginatedApiResponse<MarketingCycle>
    >("/marketing-cycles", {
      ...filters,
    });

    if (response?.status === 200) {
      return response.data;
    }
  }

  async getMarketingCycleById(id: string) {
    const response = await httpAdapter.get<ApiResponse<MarketingCycle>>(
      `/marketing-cycles/${id}`,
    );

    if (response?.status === 200) {
      return response.data.data;
    }
  }

  async createMarketingCycle(payload: MarketingCycleFormData) {
    const response = await httpAdapter.post("/marketing-cycles", payload);

    if (response?.status === 201 || response?.status === 200) {
      return response.data;
    }
  }

  async updateMarketingCycle(id: string, payload: MarketingCycleFormData) {
    const response = await httpAdapter.patch(
      `/marketing-cycles/${id}`,
      payload,
    );

    if (response?.status === 200) {
      return response.data;
    }
  }

  async deleteMarketingCycle(id: string) {
    const response = await httpAdapter.delete(`/marketing-cycles/${id}`);

    if (response?.status === 200) {
      return response.data;
    }
  }
}

export const marketingCycleService = new MarketingCycleService();
