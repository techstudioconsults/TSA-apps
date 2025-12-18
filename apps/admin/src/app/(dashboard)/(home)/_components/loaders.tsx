import { Skeleton } from "@workspace/ui/components";

export const DashboardCardSkeleton = () => {
  return (
    <Skeleton className="min-h-[203px] rounded-xl p-10">
      {/* Title skeleton */}
      <Skeleton className="mb-2 h-5 w-32" />

      {/* Body with value and icon */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="size-12 rounded-md" />
      </div>

      {/* Footer skeleton */}
      <div className="mt-4 flex items-center justify-between gap-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-24" />
      </div>
    </Skeleton>
  );
};

export const DashboardCardsLoader = () => {
  return (
    <div className="grid grid-cols-3 justify-between gap-5 py-8">
      <DashboardCardSkeleton />
      <DashboardCardSkeleton />
      <DashboardCardSkeleton />
    </div>
  );
};
