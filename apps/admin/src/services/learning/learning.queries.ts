"use client";

import { createServiceHooks } from "@/lib/react-query/use-service-query";
import { queryKeys } from "@/lib/react-query/query-keys";
import { learningService } from "./learning.service";
import type {
  AdminLecture,
  EnrolmentStatus,
  LectureType,
} from "./learning.types";

const { useServiceQuery, useServiceMutation } =
  createServiceHooks(learningService);

const curriculumAndSummary = (courseId: string) => [
  queryKeys.learning.curriculum(courseId),
  queryKeys.learning.summary(),
];

export function useCoursesSummaryQuery() {
  return useServiceQuery(queryKeys.learning.summary(), (service) =>
    service.getCoursesSummary(),
  );
}

export function useCurriculumQuery(
  courseId: string,
  options?: { refetchInterval?: number | false },
) {
  return useServiceQuery(
    queryKeys.learning.curriculum(courseId),
    (service) => service.getCurriculum(courseId),
    {
      enabled: Boolean(courseId),
      ...options,
    },
  );
}

export function useLectureQuery(
  lectureId: string,
  options?: { refetchInterval?: number | false },
) {
  return useServiceQuery(
    queryKeys.learning.lecture(lectureId),
    (service) => service.getLecture(lectureId),
    {
      enabled: Boolean(lectureId),
      ...options,
    },
  );
}

export function useCreateSectionMutation(courseId: string) {
  return useServiceMutation(
    (service, title: string) => service.createSection(courseId, title),
    {
      invalidateQueries: () => curriculumAndSummary(courseId),
    },
  );
}

export function useRenameSectionMutation(courseId: string) {
  return useServiceMutation(
    (service, { sectionId, title }: { sectionId: string; title: string }) =>
      service.renameSection(sectionId, title),
    { invalidateQueries: () => [queryKeys.learning.curriculum(courseId)] },
  );
}

export function useDeleteSectionMutation(courseId: string) {
  return useServiceMutation(
    (service, sectionId: string) => service.deleteSection(sectionId),
    {
      invalidateQueries: () => curriculumAndSummary(courseId),
    },
  );
}

export function useReorderSectionsMutation(courseId: string) {
  return useServiceMutation(
    (service, ids: string[]) => service.reorderSections(courseId, ids),
    {
      invalidateQueries: () => [queryKeys.learning.curriculum(courseId)],
    },
  );
}

export function useReorderLecturesMutation(courseId: string) {
  return useServiceMutation(
    (service, { sectionId, ids }: { sectionId: string; ids: string[] }) =>
      service.reorderLectures(sectionId, ids),
    { invalidateQueries: () => [queryKeys.learning.curriculum(courseId)] },
  );
}

export function useCreateLectureMutation(courseId: string) {
  return useServiceMutation(
    (
      service,
      {
        sectionId,
        title,
        type,
      }: { sectionId: string; title: string; type: LectureType },
    ) => service.createLecture(sectionId, { title, type }),
    { invalidateQueries: () => curriculumAndSummary(courseId) },
  );
}

export function useUpdateLectureMutation(lectureId: string, courseId?: string) {
  return useServiceMutation(
    (service, payload: Parameters<typeof service.updateLecture>[1]) =>
      service.updateLecture(lectureId, payload),
    {
      invalidateQueries: () => [
        queryKeys.learning.lecture(lectureId),
        queryKeys.learning.summary(),
        ...(courseId ? [queryKeys.learning.curriculum(courseId)] : []),
      ],
    },
  );
}

export function useDeleteLectureMutation(courseId: string) {
  return useServiceMutation(
    (service, lectureId: string) => service.deleteLecture(lectureId),
    {
      invalidateQueries: () => curriculumAndSummary(courseId),
    },
  );
}

export function useSyncVideoMutation(lectureId: string, courseId?: string) {
  return useServiceMutation<AdminLecture, void>(
    (service) => service.syncVideo(lectureId),
    {
      invalidateQueries: () => [
        queryKeys.learning.lecture(lectureId),
        ...(courseId ? [queryKeys.learning.curriculum(courseId)] : []),
      ],
    },
  );
}

// Enrolments ----------------------------------------------------------------

export function useCourseOptionsQuery() {
  return useServiceQuery(
    queryKeys.learning.courseOptions(),
    (service) => service.getCourseOptions(),
    {
      staleTime: 5 * 60 * 1000,
    },
  );
}

export function useCohortOptionsQuery(courseId: string) {
  return useServiceQuery(
    queryKeys.learning.cohortOptions(courseId),
    (service) => service.getCohortOptions(courseId),
    {
      enabled: Boolean(courseId),
    },
  );
}

export function useCourseEnrolmentsQuery(courseId: string, page: number) {
  return useServiceQuery(
    queryKeys.learning.enrolments(courseId, page),
    (service) => service.getCourseEnrolments(courseId, page),
    { enabled: Boolean(courseId) },
  );
}

const enrolmentViews = (courseId: string) => [
  ["learning", "enrolments", courseId] as const,
  queryKeys.learning.summary(),
];

export function useEnrolStudentMutation(courseId: string) {
  return useServiceMutation(
    (
      service,
      { email, expiresAt }: { email: string; expiresAt: string | null },
    ) => service.enrolStudent({ courseId, email, expiresAt }),
    { invalidateQueries: () => enrolmentViews(courseId) },
  );
}

export function useEnrolCohortMutation(courseId: string) {
  return useServiceMutation(
    (
      service,
      { cohortId, expiresAt }: { cohortId: string; expiresAt: string | null },
    ) => service.enrolCohort(cohortId, expiresAt),
    { invalidateQueries: () => enrolmentViews(courseId) },
  );
}

export function useUpdateEnrolmentMutation(courseId: string) {
  return useServiceMutation(
    (
      service,
      {
        enrolmentId,
        ...payload
      }: {
        enrolmentId: string;
        status?: EnrolmentStatus;
        expiresAt?: string | null;
      },
    ) => service.updateEnrolment(enrolmentId, payload),
    { invalidateQueries: () => enrolmentViews(courseId) },
  );
}

export function useSendPasswordLinkMutation() {
  return useServiceMutation((service, userId: string) =>
    service.sendPasswordLink(userId),
  );
}
