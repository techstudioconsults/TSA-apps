"use client";

import { FC } from "react";
import Image from "next/image";
import { Wrapper } from "@workspace/ui/lib";
import type { OnlineCourse } from "../../data";

interface WhyChooseSectionProps {
  course: OnlineCourse;
}

export const WhyChooseSection: FC<WhyChooseSectionProps> = ({ course }) => {
  const isUIUX = course.slug === "ui-ux-design";
  const isDataAnalytics = course.slug === "data-analytics";
  const isCybersecurity = course.slug === "cybersecurity";
  const isFullStack = course.slug === "full-stack-development";
  const title = isUIUX
    ? "Why Choose Our Online UI/UX Program?"
    : course.whyChoose.title;
  // const gridCols = isDataAnalytics ? "lg:grid-cols-4" : "lg:grid-cols-3";

  return (
    <section className={`py-6 lg:py-9 bg-[#EDF5FF]`}>
      <Wrapper className="max-w-7xl">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-[24px] lg:text-[36px] font-bold text-[#1F2666] mb-4">
            {title}
          </h2>

          <p className="text-base md:text-lg leading-[25px] text-[#595959] max-w-3xl mx-auto">
            {course.whyChoose.description}
          </p>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7`}>
          {course.whyChoose.features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col p-6 rounded-lg border border-gray-100  transition-shadow items-start text-left bg-white`}
            >
              <Image
                src={feature.icon}
                alt={feature.title}
                width={21}
                height={21}
                className={` w-16 h-20 mb-7`}
              />

              <h3 className={`font-bold text-black mb-2 text-lg md:text-xl`}>
                {feature.title}
              </h3>
              <p className={`text-[#595959] text-base`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  );
};
