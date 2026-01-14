"use client";

import { SLIDE_CONTENT } from "@/lib/constants";
import { TsaCarousel, Wrapper } from "@workspace/ui/lib";
import Image from "next/image";
import { FC } from "react";

export const SectionTwo: FC = () => {
  return (
    <section className="relative min-h-[518px] overflow-hidden bg-accent lg:py-[85px]">
      <Wrapper>
        <section className="grid grid-cols-1 items-center gap-[28px] lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <span className="relative z-10 text-sm font-bold uppercase text-mid-blue">
              what we offer
            </span>
            <h3 className="mt-[12px] lg:mt-0">
              Certified Tech Training Courses and
            </h3>
            <p className="leading-[23px]">
              Explore our extensive selection of highly sought-after
              beginner-friendly tech courses, meticulously designed to empower
              and inspire learners at every step of their educational journey.
              <Image
                priority
                className="relative left-1 top-4 hidden lg:inline"
                src={"/icons/scribble.png"}
                alt={"icon"}
                width={34}
                height={34}
              />
            </p>
          </div>
          <TsaCarousel variant="course" courseContent={SLIDE_CONTENT} />
        </section>
      </Wrapper>
      <Image
        className="absolute left-[-1rem] top-[-1rem] hidden xl:block"
        src={
          "https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1699878955/techstudio/tsa-repo/about-img6_ofhoud_pgljlr.webp"
        }
        alt={"img"}
        width={112}
        height={112}
      />
      <Image
        className="absolute bottom-0 right-0 hidden xl:block"
        src={
          "https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1699878962/techstudio/tsa-repo/AboutSection2Pattern02_mnthqw_f9yjcp.png"
        }
        alt={"img"}
        width={91}
        height={88}
      />
    </section>
  );
};
