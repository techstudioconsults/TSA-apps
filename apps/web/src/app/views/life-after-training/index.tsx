import Image from "next/image";
import { COMPANIES } from "../../../lib/constants";
import { Wrapper } from "@workspace/ui/lib";
import { TsaMarquee } from "../marquee";

export const LifeAfterTraining = () => {
  const companiesList = COMPANIES.map((company, index) => {
    return (
      <Image
        priority
        width={100}
        height={50}
        key={index}
        src={company}
        alt="company"
      />
    );
  });
  return (
    <>
      <Wrapper className="grid grid-cols-1 items-end gap-[28px] gap-y-0 text-center lg:mb-[64px] lg:grid-cols-2 lg:text-left">
        <div className="flex-1">
          <span className="text-sm font-bold uppercase text-mid-blue">
            LIFE AFTER TRAINING
          </span>
          <h3 className="mt-[12px]">Where Our Graduates Work</h3>
        </div>
        <div className="flex-1">
          <p className="leading-[25px]">
            Our talented graduates flourish in leading companies across the
            globe, making significant contributions to both their personal
            growth and the organizations they serve. They work in industries
            ranging from Information technology to Telecommunication, and more.
          </p>
        </div>
      </Wrapper>
      <TsaMarquee className="h-[85px] space-x-[30px] lg:space-x-[73px]">
        {companiesList}
      </TsaMarquee>
    </>
  );
};
