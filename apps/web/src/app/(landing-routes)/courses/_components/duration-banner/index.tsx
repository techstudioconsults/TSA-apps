// "use client";

// import { TsaButton } from "@strategic-dot/components";
// import { Calendar, Loader } from "lucide-react";
// import { usePathname } from "next/navigation";
// import { FC, useEffect } from "react";

// import { fetchAllCourses } from "~/action/courses.action";
// import { formatDateTime } from "~/lib/utils";
// import useCoursesStore from "~/stores/course.store";

// interface DurationBannerProperties {
//   slug: string;
// }

// export const DurationBanner: FC<DurationBannerProperties> = ({ slug }) => {
//   const { loading, error, allCourses } = useCoursesStore();
//   const pathname = usePathname();

//   const isFrontendPath = pathname === "/courses/frontend-engineering";

//   useEffect(() => {
//     fetchAllCourses();
//   }, []);

//   // Find the course using the slug
//   const course = allCourses.find(
//     (course) =>
//       course.title
//         .trim()
//         .replaceAll(/[\s/]+/g, "-")
//         .toLowerCase() === slug,
//   );

//   if (loading) {
//     return (
//       <section className="mx-auto flex min-h-[172px] max-w-[1080px] items-center justify-center rounded-[10px] bg-white p-[40px] shadow-lg lg:translate-y-[-5rem]">
//         <p className="text-center font-[600]">
//           <Loader className="mr-2 inline animate-spin text-mid-blue" />
//           Loading {slug} duration...
//         </p>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section className="mx-auto flex min-h-[172px] max-w-[1080px] items-center justify-center rounded-[10px] bg-white p-[40px] shadow-lg lg:translate-y-[-5rem]">
//         <p className="text-center text-destructive">
//           Failed to load course information. Please try again later.
//         </p>
//       </section>
//     );
//   }

//   return (
//     <section className="mx-auto min-h-[172px] max-w-[1080px] rounded-[10px] bg-white p-[40px] shadow-lg lg:translate-y-[-5rem]">
//       <p className="flex items-center justify-center gap-1 font-bold md:justify-start">
//         <Calendar className="w-[16px]" />
//         Next Cohort:
//       </p>
//       <section className="flex flex-col items-center justify-between gap-5 text-center md:flex-row lg:text-left">
//         <div>
//           <h2 className="m-0 text-mid-blue">
//             {formatDateTime(course?.classes?.weekday[0]?.startDate).date}
//           </h2>
//           <p className="m-0 text-sm font-bold text-gray-700">
//             Weekday Class:{" "}
//             {formatDateTime(course?.classes?.weekday[0]?.startDate).date}
//           </p>
//         </div>
//         {!isFrontendPath && (
//           <div className={`${`removeWeekend`}`}>
//             <h2 className="m-0 text-mid-blue">
//               {formatDateTime(course?.classes?.weekend[0]?.startDate).date}
//             </h2>
//             <p className="m-0 text-sm font-bold text-gray-700">
//               Weekend Class, Online Class:
//               {formatDateTime(course?.classes?.weekend[0]?.startDate).date}
//             </p>
//           </div>
//         )}

//         <div>
//           <TsaButton
//             variant="outline"
//             className="border-mid-blue text-mid-blue"
//             size="lg"
//             href="/register"
//           >
//             Register Now
//           </TsaButton>
//         </div>
//       </section>
//     </section>
//   );
// };

"use client";

import { fetchCohortsByCourseId } from "@/action/cohort.action";
import { fetchAllCourses } from "@/action/courses.action";
import { formatDateTime } from "@/lib/utils";
import useCohortStore from "@/stores/cohort.store";
import useCoursesStore from "@/stores/course.store";
import { CustomButton } from "@workspace/ui/lib";
import { Calendar, Loader } from "lucide-react";
import { FC, useEffect } from "react";

interface DurationBannerProperties {
  slug: string;
}

export const DurationBanner: FC<DurationBannerProperties> = ({ slug }) => {
  const {
    loading: coursesLoading,
    error: coursesError,
    allCourses,
  } = useCoursesStore();
  const {
    cohorts,
    loading: cohortsLoading,
    error: cohortsError,
  } = useCohortStore();

  useEffect(() => {
    fetchAllCourses();
  }, []);

  // Find the course using the slug
  const course = allCourses.find(
    (course) =>
      course.title
        .trim()
        .replaceAll(/[\s/]+/g, "-")
        .toLowerCase() === slug,
  );

  // Fetch cohorts when course is found
  useEffect(() => {
    if (course?.id) {
      fetchCohortsByCourseId(course.id);
    }
  }, [course?.id]);

  // Find weekday and weekend cohorts
  const weekdayCohort = cohorts.find((cohort) => cohort.type === "weekday");
  const weekendCohort = cohorts.find(
    (cohort) => cohort.type === "weekend" || cohort.type === "online",
  );

  // console.log(weekdayCohort?.startDate);

  // console.log(weekendCohort?.startDate);

  // console.log(cohorts);

  const loading = coursesLoading || cohortsLoading;
  const error = coursesError || cohortsError;

  if (loading) {
    return (
      <section className="mx-auto flex min-h-[172px] max-w-[1080px] items-center justify-center rounded-[10px] bg-white p-[40px] shadow-lg lg:translate-y-[-5rem]">
        <p className="text-center font-[600]">
          <Loader className="mr-2 inline animate-spin text-mid-blue" />
          Loading {slug} duration...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto flex min-h-[172px] max-w-[1080px] items-center justify-center rounded-[10px] bg-white p-[40px] shadow-lg lg:translate-y-[-5rem]">
        <p className="text-center text-destructive">
          Failed to load course information. Please try again later.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto min-h-[172px] max-w-[1080px] rounded-[10px] bg-white p-[40px] shadow-lg lg:translate-y-[-5rem]">
      <p className="flex items-center justify-center gap-1 font-bold md:justify-start">
        <Calendar className="w-[16px]" />
        Next Cohort:
      </p>
      <section className="flex flex-col items-center justify-between gap-5 text-center md:flex-row lg:text-left">
        <div>
          <h3 className="m-0 text-mid-blue font-black">
            {weekdayCohort?.startDate
              ? formatDateTime(weekdayCohort.startDate).date
              : "No Date Yet"}
          </h3>
          <p className="m-0 text-sm font-bold text-gray-700">
            Weekday Class:{" "}
            {weekdayCohort?.startDate
              ? formatDateTime(weekdayCohort.startDate).date
              : "No Date Yet"}
          </p>
        </div>

        <div className={`${`removeWeekend`}`}>
          <h3 className="m-0 text-mid-blue font-black">
            {weekendCohort?.startDate
              ? formatDateTime(weekendCohort.startDate).date
              : "No Date Yet"}
          </h3>
          <p className="m-0 text-sm font-bold text-gray-700">
            Weekend Class, Online Class:{" "}
            {weekendCohort?.startDate
              ? formatDateTime(weekendCohort.startDate).date
              : "No Date Yet"}
          </p>
        </div>

        <div>
          <CustomButton
            variant="outline"
            className="border-mid-blue text-mid-blue"
            size="lg"
            href="/register"
          >
            Register Now
          </CustomButton>
        </div>
      </section>
    </section>
  );
};
