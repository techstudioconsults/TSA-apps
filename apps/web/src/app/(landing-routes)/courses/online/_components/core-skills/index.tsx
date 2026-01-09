"use client";

import { FC } from "react";
import Image from "next/image";
import { Wrapper } from "@workspace/ui/lib";
import type { OnlineCourse } from "../../data";

interface CoreSkillsSectionProps {
  course: OnlineCourse;
}

export const CoreSkillsSection: FC<CoreSkillsSectionProps> = ({ course }) => {
  if (!course.coreSkills) return null;

  return (
    <section className="py-8 lg:py-12 bg-[#EDF5FF]">
      <Wrapper className="max-w-6xl">
        <div className="text-center mb-12 ">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1F2666] mb-4 max-w-lg mx-auto">
            {course.coreSkills.title}
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-[#595959] max-w-3xl mx-auto">
            {course.coreSkills.description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
          {course.coreSkills.skills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-1 md:p-3"
            >
              <Image
                src={skill.icon}
                alt={skill.title}
                width={54}
                height={53}
                className="mb-6 lg:mb-9"
              />

              <h3 className="text-xl md:text-2xl font-bold text-black mb-2">
                {skill.title}
              </h3>
              <p className="text-base text-[#595959]">{skill.description}</p>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  );
};
