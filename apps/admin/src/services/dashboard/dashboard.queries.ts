/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServiceHooks } from "../../lib/react-query/use-service-query";
import {
  dashboardService,
  type ActivitiesResult,
  type DashboardStats,
} from "./dashboard.service";
import { queryKeys } from "../../lib/react-query/query-keys";

/**
 * Dashboard queries (React Query) layered over DashboardService.
 * - Keeps API details isolated in the service
 * - Keeps query lifecycle in the data layer (not in UI components)
 * - Uses centralized query keys for consistency (DRY principle)
 * - Token management handled by HTTP interceptor
 * - Uses createServiceHooks for standardized React Query integration
 */

const { useServiceQuery } = createServiceHooks(dashboardService);

export const useActivitiesQuery = (filters: Filters, options?: any) => {
  return useServiceQuery<ActivitiesResult>(
    queryKeys.dashboard.activities(filters),
    (service) => service.getActivities(filters),
    options,
  );
};

export const useDashboardStatsQuery = (options?: any) => {
  return useServiceQuery<DashboardStats>(
    queryKeys.dashboard.stats(),
    (service) => service.getDashboardStats(),
    {
      staleTime: 30000, // Cache for 30 seconds
      ...options,
    },
  );
};
