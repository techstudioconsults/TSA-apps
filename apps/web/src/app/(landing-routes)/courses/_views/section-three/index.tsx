"use client";

import { ReactElement } from "react";

import { OnlineCountdownBanner } from "../../_components/online-countdown";
import { OnlineClassAccordion } from "../online-accordion";
import { OnlineTestimonial } from "../online-testimonial";

import { Wrapper } from "@workspace/ui/lib";
import { LifeAfterTraining } from "@/app/views/life-after-training";
import { Gallery } from "@/app/views/gallery";
import { CarouselBanner } from "@/components/banners/carousel-banner";
import { TsaAccordion } from "@/components/Accordion";
import HelpBanner from "@/components/banners/help-banner";

interface SectionThreeProperties {
  slug: string;
}

export const SectionThree = ({
  slug,
}: SectionThreeProperties): ReactElement => {
  return (
    <section>
      <LifeAfterTraining />
      <Wrapper className="p-0">
        <Gallery />
      </Wrapper>
      {/* online testimonial here */}
      {slug.includes(`weekday-online-class`) && <OnlineTestimonial />}
      <Wrapper className="mb-10">
        <CarouselBanner />
      </Wrapper>
      {slug.includes(`weekday-online-class`) ? (
        <Wrapper className="">
          <h2 className="text-center">FREQUENTLY ASKED QUESTIONS</h2>
          <OnlineClassAccordion />
        </Wrapper>
      ) : (
        <Wrapper className="">
          <h2 className="text-center">FREQUENTLY ASKED QUESTIONS</h2>
          <TsaAccordion />
        </Wrapper>
      )}

      {slug.includes(`weekday-online-class`) ? (
        <Wrapper>
          <OnlineCountdownBanner
            targetDate={`11th August, 2025`}
            spotsRemaining={15}
            className="mb-20"
          />
        </Wrapper>
      ) : (
        <Wrapper>
          <HelpBanner />
        </Wrapper>
      )}
    </section>
  );
};
