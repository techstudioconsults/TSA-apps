"use client";

import { useDashboardStatsQuery } from "@/lib/services/dashboard/dashboard.queries";
import Image from "next/image";
import { Loader } from "lucide-react";

const Cards = () => {
  const { data, isLoading, error } = useDashboardStatsQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader size={24} className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-red-500">Error loading stats: {error.message}</div>
      </div>
    );
  }

  const totalCohorts = data?.totalCohorts ?? 0;
  const totalCourse = data?.totalCourses ?? 0;
  const totalSheet = data?.totalSheets ?? 0;

  return (
    <div>
      <section className="grid grid-cols-3 justify-between gap-5 py-8">
        <div className="flex items-center justify-between gap-3 rounded-lg bg-white p-5 shadow">
          <div className="flex flex-col gap-3">
            <h6>Total Course</h6>
            <h3>{totalCourse}</h3>
            <p className="pt-3"> Null% since last month </p>
          </div>

          <Image
            width={100}
            height={100}
            className="object-cover"
            src="images/total-courese.svg"
            alt="course"
            priority
          />
        </div>

        <div className="flex items-center justify-between gap-3 rounded-lg bg-white p-5 shadow">
          <div className="flex flex-col gap-3">
            <h6>Total Class</h6>
            <h3>{totalCohorts}</h3>
            <p className="pt-3"> Null% since last month </p>
          </div>
          <Image
            width={100}
            height={100}
            className="object-cover"
            src="images/total-class.svg"
            alt="class"
            priority
          />
        </div>
        <div className="flex items-center justify-between gap-3 rounded-lg bg-white p-5 shadow">
          <div className="flex flex-col gap-3">
            <h6>Total Sheet</h6>
            <h3>{totalSheet}</h3>
            <p className="pt-3"> Null% since last month </p>
          </div>
          <Image
            width={100}
            height={100}
            className="object-cover"
            src="images/total-sheet.svg"
            alt="sheet"
            priority
          />
        </div>
      </section>
    </div>
  );
};

export default Cards;
