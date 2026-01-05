"use client";

import { FC } from "react";
import { Wrapper } from "@workspace/ui/lib";
import type { OnlineCourse } from "../../data";

interface LearningJourneySectionProps {
  course: OnlineCourse;
}

export const LearningJourneySection: FC<LearningJourneySectionProps> = ({
  course,
}) => {
  return (
    <section className="pt-16 lg:pt-24 bg-white">
      <Wrapper className="max-w-7xl ">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1F2666] mb-4">
            {course.learningJourney.title}
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-[#595959] max-w-3xl mx-auto">
            {course.learningJourney.description}
          </p>
        </div>
        <div className="relative px-4 lg:px-8">
          {/* Vertical timeline line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[1.72px] bg-[#E5E7EE]"></div>
          
          <div className="space-y-12 lg:space-y-16">
            {course.learningJourney.units.map((unit, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div 
                  key={index} 
                  className={`relative flex flex-col lg:flex-row items-start gap-8  ${
                    isLeft ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 top-6 w-6 h-6 items-center justify-center z-10">
                    <div className="w-4 h-4 bg-[#0071F2] rounded-full"></div>
                  </div>
                  
                  {/* Content card */}
                  <div
                    className={`flex flex-col bg-[#FBFBFC] rounded-lg p-6 lg:p-8 w-full ${
                      isLeft ? "lg:mr-[calc(50%+24px)] items-end text-end justify-end" : "lg:ml-[calc(50%+24px)]"
                    }`}
                  >
                    <div className="mb-4">
                      <span className="inline-block text-[#0266F4] font-bold text-sm mb-2">
                        UNIT {unit.unitNumber}
                      </span>
                      <h3 className="text-lg md:text-xl font-bold text-black mt-1">
                        {unit.title}
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {unit.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className={`flex  gap-3 ${isLeft ? "items-end justify-end" : "items-start"} `}>
                          {!isLeft ? 
                          <svg
                          className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0"
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
                        </svg> : ""}
                          <span className="text-gray-700">{topic}</span>
                          {isLeft ? 
                          <svg
                          className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0"
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
                        </svg> : ""}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

