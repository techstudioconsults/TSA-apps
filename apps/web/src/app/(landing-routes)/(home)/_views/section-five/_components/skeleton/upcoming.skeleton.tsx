"use client";

import { Skeleton } from "@workspace/ui/components";

export const UpcomingClassesSkeleton = () => {
  return (
    <section
      data-testid="skeleton"
      className="flex min-h-[447px] flex-col justify-between"
    >
      <span>
        <Skeleton className="h-[12px] w-[120px]" />
      </span>
      <h3 className="my-[19px]">
        <Skeleton className="mb-[1rem] h-[2rem] w-full" />
        <Skeleton className="h-[2rem] w-[50%]" />
        {/* Placeholder for class title */}
      </h3>
      <div className="mb-[30px]">
        <Skeleton className="mb-[10px] h-[16px] w-full" />{" "}
        {/* Placeholder for class description */}
        <Skeleton className="mb-[10px] h-[16px] w-full" />{" "}
        {/* Multiple lines for text */}
        <Skeleton className="h-[16px] w-3/4" />{" "}
        {/* Partial line for the last part of the text */}
      </div>
      <div className="max-w-[355px]">
        <div className="flex items-center justify-between gap-[11px]">
          <span className="flex items-center gap-[11px]">
            <Skeleton className="h-[12px] w-[12px]" />{" "}
            {/* Placeholder for MapPin icon */}
            <Skeleton className="h-[12px] w-[80px]" />{" "}
            {/* Placeholder for 'Location' text */}
          </span>
          <Skeleton className="h-[12px] w-[120px]" />{" "}
          {/* Placeholder for preference */}
        </div>
        <div className="my-[11px] flex items-center justify-between gap-[11px]">
          <span className="flex items-center gap-[11px]">
            <Skeleton className="h-[12px] w-[12px]" />{" "}
            {/* Placeholder for CalendarDays icon */}
            <Skeleton className="h-[12px] w-[80px]" />{" "}
            {/* Placeholder for 'Start Date' text */}
          </span>
          <Skeleton className="h-[12px] w-[120px]" />{" "}
          {/* Placeholder for start date */}
        </div>
        <div className="flex items-center justify-between gap-[11px]">
          <span className="flex items-center gap-[11px]">
            <Skeleton className="h-[12px] w-[12px]" />{" "}
            {/* Placeholder for Hourglass icon */}
            <Skeleton className="h-[12px] w-[80px]" />{" "}
            {/* Placeholder for 'Duration' text */}
          </span>
          <Skeleton className="h-[12px] w-[120px]" />{" "}
          {/* Placeholder for duration */}
        </div>
      </div>
      <div className="mt-[33px] flex flex-col items-center justify-between gap-[20px] lg:flex-row lg:gap-0">
        <Skeleton className="h-[40px] w-full lg:w-[152px]" />{" "}
        {/* Placeholder for 'Enroll Now' button */}
        <span className="flex items-center gap-5">
          <Skeleton className="h-[16px] w-[80px]" />{" "}
          {/* Placeholder for 'Prev' button */}
          <Skeleton className="h-[16px] w-[80px]" />{" "}
          {/* Placeholder for 'Next' button */}
        </span>
      </div>
    </section>
  );
};
