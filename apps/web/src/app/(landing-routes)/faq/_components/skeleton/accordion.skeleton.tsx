import { Skeleton } from "@workspace/ui/components";

export const AccordionSkeleton = () => {
  return (
    <section className="min-h-[580px]">
      <div className="space-y-4">
        <div className="space-y-6">
          <Skeleton className="h-10 w-full" />
        </div>
        <hr />
        <div className="space-y-6">
          <Skeleton className="h-10 w-full" />
        </div>
        <hr />
        <div className="space-y-6">
          <Skeleton className="h-10 w-full" />
        </div>
        <hr />
        <div className="space-y-6">
          <Skeleton className="h-10 w-full" />
        </div>
        <hr />
        <div className="space-y-6">
          <Skeleton className="h-10 w-full" />
        </div>
        <hr />
        <div className="space-y-6">
          <Skeleton className="h-10 w-full" />
        </div>
        <hr />
        <div className="space-y-6">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </section>
  );
};
