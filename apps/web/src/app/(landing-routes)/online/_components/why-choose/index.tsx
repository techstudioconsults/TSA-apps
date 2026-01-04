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
  const isFullStack = course.slug === "full-stack-development"
  const title = isUIUX ? "Why Choose Our Online UI/UX Program?" : course.whyChoose.title;
  const gridCols = isDataAnalytics ? "lg:grid-cols-4" : "lg:grid-cols-3";
  
  return (
    <section className={`py-6 lg:py-9 ${isUIUX || isFullStack ? "bg-[#EDF5FF]" : "bg-white"}`}>
      <Wrapper className="max-w-7xl">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1F2666] mb-4">
            {title}
          </h2>
          
            <p className="text-lg md:text-xl lg:text-2xl text-[#595959] max-w-3xl mx-auto">
              {course.whyChoose.description}
            </p>
          
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-2 ${gridCols} ${isCybersecurity ? "gap-7" : "gap-5"}`}>
          {course.whyChoose.features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col p-6 rounded-lg border border-gray-100  transition-shadow ${isDataAnalytics || isCybersecurity || isFullStack ? "items-start text-left bg-white" : "items-center text-center"}`}
            >
              <div className={` mb-7 ${isDataAnalytics || isCybersecurity ? "flex items-center justify-center bg-[#E2F0FF] w-10 h-10 rounded " : ""}`}>
                <Image src={feature.icon} alt={feature.title} width={21} height={21}  className={`${isDataAnalytics || isCybersecurity ? "w-7 h-7" : "w-16 h-20"}`}/>
              </div>
              <h3 className={`font-bold text-black mb-2 ${isDataAnalytics || isCybersecurity ? "text-lg" : "text-2xl"}`}>
                {feature.title}
              </h3>
              <p className={`text-[#595959] text-base`}>{feature.description}</p>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  );
};

