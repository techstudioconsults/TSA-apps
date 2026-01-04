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
    const isUIUX = course.slug === "ui-ux-design";
    const isCybersecurity = course.slug === "cybersecurity";
  return (
    <section className={`py-16 lg:py-24 ${isUIUX ? "bg-[#EDF5FF]" : "bg-white"}`}>
      <Wrapper className="max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1F2666] mb-4">
            {course.whoShouldJoin.title}
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-[#595959] max-w-2xl mx-auto">
            {course.whoShouldJoin.description}
          </p>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-2 ${isCybersecurity ? "lg:grid-cols-2" :"lg:grid-cols-3"}  gap-7`}>
          {course.whoShouldJoin.audiences.map((audience, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 bg-white rounded-lg border border-[#D8D8D857] "
            >
          
              <Image src={audience.icon} alt={audience.title} width={44} height={44} className="object-cover"/>
  
              <div className="">
              <h3 className="text-xl font-bold text-black mb-2">
                {audience.title}
              </h3>
              <p className="text-base md:text-lg text-[#595959]">{audience.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  );
};

