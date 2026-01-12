"use client";

import { FC } from "react";
import Image from "next/image";
import { Wrapper } from "@workspace/ui/lib";
import type { OnlineCourse } from "../../data";

interface WhyLearnUIUXSectionProps {
  course: OnlineCourse;
}

export const WhyLearnUIUXSection: FC<WhyLearnUIUXSectionProps> = ({
  course,
}) => {
  const cards = [
    {
      icon: "/icons/user.svg",
      title: "Understand user needs",
      description:
        "Learn to empathize with users and identify their pain points",
    },
    {
      icon: "/icons/puzzle.svg",
      title: "Solve real problems",
      description: "Apply design thinking to create meaningful solutions",
    },
    {
      icon: "/icons/phone.svg",
      title: "Create intuitive experiences",
      description: "Build interfaces that feel natural and easy to use",
    },
    {
      icon: "/icons/design.svg",
      title: "Design modern interfaces",
      description:
        "Master visual design principles and contemporary aesthetics",
    },
  ];

  return (
    <section className="py-16 lg:py-20">
      <Wrapper className="max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="text-white w-full lg:w-[46%] text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1F2666] mb-6">
              {course.whyChoose.title}
            </h2>
            <div className="space-y-6 mb-11">
              <p className="text-xl text-[#595959] ">
                Great digital products don't happen by accident — they're
                intentionally designed with empathy, clarity, and purpose.
              </p>
              <p className="text-xl text-[#595959]">
                UI/UX remains one of the most in-demand careers in tech and
                digital product teams worldwide.
              </p>
            </div>
            {/* Quote Box */}
            <div className="bg-[#FBF5F5] rounded-lg p-6">
              <p className="text-lg font-bold mb-2 text-[#1F2666]">
                "Design is not just what it looks like and feels like. Design is
                how it works."
              </p>
              <p className="text-gray-600 text-base">— Steve Jobs</p>
            </div>
          </div>

          {/* Right Section - Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full lg:w-[51%]">
            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-lg px-5 py-8 shadow-md flex flex-col border"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 flex-shrink-0">
                  <Image
                    src={card.icon}
                    alt={card.title}
                    width={20}
                    height={20}
                  />
                </div>
                <h3 className="text-lg font-bold text-black mb-4">
                  {card.title}
                </h3>
                <p className="text-[#595959] text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Wrapper>
    </section>
  );
};
