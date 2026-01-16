"use client";

import { Calendar, Clock10 } from "lucide-react";
import { useEffect } from "react";

import { CourseSkeletonLoader } from "../../_components/course-detail.skeleton";
import { CustomButton, Wrapper } from "@workspace/ui/lib";
import { BlurImage } from "@workspace/ui/components";
import useCoursesStore from "@/stores/course.store";
import { fetchCohortsByCourseId } from "@/action/cohort.action";
import { formatDateTime, formatPrice } from "@/lib/utils";
import useCohortStore from "@/stores/cohort.store";

export const CourseDetails = () => {
  const { loading, error, activeCourse } = useCoursesStore();
  const {
    cohorts,
    // loading: cohortsLoading,
    // error: cohortsError,
  } = useCohortStore();

  // console.log("Active Course:", activeCourse);
  // console.log("Cohorts:", cohorts);

  // Fetch cohorts when course is found
  useEffect(() => {
    if (activeCourse?.id) {
      fetchCohortsByCourseId(activeCourse.id);
    }
  }, [activeCourse?.id]);

  // Find weekday and weekend cohorts
  const weekdayCohort = cohorts.find((cohort) => cohort.type === "weekday");
  const weekendCohort = cohorts.find((cohort) => cohort.type === "weekend");
  const onlineCohort = cohorts.find((cohort) => cohort.type === "online");

  if (!activeCourse)
    return (
      <Wrapper className="min-h-[511px]">
        <p className="h-fit text-center">No course selected.</p>
      </Wrapper>
    );

  return (
    <section className="min-h-[511px] bg-accent py-[10px]">
      <Wrapper>
        {loading && <CourseSkeletonLoader />}
        {error && (
          <p className="w-full text-center text-mid-danger">
            Error loading classes: {error}
          </p>
        )}
        {!activeCourse && (
          <p className="w-full text-mid-danger lg:text-center">
            No course selected.
          </p>
        )}
        <section className="grid min-h-[393px] rounded-[10px] bg-background px-[20px] py-[30px] shadow-md lg:grid-cols-3 xl:px-[63px] xl:py-[48px]">
          <div className="col-span-1 hidden lg:flex items-center justify-center">
            <BlurImage
              height={276}
              width={333}
              src={activeCourse.imageUrl || "/gifs/certificate.gif"} // Use course image if available
              alt="course-img"
              className="m-auto"
            />
          </div>
          <section className="col-span-2">
            <h3 className="text-[18px] font-[600] xl:text-[24px]">
              {activeCourse.title}
            </h3>
            <p className="my-[28px] text-[12px] leading-[24px] xl:text-[16px]">
              {activeCourse.about}
            </p>
            <section className="grid grid-cols-1 gap-[20px] font-[600] lg:max-w-[300px] xl:max-w-[500px]">
              <article>
                <p className="mb-1 text-[10px] text-mid-danger">Online</p>
                <div className="flex flex-col justify-between lg:flex-row xl:items-center">
                  <span className="flex items-center space-x-[5px] xl:space-x-[10px]">
                    <Calendar className="inline w-[10px] text-mid-blue xl:w-[20px]" />
                    <span className="text-[10px] xl:text-[14px]">
                      {onlineCohort?.duration} Weeks
                    </span>
                  </span>
                  <span className="flex items-center space-x-[5px] xl:space-x-[10px]">
                    <Clock10 className="inline w-[10px] text-mid-blue xl:w-[20px]" />
                    <span className="text-[10px] xl:text-[14px]">
                      {onlineCohort?.startDate
                        ? formatDateTime(onlineCohort?.startDate).date
                        : "No Date Yet"}
                    </span>
                  </span>
                  <span className="text-[12px] xl:text-[16px]">
                    {onlineCohort?.fee === undefined
                      ? "N/A"
                      : formatPrice(onlineCohort.fee)}
                  </span>
                </div>
              </article>
              <article>
                <p className="mb-1 text-[10px] text-mid-danger">Weekday</p>
                <div className="flex flex-col justify-between lg:flex-row xl:items-center">
                  <span className="flex items-center space-x-[5px] xl:space-x-[10px]">
                    <Calendar className="inline w-[10px] text-mid-blue xl:w-[20px]" />
                    <span className="text-[10px] xl:text-[14px]">
                      {weekdayCohort?.duration} Weeks
                    </span>
                  </span>
                  <span className="flex items-center space-x-[5px] xl:space-x-[10px]">
                    <Clock10 className="inline w-[10px] text-mid-blue xl:w-[20px]" />
                    <span className="text-[10px] xl:text-[14px]">
                      {weekdayCohort?.startDate
                        ? formatDateTime(weekdayCohort.startDate).date
                        : "No Date Yet"}
                    </span>
                  </span>
                  <span className="text-[12px] xl:text-[16px]">
                    {weekdayCohort?.fee === undefined
                      ? "N/A"
                      : formatPrice(weekdayCohort.fee)}
                  </span>
                </div>
              </article>
              <article>
                <p className="mb-1 text-[10px] text-mid-danger">Weekend</p>
                <div className="flex flex-col justify-between lg:flex-row xl:items-center">
                  <span className="flex items-center space-x-[5px] xl:space-x-[10px]">
                    <Calendar className="inline w-[10px] text-mid-blue xl:w-[20px]" />
                    <span className="text-[10px] xl:text-[14px]">
                      {weekendCohort?.duration} Weeks
                    </span>
                  </span>
                  <span className="flex items-center space-x-[5px] xl:space-x-[10px]">
                    <Clock10 className="inline w-[10px] text-mid-blue xl:w-[20px]" />
                    <span className="text-[10px] xl:text-[14px]">
                      {weekendCohort?.startDate
                        ? formatDateTime(weekendCohort.startDate).date
                        : "No Date Yet"}
                    </span>
                  </span>
                  <span className="text-[12px] xl:text-[16px]">
                    {weekendCohort?.fee === undefined
                      ? "N/A"
                      : formatPrice(weekendCohort.fee)}
                  </span>
                </div>
              </article>
            </section>
            <section className="mt-[32px] text-end">
              <CustomButton
                href={
                  activeCourse.slug
                    ? `/courses/online/${activeCourse.slug}`
                    : `/courses/${activeCourse.title
                        .trim()
                        .replaceAll(/[\s/]+/g, "-")
                        .toLowerCase()}`
                }
                size={`lg`}
                variant={`primary`}
                className="w-full bg-mid-blue lg:w-fit"
              >
                View Full Details
              </CustomButton>
            </section>
          </section>
        </section>
      </Wrapper>
    </section>
  );
};
