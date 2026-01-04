"use client";

import { FC } from "react";
import Image from "next/image";
import { Wrapper } from "@workspace/ui/lib";
import type { OnlineCourse } from "../../data";

interface OutcomesSectionProps {
  course: OnlineCourse;
}

export const OutcomesSection: FC<OutcomesSectionProps> = ({ course }) => {
  const isUIUX = course.slug === "ui-ux-design";
  const isDataAnalytics = course.slug === "data-analytics";
  const isCybersecurity = course.slug === "cybersecurity";
  
  return (
    <section className={`${isDataAnalytics || isUIUX || isCybersecurity? "bg-[#EDF5FF]" : "bg-white"} py-16 lg:py-20 `}>
      <Wrapper className="max-w-7xl">
        {isUIUX || isCybersecurity ? (
          <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-[37%]">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1F2666] mb-6 text-center lg:text-left">
              {course.outcomes.title}
            </h2>
            {course.outcomes.description && (
              <div className="space-y-4 text-lg md:text-[19.7px] text-[#595959] text-center lg:text-left">
                {course.outcomes.description.split('. ').map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            )}
          </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full lg:w-[59%]">
              {course.outcomes.items.map((item, index) => (
                <div key={index} className="flex items-start gap-3  bg-white rounded-lg py-3 px-2.5">
                  <svg
                    className="w-6 h-6 text-[#407BFF] flex-shrink-0 mt-1 bg-[#EDF6FF] rounded-full"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-[#303030] text-xl font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ) : isDataAnalytics ? (
          <div className="">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1F2666] mb-4 max-w-lg mx-auto">
                {course.outcomes.title}
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl text-[#595959] max-w-xl mx-auto">
              Walk away with real skills, a professional portfolio, and the confidence to land your first data role.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {(() => {
                // Map outcomes items to cards with titles and descriptions for data analytics
                const outcomeCards = [
                  {
                    icon: "/icons/Code.svg",
                    title: "Practical Skills",
                    description: "Excel, SQL, Python, Power BI / Tableau, and Machine Learning fundamentals",
                  },
                  {
                    icon: "/icons/FolderOpen.svg",
                    title: "Portfolio-Ready Projects",
                    description: "Work with real datasets and complete a capstone project",
                  },
                  {
                    icon: "/icons/UsersThree.svg",
                    title: "Career Support",
                    description: "Resume, LinkedIn, and job-application guidance",
                  },
                  {
                    icon: "/icons/GraduationCap.svg",
                    title: "Mentorship & Guidance",
                    description: "Expert support throughout your learning journey",
                  },
                  {
                    icon: "/icons/Clock.svg",
                    title: "Flexible Online Learning",
                    description: "Fully online with recorded lessons to learn at your own pace",
                  },
                ];
                return outcomeCards.map((card, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center p-1"
                  >
                  
                    <Image src={card.icon} alt={card.title} width={54} height={53} className="mb-6 lg:mb-9"/>
                  
                    <h3 className="text-xl md:text-2xl font-bold text-black mb-2">
                      {card.title}
                    </h3>
                    <p className="text-base text-[#595959]">{card.description}</p>
                  </div>
                ));
              })()}
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1F2666] mb-4">
                {course.outcomes.title}
              </h2>
              {course.outcomes.description && (
                <p className="text-lg md:text-xl lg:text-2xl text-[#595959] mb-8 max-w-3xl mx-auto">
                  {course.outcomes.description}
                </p>
              )}
            </div>
            <div className="flex  flex-col-reverse lg:flex-row justify-between items-center gap-10">
            <div className="flex flex-col w-full lg:w-[45%] gap-4 lg:gap-7">
              {course.outcomes.items.map((item, index) => (
                <div key={index} className="flex  items-start gap-3 border p-2.5 rounded-lg">
                  <svg
                    className="w-8 h-8 text-[#0266F4] mt-1 flex-shrink-0 bg-[#E8F1FF] rounded-md"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-black text-lg md:text-xl font-semibold ">{item}</span>
                </div>
              ))}
             
            </div>
            <div className="w-full lg:w-[45%]">
            <Image src="/images/techguy.png" width={100} height={100} alt="Tech Guy" className="w-full object-cover"/>
            </div>
          
            </div>
          </div>
        )}
      </Wrapper>
    </section>
  );
};

