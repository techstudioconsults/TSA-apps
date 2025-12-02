import { createServiceHooks } from "@/lib/react-query/use-service-query";
import { coursesService, CourseData } from "@/lib/services/courses";
import { queryKeys } from "@/lib/react-query/query-keys";

const { useServiceQuery, useServiceMutation } =
  createServiceHooks(coursesService);

export const useCoursesQuery = () =>
  useServiceQuery<CourseData[]>(queryKeys.courses.list(), (svc) => svc.list());

export const useCourseByIdQuery = (id: string) =>
  useServiceQuery<CourseData>(
    queryKeys.courses.byId(id),
    (svc) => svc.getById(id),
    {
      enabled: !!id,
    },
  );

export const useCreateCourseMutation = () =>
  useServiceMutation<CourseData, FormData>(
    (svc, formData) => svc.create(formData),
    {
      invalidateQueries: () => [queryKeys.courses.list()],
    },
  );

export const useUpdateCourseMutation = () =>
  useServiceMutation<void, { id: string; formData: FormData }>(
    (svc, vars) => svc.update(vars),
    {
      invalidateQueries: (data, vars) => [
        queryKeys.courses.list(),
        queryKeys.courses.byId(vars.id),
      ],
    },
  );

export const useDeleteCourseMutation = () =>
  useServiceMutation<void, { id: string }>((svc, vars) => svc.delete(vars.id), {
    invalidateQueries: () => [
      queryKeys.courses.list(),
      queryKeys.courses.total(),
    ],
  });

export const useTotalCoursesQuery = () =>
  useServiceQuery<number>(queryKeys.courses.total(), (svc) => svc.total());
