"use client";

import { FC } from "react";
import { Wrapper } from "@workspace/ui/lib";
import type { OnlineCourse } from "../../data";
import Image from "next/image";

interface BonusesSectionProps {
  course: OnlineCourse;
}

// Icon components for different bonus types
const getIconForBonus = (iconType: string) => {
//   const iconClass = "w-12 h-12 text-blue-600";
  
  switch (iconType.toLowerCase()) {
    case "linkedin":
      return "/icons/meteor-icons_linkedin.svg";
    case "job":
      return "/icons/basil_document-solid.svg";
    case "network":
      return "/icons/fa6-solid_users.svg";
    case "support":
        return "/icons/mdi_file-tick.svg";
    default:
      return "/icons/mdi_file-tick.svg";
  }
};

export const BonusesSection: FC<BonusesSectionProps> = ({ course }) => {
  const isUIUX = course.slug === "ui-ux-design";
  const isFullStack = course.slug === "full-stack-development";
 

  return (
    <section className={`py-16 lg:py-24 bg-white`}>
      <Wrapper className="max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-[24px] lg:text-[36px] font-bold text-[#1F2666] mb-4 max-w-2xl mx-auto">
            Exclusive Bonuses Included at No Extra Cost
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {course.bonuses.map((bonus, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center py-11 px-4 bg-white rounded-lg border-t border-r border-l border-b-8 border-b-[#1F2666] gap-6"
            >
                
              <div className="flex items-center justify-center p-3 rounded bg-[#E8F1FF]">
              <Image src={getIconForBonus(bonus.icon)} width={27} height={27} alt="icon"/>
              </div>
              <h3 className="text-lg font-bold text-black">
                {bonus.title}
              </h3>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  );
};

