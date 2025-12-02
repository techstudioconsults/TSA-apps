"use client";

import { Input, Wrapper } from "@workspace/ui/lib";
import { FC } from "react";

export const Hero: FC = () => {
  return (
    <header className="w-full bg-[url('/images/HeroBg.webp')] bg-cover bg-center pt-[70px] text-white ">
      <Wrapper className="!mt-0">
        <section className="pt-[84px] text-center">
          <h1 className="text-[34px] text-white">
            Frequently Asked Questions <br /> (FAQS)
          </h1>
          <p className="mx-auto mt-4 max-w-[780px]">
            You have questions? We are here to help
          </p>
        </section>
        <div className="pb-[59px] pt-[37px]">
          <Input
            disabled
            className="mx-auto h-[65px] max-w-[780px] text-black"
            placeholder={"Search for a question..."}
          />
        </div>
      </Wrapper>
    </header>
  );
};
