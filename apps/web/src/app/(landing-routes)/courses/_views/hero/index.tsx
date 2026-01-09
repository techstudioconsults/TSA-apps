import { FC } from "react";

import LeadForm from "../../_components/register-form/lead-form";
import { ProgramIntro } from "../../types/index.types";
import { Wrapper } from "@workspace/ui/lib";

interface CourseHeroProperty {
  intro: ProgramIntro;
  slug: string;
}

export const Hero: FC<CourseHeroProperty> = ({ intro, slug }) => {
  return (
    <header className="min-h-[737px] pt-32 w-full bg-[#162143DE] bg-[url('/images/guy-on-laptop.png')]  py-[100px] bg-cover bg-center text-white">
      <Wrapper>
        <section className="flex flex-col items-center gap-[50px] text-center lg:gap-[171px] xl:flex-row xl:text-left">
          <div className="flex-1">
            <h1 className="mb-[26px] leading-[61px] text-white">
              {intro.title}
            </h1>
            <p>{intro.subTitle}</p>
          </div>
          <div className="flex-1">
            {/* <RegisterForm slug={slug} /> */}
            <LeadForm
              slug={slug}
              className="before:absolute before:left-[66px] before:top-[-60px] before:z-[-1] before:hidden before:h-[387px] before:w-[467px] before:rounded-[15px] before:bg-[#072C5B] before:content-empty before:lg:block"
            />
          </div>
        </section>
      </Wrapper>
      {/* febuary 17th */}
    </header>
  );
};
