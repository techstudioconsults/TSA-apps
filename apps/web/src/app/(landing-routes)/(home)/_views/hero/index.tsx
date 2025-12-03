"use client";

import Image from "next/image";
import React, { useEffect } from "react";

import { EmailForm } from "../../_components/email-form/email-form";
import { HeroCanvas } from "../../_components/canvas/hero-canvas";
import { Wrapper } from "@workspace/ui/lib";
import { useWindowWidth } from "@workspace/ui/hooks";

export const Hero = () => {
  const canvaReference = React.useRef<HTMLCanvasElement>(null);
  const { winWidth } = useWindowWidth();

  useEffect(() => {
    if (!canvaReference.current) return;
    canvaReference.current.style.height = `${window.innerHeight}px`;
    HeroCanvas(canvaReference.current);
  }, [winWidth]);

  return (
    <section className="relative h-[80vh] flex justify-center w-full items-center overflow-hidden bg-primary bg-primary-gradient text-background">
      <Wrapper>
        <section className="mx-auto mt-[3rem] flex w-full flex-col items-center justify-between gap-[50px] lg:flex-row">
          <div className="flex flex-row gap-[7rem] lg:flex-col">
            <Image
              priority
              className="h-[32px] w-[32px] lg:h-[64px] lg:w-[64px]"
              src="https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1760488810/techstudio/tsa-repo/muanxqedy07dndyyuuvn.png"
              alt="icon"
              width={64}
              height={64}
            />
            <Image
              priority
              className="h-[32px] w-[32px] lg:h-[64px] lg:w-[64px] lg:translate-x-[7rem]"
              src="https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1760488810/techstudio/tsa-repo/zyxlkurk4urydsx7snhz.png"
              alt="icon"
              width={64}
              height={64}
            />
            <Image
              priority
              className="h-[32px] w-[32px] lg:h-[64px] lg:w-[64px]"
              src="https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1760488805/techstudio/tsa-repo/kahpbkjqkqxx71rclclh.png"
              alt="icon"
              width={64}
              height={64}
            />
          </div>
          <article className="z-10 flex h-full flex-col items-center xl:w-[731px]">
            <div className="mb-[10px] flex w-fit items-center gap-2 rounded-full bg-mid-blue px-[14px] py-[10px] opacity-[60%]">
              <Image
                src="https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1760488927/techstudio/tsa-repo/m44v2zdmg2gevrautcz0.png"
                width={24}
                height={24}
                alt="star"
              />
              <p className="text-xs text-white lg:text-sm">
                No 1 Training Institute in Lagos
              </p>
            </div>
            <h1 className="h1 text-center text-[40px] text-white lg:text-[73px] xl:leading-[99px]">
              Unlock Your{" "}
              <span className="italic text-mid-danger">
                <br /> Tech Potential <br />
              </span>
              With Us Today!
            </h1>
            <EmailForm
              className="mt-[44px] lg:w-[30rem]"
              buttonTitle={"Explore Courses"}
            />
          </article>
          <div className="flex flex-row gap-[7rem] lg:flex-col">
            <Image
              priority
              className="h-[32px] w-[32px] lg:h-[64px] lg:w-[64px]"
              src="https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1760488803/techstudio/tsa-repo/ithcxpbxqazoaclnbaky.png"
              alt="icon"
              width={64}
              height={64}
            />
            <Image
              priority
              className="h-[32px] w-[32px] lg:h-[64px] lg:w-[64px] lg:translate-x-[-7rem]"
              src="https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1760488804/techstudio/tsa-repo/fmhj5zbqi8n8djswkdwk.png"
              alt="icon"
              width={64}
              height={64}
            />
            <Image
              priority
              className="h-[32px] w-[32px] lg:h-[64px] lg:w-[64px]"
              src="https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1760488804/techstudio/tsa-repo/yudrqqhpezwonhmfe61r.png"
              alt="icon"
              width={64}
              height={64}
            />
          </div>
        </section>
      </Wrapper>
      <canvas
        className="absolute top-0 w-full"
        ref={canvaReference}
        id="particles_404"
      />
    </section>
  );
};
