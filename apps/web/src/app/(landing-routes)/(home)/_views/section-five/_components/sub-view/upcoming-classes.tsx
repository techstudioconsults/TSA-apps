"use client";

import { useEffect } from "react";

import { UpcomingClassesSkeleton } from "../skeleton/upcoming.skeleton";
import {
  CalendarDays,
  Hourglass,
  MapPin,
  AlertCircle,
  Calendar,
} from "lucide-react";

import { CustomButton } from "@workspace/ui/lib";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "@workspace/ui/components";
import useCohortStore from "@/stores/cohort.store";
import {
  fetchCohortsByCourseId,
  fetchUpcomingCohorts,
} from "@/action/cohort.action";
import { formatDateTime } from "@/lib/utils";

export const UpcomingClasses = () => {
  const {
    loading: cohortsLoading,
    error: cohortError,
    upcomingCohorts,
    cohorts,
    pagination,
  } = useCohortStore();

  console.log(upcomingCohorts);

  useEffect(() => {
    fetchUpcomingCohorts(pagination.page, 1);
  }, [pagination.page]);

  const handlePrevious = () => {
    fetchUpcomingCohorts(pagination.page - 1, 1);
  };

  const handleNext = () => {
    fetchUpcomingCohorts(pagination.page + 1, 1);
  };

  const cohort = upcomingCohorts[0];

  // Get cohort details by course Id
  useEffect(() => {
    if (cohort?.id) {
      fetchCohortsByCourseId(cohort.id);
    }
  }, [cohort?.id]);

  const weekdayCohort = cohorts.find((cohort) => cohort.type === "weekday");

  if (cohortsLoading) return <UpcomingClassesSkeleton />;

  if (cohortError) {
    return (
      <Empty className="border-none py-8">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <AlertCircle className="text-destructive" />
          </EmptyMedia>
          <EmptyTitle>Unable to Load Classes</EmptyTitle>
          <EmptyDescription>
            {cohortError || "An error occurred while loading upcoming classes."}
          </EmptyDescription>
        </EmptyHeader>
        <CustomButton
          onClick={() => fetchUpcomingCohorts(pagination.page, 1)}
          variant="outline"
          size="sm"
        >
          Try Again
        </CustomButton>
      </Empty>
    );
  }

  if (!cohort) {
    return (
      <Empty className="border-none py-8">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Calendar className="text-muted-foreground" />
          </EmptyMedia>
          <EmptyTitle>No Upcoming Classes</EmptyTitle>
          <EmptyDescription>
            There are currently no upcoming classes scheduled. Check back soon
            for new opportunities!
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <section>
      <span className="text-sm font-bold uppercase text-mid-blue">
        Upcoming Classes
      </span>
      <h3 className="my-[19px]">{cohort.title}</h3>
      <p className="mb-[30px]">{cohort.about}</p>

      <div className="md:max-w-[355px]">
        <div className="flex items-center justify-between gap-[11px]">
          <span className="flex items-center gap-[11px]">
            <MapPin size={12} />
            <span>Location</span>
          </span>
          <span>{weekdayCohort?.type || "Online"}</span>
        </div>
        <div className="my-[11px] flex items-center justify-between gap-[11px]">
          <span className="flex items-center gap-[11px]">
            <CalendarDays size={12} />
            <span>Start Date</span>
          </span>
          {/* <span>{formatDateTime(cohort.startDate).date}</span> */}
          {weekdayCohort?.startDate
            ? formatDateTime(weekdayCohort.startDate).date
            : "No Date Yet"}
        </div>
        <div className="flex items-center justify-between gap-[11px]">
          <span className="flex items-center gap-[11px]">
            <Hourglass size={12} />
            <span>Duration</span>
          </span>
          <span>{weekdayCohort?.duration} Weeks</span>
        </div>
      </div>

      <div className="mt-[33px] flex flex-col justify-between gap-[20px] md:flex-row lg:items-center lg:gap-0">
        <CustomButton
          href={
            cohort.slug
              ? `/courses/online/${cohort.slug}`
              : `/courses/${cohort.title
                  .trim()
                  .replaceAll(/[\s/]+/g, "-")
                  .toLowerCase()}`
          }
          variant="primary"
          size="lg"
          className="w-full bg-mid-blue lg:max-w-[136px]"
        >
          Enroll Now
        </CustomButton>

        <span className="flex items-center justify-between gap-5 font-semibold text-primary">
          {pagination.hasPreviousPage && (
            <CustomButton size="lg" variant="link" onClick={handlePrevious}>
              {"<< Prev"}
            </CustomButton>
          )}
          {pagination.hasNextPage && (
            <CustomButton size="lg" variant="link" onClick={handleNext}>
              {"Next >>"}
            </CustomButton>
          )}
        </span>
      </div>
    </section>
  );
};
