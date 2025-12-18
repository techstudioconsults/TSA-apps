import { createServiceHooks } from "@/lib/react-query/use-service-query";
import { sheetService } from "./sheet.service";
import { queryKeys } from "@/lib/react-query/query-keys";
import { SheetFormData } from "@/schemas";

const { useServiceQuery, useServiceMutation } =
  createServiceHooks(sheetService);

export function useSheetsQuery(filters: Filters, options?: any) {
  return useServiceQuery(
    queryKeys.sheets.list(filters),
    (service) => service.getSheets(filters),
    options,
  );
}

export function useSheetByIdQuery(id: string, options?: any) {
  return useServiceQuery(
    queryKeys.sheets.detail(id),
    (service) => service.getSheetById(id),
    {
      enabled: !!id,
      ...options,
    },
  );
}

export function useTotalSheetsQuery(options?: any) {
  return useServiceQuery(
    queryKeys.sheets.total(),
    (service) => service.getTotalSheets(),
    options,
  );
}

export function useCreateSheetMutation() {
  return useServiceMutation(
    (service, payload: SheetFormData) => service.createSheet(payload),
    {
      invalidateQueries: () => [
        queryKeys.sheets.lists(),
        queryKeys.sheets.total(),
      ],
    },
  );
}

export function useUpdateSheetMutation() {
  return useServiceMutation(
    (service, { id, payload }: { id: string; payload: SheetFormData }) =>
      service.updateSheet(id, payload),
    {
      invalidateQueries: (_, { id }) => [
        queryKeys.sheets.detail(id),
        queryKeys.sheets.lists(),
        queryKeys.sheets.total(),
      ],
    },
  );
}

export function useDeleteSheetMutation() {
  return useServiceMutation((service, id: string) => service.deleteSheet(id), {
    invalidateQueries: () => [
      queryKeys.sheets.lists(),
      queryKeys.sheets.total(),
    ],
  });
}
