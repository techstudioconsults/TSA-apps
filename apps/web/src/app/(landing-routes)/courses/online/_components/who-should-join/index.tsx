"use client";

import { FC } from "react";
import { Wrapper } from "@workspace/ui/lib";
import type { OnlineCourse } from "../../data";
import Image from "next/image";

interface WhoShouldJoinSectionProps {
  course: OnlineCourse;
}

export const WhoShouldJoinSection: FC<WhoShouldJoinSectionProps> = ({
  course,
}) => {
  // const isUIUX = course.slug === "ui-ux-design";
  // const isCybersecurity = course.slug === "cybersecurity";
  return (
    <section className={`py-5 lg:py-10 bg-white`}>
      <Wrapper className="max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-[24px] lg:text-[36px] font-bold text-[#1F2666] mb-4">
            {course.whoShouldJoin.title}
          </h2>
          <p className="text-base md:text-lg leading-[25px] text-[#595959] max-w-2xl mx-auto">
            {course.whoShouldJoin.description}
          </p>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7`}>
          {course.whoShouldJoin.audiences.map((audience, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-4 p-6 bg-white text-center rounded-lg border border-[#D8D8D857] "
            >
              <div className="bg-[#E2F0FF] rounded p-2">
                <Image
                  src={audience.icon}
                  alt={audience.title}
                  width={44}
                  height={44}
                  className="object-cover"
                />
              </div>

              <div className="">
                <h3 className="text-xl font-bold text-black mb-2">
                  {audience.title}
                </h3>
                <p className="text-base text-[#595959]">
                  {audience.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  );
};
