"use client";

import { CustomButton, Wrapper } from "@workspace/ui/lib";
import { BlurImage } from "@workspace/ui/components";
import { LifeAfterTraining } from "@/app/views/life-after-training";
import { CarouselBanner } from "@/components/banners/carousel-banner";

export const SectionThree = () => {
  return (
    <section className="min-h-[1577px]">
      <div className="min-h-[305px]">
        <LifeAfterTraining />
      </div>
      <Wrapper>
        <CarouselBanner />
      </Wrapper>
      <Wrapper className="grid min-h-[431px] grid-cols-1 items-center gap-[28px] gap-y-0 text-center lg:grid-cols-2 lg:text-left">
        <div className="">
          <BlurImage
            priority
            width={567}
            height={431}
            src="/gifs/certificate.gif"
            alt="certificate"
            className="mx-auto object-cover"
          />
        </div>
        <div className="">
          <span className="text-sm font-bold uppercase text-mid-blue">
            Take A Course
          </span>
          <h3 className="my-[19px]">
            Acquire a tech skill to transcend your current earning status
          </h3>
          <p>
            We provide high-quality and affordable technology training to meet
            our students’ needs. Also, we ensure all our students are equipped
            with the necessary tech skills for related work opportunities at the
            end of the program.
          </p>
          <CustomButton
            href="/explore"
            variant="primary"
            size="lg"
            className="mt-[36px] h-[48px] w-[156px] bg-mid-blue"
          >
            Enroll Now
          </CustomButton>
        </div>
      </Wrapper>
    </section>
  );
};
