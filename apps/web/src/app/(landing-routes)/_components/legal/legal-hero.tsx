import { Wrapper } from "@workspace/ui/lib";
import { FC } from "react";

interface LegalHeroProps {
  title: string;
  lastUpdated: string;
}

export const LegalHero: FC<LegalHeroProps> = ({ title, lastUpdated }) => {
  return (
    <header className="w-full bg-primary pt-[70px] text-white">
      <Wrapper className="!mt-0">
        <section className="pb-[64px] pt-[64px] text-center">
          <h1 className="text-[34px] font-bold text-white lg:text-[56px]">
            {title}
          </h1>
          <p className="mt-6 text-sm text-white/80">
            Last Updated: ({lastUpdated})
          </p>
        </section>
      </Wrapper>
    </header>
  );
};
