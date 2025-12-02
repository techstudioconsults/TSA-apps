import { FC } from "react";

import { Card } from "../../_components/card";
import { ProgramSectionOne } from "../../types/index.types";
import { Wrapper } from "@workspace/ui/lib";

interface CourseSectionOneProperty {
  sectionOne: ProgramSectionOne;
}

export const SectionOne: FC<CourseSectionOneProperty> = ({ sectionOne }) => {
  // Guard against possibly-undefined indexed access when using --noUncheckedIndexedAccess
  const cards = sectionOne.cards ?? [];
  const first = cards[0];
  const second = cards[1];
  const third = cards[2];

  return (
    <section className="min-h-[508px]">
      <Wrapper className="text-center my-10 lg:!my-0">
        <h2 className="mb-[55px] text-[24px] lg:text-[36px]">Our Process</h2>
        <div className="flex flex-col justify-between gap-[20px] lg:flex-row">
          {first && <Card image="/icons/no1.webp" text={first.text} />}
          {second && <Card image="/icons/no2.webp" text={second.text} />}
          {third && <Card image="/icons/no3.webp" text={third.text} />}
        </div>
      </Wrapper>
    </section>
  );
};
