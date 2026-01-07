import { createServiceHooks } from "@/lib/react-query/use-service-query";
import { queryKeys } from "@/lib/react-query/query-keys";
import { MarketingCycleFormData } from "@/schemas/marketing-cycle.schema";
import { marketingCycleService } from "./marketing-cycle.service";

const { useServiceQuery, useServiceMutation } = createServiceHooks(
  marketingCycleService,
);

export function useMarketingCyclesQuery(filters: Filters, options?: any) {
  return useServiceQuery(
    queryKeys.marketingCycles.list(filters),
    (service) => service.getMarketingCycles(filters),
    options,
  );
}

export function useMarketingCycleByIdQuery(id: string, options?: any) {
  return useServiceQuery(
    queryKeys.marketingCycles.detail(id),
    (service) => service.getMarketingCycleById(id),
    {
      enabled: !!id,
      ...options,
    },
  );
}

export function useCreateMarketingCycleMutation() {
  return useServiceMutation(
    (service, payload: MarketingCycleFormData) =>
      service.createMarketingCycle(payload),
    {
      invalidateQueries: () => [queryKeys.marketingCycles.lists()],
    },
  );
}

export function useUpdateMarketingCycleMutation() {
  return useServiceMutation(
    (
      service,
      { id, payload }: { id: string; payload: MarketingCycleFormData },
    ) => service.updateMarketingCycle(id, payload),
    {
      invalidateQueries: (_, { id }) => [
        queryKeys.marketingCycles.detail(id),
        queryKeys.marketingCycles.lists(),
      ],
    },
  );
}

export function useDeleteMarketingCycleMutation() {
  return useServiceMutation(
    (service, id: string) => service.deleteMarketingCycle(id),
    {
      invalidateQueries: () => [queryKeys.marketingCycles.lists()],
    },
  );
}
