import Image from "next/image";
import { FC } from "react";

import { Course } from "../types/index.types";
import { ToolTag } from "./tool-tag";
import { cn, Wrapper } from "@workspace/ui/lib";

interface StepperCardProperty {
  course: Course;
}

export const StepperCard: FC<StepperCardProperty> = ({ course }) => {
  const ifBgColorPrimary = course.bgColor === `bg-primary` ? `text-white` : ``;

  return (
    <section className={`${course.bgColor}`}>
      <Wrapper className="flex flex-col-reverse items-center justify-between lg:flex-row py-10 lg:py-0 lg:!my-0">
        <div className="flex-1">
          <div className="relative">
            <div
              className={cn(
                `absolute left-[-4rem] top-4 hidden h-[45px] w-[45px] animate-pulse rounded-full border-[12px] xl:block`,
                course.id % 2 == 0
                  ? `border-low-warning bg-mid-warning`
                  : `border-low-blue bg-mid-blue`,
              )}
            ></div>
            <h6
              className={`text-[12px] font-[700] uppercase ${ifBgColorPrimary}`}
            >
              {course.caption}
            </h6>
            <h3
              className={`text-[20px] font-[700] lg:text-[33px] ${ifBgColorPrimary}`}
            >
              {course.title}
            </h3>
          </div>
          <p
            className={`mb-[50px] mt-[16px] text-sm leading-[28px] ${ifBgColorPrimary}`}
          >
            {course.desc}
          </p>
          <div className="flex flex-wrap items-center gap-[8px] lg:gap-[17px]">
            {course.tags.map((tag, index) => {
              return <ToolTag key={index} tag={tag} bgColor={course.bgColor} />;
            })}
          </div>
        </div>
        <div className="hidden flex-1 lg:block">
          <Image
            priority
            width={450}
            height={400}
            src={course.img}
            alt="gifs"
            className="w-full h-full"
          />
        </div>
      </Wrapper>
    </section>
  );
};
