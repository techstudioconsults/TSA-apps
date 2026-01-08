"use client";

import { FC, useState } from "react";
import { Wrapper } from "@workspace/ui/lib";
import { CustomButton } from "@workspace/ui/lib";
import type { OnlineCourse } from "../../data";
import { ApplicationFormModal } from "../application-form-modal";

interface CTASectionProps {
  course: OnlineCourse;
}

export const CTASection: FC<CTASectionProps> = ({ course }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="py-16 lg:py-24 bg-white text-white relative overflow-hidden">
        <Wrapper className={`max-w-[330px] md:max-w-2xl lg:max-w-4xl xl:max-w-6xl relative z-10 rounded-[25px] bg-[#1F2666] py-14 bg-cover`} style={{ backgroundImage: `url(${course.cta.bg})` }}>
          <div className={`text-center `}>
            <h2 className="text-[24px] lg:text-[36px] font-bold mb-4 text-white max-w-xl lg:max-w-2xl mx-auto">
              {course.cta.title}
            </h2>
            <p className="text-base md:text-lg leading-[25px]  text-white mb-8 max-w-xl lg:max-w-2xl mx-auto">
              {course.cta.description}
            </p>
            <CustomButton
              onClick={() => setIsModalOpen(true)}
              variant="primary"
              size="xl"
              className="bg-[#0266F4] hover:bg-blue-700 text-white px-20 py-5 text-base  rounded font-bold"
            >
              {course.cta.buttonText}
            </CustomButton>
          </div>
        </Wrapper>
      </section>
      <ApplicationFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        course={course}
      />
    </>
  );
};

