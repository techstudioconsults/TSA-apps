import { Skeleton } from "@workspace/ui/components";

export const CourseSkeletonLoader = () => {
  return (
    <section className="grid min-h-[393px] gap-[2rem] rounded-[10px] bg-background px-[20px] py-[30px] shadow-md lg:grid-cols-3 xl:px-[63px] xl:py-[48px]">
      <div className="col-span-1 hidden lg:block">
        <Skeleton className="h-full w-full" />{" "}
      </div>
      <section className="col-span-2">
        <Skeleton className="mb-[2rem] h-[24px] w-[60%]" />
        <div className="mb-[2rem] space-y-[5px]">
          <Skeleton className="h-[16px] w-full" />
          <Skeleton className="h-[16px] w-[50%]" />
          <Skeleton className="h-[16px] w-[25%]" />
        </div>
        <section className="grid grid-cols-1 gap-[20px] font-[600] lg:max-w-[300px] xl:max-w-[500px]">
          {Array.from({ length: 3 }).map((_, index) => (
            <article key={index}>
              <div className="flex flex-col justify-between space-y-[5px] lg:flex-row xl:items-center">
                <Skeleton className="h-[16px] w-[20%]" />
                <Skeleton className="h-[16px] w-[20%]" />
                <Skeleton className="h-[16px] w-[20%]" />
              </div>
            </article>
          ))}
        </section>
        <section className="mt-[32px]">
          <Skeleton className="ml-auto h-[40px] w-full lg:w-[135px]" />
        </section>
      </section>
    </section>
  );
};
