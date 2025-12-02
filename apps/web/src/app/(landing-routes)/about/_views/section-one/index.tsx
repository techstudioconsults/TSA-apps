"use client";

import { FACILITY_CONTENT } from "@/lib/constants";
import { TsaCarousel, Wrapper } from "@workspace/ui/lib";

export const SectionOne = () => {
  return (
    <section className="min-h-[676px] bg-accent py-[48px]">
      <Wrapper className="mb-[35px] grid grid-cols-1 items-center gap-y-0 text-center lg:grid-cols-3 lg:gap-[28px] lg:text-left">
        <div>
          <span className="text-sm font-bold uppercase text-mid-blue">
            MORE ABOUT US
          </span>
          <h3>Our Gallery</h3>
        </div>
        <div className="col-span-2">
          <p className="leading-[24px]">
            Our gallery section offers a concise overview of our advanced
            learning facilities and resources. It highlights our commitment to
            quality education and showcases the innovative tools we use to
            support and enhance the student experience, giving prospective
            students and partners a clear sense of our educational approach.
          </p>
        </div>
      </Wrapper>
      <Wrapper className="p-[38px]">
        <TsaCarousel variant="facility" facilityContent={FACILITY_CONTENT} />
      </Wrapper>
    </section>
  );
};
