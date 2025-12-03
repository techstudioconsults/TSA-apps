// Dashboard service layer: encapsulates API calls and DTO mapping

import { HttpAdapter } from "@/lib/http/http-adapter";

const httpAdapter = new HttpAdapter();

export interface Activity {
  id: string;
  activity: string;
  description: string;
  createdAt: string;
}

export interface ActivitiesResult {
  activities: Activity[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

interface ActivityResponseDTO {
  message: string;
  data?: {
    items: Activity[];
    metadata: {
      totalPages: number;
      currentPage: number;
      totalItems: number;
      itemsPerPage: number;
    };
  };
  error?: string;
}

export interface DashboardStats {
  totalCourses: number;
  totalCohorts: number;
  totalSheets: number;
}

interface TotalCohortsResponseDTO {
  data: {
    totalCohorts: number;
  };
}

interface TotalCoursesResponseDTO {
  data: {
    totalCourses: number;
  };
}

interface TotalSheetsResponseDTO {
  data: {
    totalSpreadsheet: number;
  };
}

export class DashboardService {
  async getActivities(filters: Filters): Promise<ActivitiesResult> {
    const response = await httpAdapter.get<ActivityResponseDTO>("/activities", {
      ...filters,
    });

    if (!response?.data) {
      throw new Error("Failed to fetch activities");
    }

    const dto = response.data;

    if (dto.message === "success" && dto.data) {
      return {
        activities: dto.data.items,
        totalPages: dto.data.metadata.totalPages,
        currentPage: dto.data.metadata.currentPage,
        totalItems: dto.data.metadata.totalItems,
      };
    }

    throw new Error(dto.error || "Failed to fetch activities");
  }

  async getDashboardStats(): Promise<DashboardStats> {
    // Fetch all stats in parallel
    const [cohortsResponse, coursesResponse, sheetsResponse] =
      await Promise.all([
        httpAdapter.get<TotalCohortsResponseDTO>("/cohorts/total"),
        httpAdapter.get<TotalCoursesResponseDTO>("/courses/total"),
        httpAdapter.get<TotalSheetsResponseDTO>("/spreadsheets/total"),
      ]);

    if (
      !cohortsResponse?.data ||
      !coursesResponse?.data ||
      !sheetsResponse?.data
    ) {
      throw new Error("Failed to fetch dashboard stats");
    }

    return {
      totalCohorts: cohortsResponse.data.data.totalCohorts,
      totalCourses: coursesResponse.data.data.totalCourses,
      totalSheets: sheetsResponse.data.data.totalSpreadsheet,
    };
  }
}

export const dashboardService = new DashboardService();
