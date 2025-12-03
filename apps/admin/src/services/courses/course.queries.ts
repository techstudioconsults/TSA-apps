/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServiceHooks } from "@/lib/react-query/use-service-query";
import { courseService } from "./course.service";
import { queryKeys } from "@/lib/react-query/query-keys";
import { courseFormData } from "@/schemas";

const { useServiceQuery, useServiceMutation } =
  createServiceHooks(courseService);

export function useCoursesQuery(filters: Filters, options?: any) {
  return useServiceQuery(
    queryKeys.courses.list(filters),
    (service) => service.getCourses(filters),
    options,
  );
}

export function useCourseByIdQuery(id: string, options?: any) {
  return useServiceQuery(
    queryKeys.courses.detail(id),
    (service) => service.getCourseById(id),
    {
      enabled: !!id,
      ...options,
    },
  );
}

export function useTotalCoursesQuery(options?: any) {
  return useServiceQuery(
    queryKeys.courses.total(),
    (service) => service.getTotalCourses(),
    options,
  );
}

export function useCreateCourseMutation() {
  return useServiceMutation(
    (service, payload: courseFormData) => service.createCourse(payload),
    {
      invalidateQueries: () => [
        queryKeys.courses.lists(),
        queryKeys.courses.total(),
      ],
    },
  );
}

export function useUpdateCourseMutation() {
  return useServiceMutation(
    (service, { id, payload }: { id: string; payload: courseFormData }) =>
      service.updateCourse(id, payload),
    {
      invalidateQueries: (_, { id }) => [
        queryKeys.courses.detail(id),
        queryKeys.courses.lists(),
        queryKeys.courses.total(),
      ],
    },
  );
}

export function useDeleteCourseMutation() {
  return useServiceMutation((service, id: string) => service.deleteCourse(id), {
    invalidateQueries: () => [
      queryKeys.courses.lists(),
      queryKeys.courses.total(),
    ],
  });
}
