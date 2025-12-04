/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServiceHooks } from "@/lib/react-query/use-service-query";
import { queryKeys } from "@/lib/react-query/query-keys";
import { classService } from "./class.service";
import { classSubmitFormData } from "@/schemas";

const { useServiceQuery, useServiceMutation } =
  createServiceHooks(classService);

export function useClassesQuery(
  courseId: string,
  filters: Filters,
  options?: any,
) {
  // include courseId in the query key to ensure separate cache entries per course
  const key = queryKeys.classes.list({ ...(filters as any), courseId });
  return useServiceQuery(
    key,
    (service) => service.getClasses(courseId, filters),
    {
      enabled: !!courseId,
      ...options,
    },
  );
}

export function useClassByIdQuery(id: string, options?: any) {
  return useServiceQuery(
    queryKeys.classes.detail(id),
    (service) => service.getClassById(id),
    {
      enabled: !!id,
      ...options,
    },
  );
}

export function useCreateClassMutation() {
  return useServiceMutation(
    (
      service,
      payload: classSubmitFormData & {
        courseId: string;
      },
    ) => service.createClass(payload),
    {
      invalidateQueries: () => [queryKeys.classes.lists()],
    },
  );
}

export function useUpdateClassMutation() {
  return useServiceMutation(
    (service, { id, payload }: { id: string; payload: classSubmitFormData }) =>
      service.updateClass(id, payload),
    {
      invalidateQueries: (_, { id }) => [
        queryKeys.classes.detail(id),
        queryKeys.classes.lists(),
      ],
    },
  );
}

export function useDeleteClassMutation() {
  return useServiceMutation((service, id: string) => service.deleteClass(id), {
    invalidateQueries: () => [queryKeys.classes.lists()],
  });
}
