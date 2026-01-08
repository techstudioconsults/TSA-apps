"use client";

import { FC } from "react";
import Image from "next/image";
import { Wrapper } from "@workspace/ui/lib";

interface WhyStruggleSectionProps {
  text?: string;
}

export const WhyStruggleSection: FC<WhyStruggleSectionProps> = ({
  text = "",
}) => {
  return (
    <section className="py-12 lg:py-16 bg-[#FBF5F5]">
      <Wrapper className="max-w-6xl">
        <div className="text-center">
          <div className="flex items-center justify-center gap-5 md:gap-10 lg:gap-32 mb-11">
            <Image alt="icon" width={59} height={99} src={"/icons/Left.svg"} />
            <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-[#1F2666]">
              Why Most People Struggle to Learn Coding Alone
            </h2>
            <Image
              width={59}
              height={99}
              src={"/icons/Right.svg"}
              alt={"icon"}
            />
          </div>
          <p className="text-base md:text-xl lg:text-2xl text-gray-500 max-w-5xl mx-auto mb-6">
            You've tried YouTube tutorials. Maybe a free course or two. But
            months later, you still can't build anything, real. Sound familiar?
          </p>
          <p className="text-base md:text-xl lg:text-2xl text-gray-500 max-w-5xl mx-auto">
            Without structure, projects, guidance, and accountability, most
            learners never move from{" "}
            <span className="font-semibold text-black">"I'm learning"</span> -{" "}
            <span className="font-semibold text-black">"I'm employable."</span>
          </p>
        </div>
      </Wrapper>
    </section>
  );
};
