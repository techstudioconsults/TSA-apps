"use client";

import { FC, useState, useEffect } from "react";
import { Wrapper } from "@workspace/ui/lib";
import { CustomButton } from "@workspace/ui/lib";
import type { OnlineCourse } from "../../data";
import Image from "next/image";
import { ApplicationFormModal } from "../application-form-modal";

interface OnlineCourseHeroProps {
  course: OnlineCourse;
}

export const OnlineCourseHero: FC<OnlineCourseHeroProps> = ({ course }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const userAgent =
      typeof navigator === "undefined" ? "" : navigator.userAgent;
    setIsIOS(/iPad|iPhone|iPod/.test(userAgent));
  }, []);

  const whatsappLink =
    "https://api.whatsapp.com/send/?phone=2348113800161&text=Hello!%20TechStudio%20Academy,%20I%E2%80%99ll%20like%20to%20make%20an%20enquiry";

  return (
    <>
      <header className="relative lg:min-h-[737px] pt-32 md:pt-44 w-full bg-[#162143]  py-[100px] bg-cover bg-center text-white overflow-hidden" style={{ backgroundImage: `url(${course.hero.backgroundImage})`}}> 
      <div className="absolute inset-0 bg-[#1F2666]/60 z-0" /> 
        <Wrapper className="relative max-w-7xl">
          <section className="flex flex-col lg:flex-row justify-between gap-10  items-center text-center lg:text-left">
            <div className="w-full lg:w-[45%]">
            <h1 className="mb-5 lg:mb-8 text-3xl lg:text-4xl font-bold text-white">
              {course.hero.title}
            </h1>
            <p className="mb-9 lg:mb-12 text-lg md:text-xl text-white/90 text-center lg:text-start">
              {course.hero.subTitle}
            </p>
            <div className="flex flex-col md:flex-row gap-4 lg:gap-9 w-full justify-center lg:justify-start">
          <CustomButton
            onClick={() => setIsModalOpen(true)}
            variant="primary"
            size="lg"
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 md:px-12 py-3 rounded font-bold"
          >
            Apply Now
          </CustomButton>

          <CustomButton
            href={whatsappLink}
            variant="primary"
            size="lg"
            className="w-full md:w-auto bg-[#DCE9FA] text-[#0266F4] hover:bg-white px-8 md:px-10 py-3 rounded font-bold backdrop-blur-sm"
          >
            Ask a Question
          </CustomButton>
        </div>


            </div>
            <div className="w-full lg:w-[40%]">
              <Image src={course.hero.image} width={100} height={100} alt="" className="w-full border-4 border-[#5F76E6] rounded-[27px]"/>
            </div>
          </section>
        </Wrapper>
      </header>
      <ApplicationFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        course={course}
      />
    </>
  );
};

