"use client";

import { fetchAllCourses } from "@/action/courses.action";
import useCoursesStore from "@/stores/course.store";
import { cn, CustomButton, Wrapper } from "@workspace/ui/lib";
import { Loader } from "lucide-react";
import { useEffect } from "react";

export const Hero = () => {
  const { loading, error, allCourses, setActiveCourse, activeCourse } =
    useCoursesStore();

  useEffect(() => {
    fetchAllCourses();
  }, []);

  useEffect(() => {
    if (allCourses.length > 0) {
      const randomCourse = allCourses[0];
      if (randomCourse) {
        setActiveCourse(randomCourse);
      }
    }
  }, [allCourses, setActiveCourse]);

  return (
    <header className="min-h-[364px] w-full pt-[50px]">
      <Wrapper className="">
        <div className="space-y-[22px]">
          <h3 className="text-[24px]">Our Courses</h3>
          <p>Select any of our courses to get started on your tech journey</p>
        </div>
        <div
          className={cn(
            `min-h-[36px] gap-[10px] flex flex-wrap lg:gap-[31px]`,
            loading ? `grid-cols-1` : `grid-cols-2`,
          )}
        >
          {loading && (
            <div className="flex w-full justify-center gap-1">
              <Loader className="animate-spin text-primary" />
              <span className="h-fit text-center text-[12px] lg:text-[16px]">
                Getting All Courses... please wait.
              </span>
            </div>
          )}
          {error && (
            <p className="w-full text-mid-danger lg:text-center">
              Error loading classes: {error}
            </p>
          )}
          {allCourses.map((course) => (
            <CustomButton
              key={course.id}
              onClick={() => setActiveCourse(course)}
              className={`w-fit rounded-[5px] px-[20px] py-[15px] text-center text-[10px] font-[600] xl:text-[14px] ${
                activeCourse?.id === course.id
                  ? "bg-mid-blue text-white" // Active styles
                  : "bg-[#EBEBEB] text-black" // Default styles
              }`}
            >
              {course.title}
            </CustomButton>
          ))}
        </div>
      </Wrapper>
    </header>
  );
};
