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

  useEffect(() => {
    // Detect iOS for potential future use
    const userAgent =
      typeof navigator === "undefined" ? "" : navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  }, []);

  const whatsappLink =
    "https://api.whatsapp.com/send/?phone=2348113800161&text=Hello!%20TechStudio%20Academy,%20I%E2%80%99ll%20like%20to%20make%20an%20enquiry";

  return (
    <>
      <header
        className="relative lg:min-h-[737px] pt-32 md:pt-40 w-full py-[100px] bg-cover bg-center text-white overflow-hidden"
        style={{
          backgroundImage: `url(${course.hero.backgroundImage})`,
          backgroundColor: "#162143",
        }}
      >
        <div className="absolute inset-0 z-0 bg-black/40" />
        <Wrapper className="relative max-w-7xl">
          <section className="flex flex-col lg:flex-row justify-between gap-10 items-center text-center lg:text-left">
            <div className="w-full lg:w-[44%]">
              <h1 className="mb-5 lg:mb-8 text-3xl lg:text-[42px] font-bold text-white">
                {course.hero.title}
              </h1>
              <p className="relative z-10 text-lg text-white">
                {course.hero.subTitle
                  .split("Generative AI and prompt engineering")
                  .map((part, index, array) => (
                    <span key={index}>
                      {part}
                      {index < array.length - 1 && (
                        <span className="italic">
                          Generative AI and prompt engineering
                        </span>
                      )}
                    </span>
                  ))}
              </p>
              <div className="flex mt-10 flex-col md:flex-row gap-4 lg:gap-9 w-full justify-center lg:justify-start">
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
            <div className="w-full lg:w-[43%]">
              <Image
                src={course.hero.image}
                width={500}
                height={500}
                alt={course.hero.title}
                className="w-full border-4 border-[#5F76E6] rounded-[27px] object-cover"
              />
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
