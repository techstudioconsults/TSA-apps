"use client";

import { VerticalStepper } from "@/components/stepper/vertical-stepper";
import { STEPS } from "@/lib/constants";
import { BlurImage } from "@workspace/ui/components";
import { Wrapper } from "@workspace/ui/lib";
import { useState } from "react";

export const SectionFour = () => {
  const [currentStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Image URLs
  const defaultImage = "/gifs/apply.gif";
  const hoverImage = "/gifs/join-class.gif";

  return (
    <section className="min-h-[685px] bg-accent py-[76px]">
      <Wrapper className="grid grid-cols-1 items-center gap-[28px] gap-y-0 lg:grid-cols-2">
        <div className="flex-1">
          <VerticalStepper steps={STEPS} currentStep={currentStep} />
        </div>
        <div
          className="flex-1 h-[500px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <BlurImage
            priority
            width={440}
            height={487}
            src={isHovered ? hoverImage : defaultImage}
            alt={"img"}
            className={`object-cover w-full h-full transition-opacity duration-500 ease-in-out`}
          />
        </div>
      </Wrapper>
    </section>
  );
};
