"use client";

import { Wrapper } from "@workspace/ui/lib";
import Image from "next/image";

export const SectionTwo = () => {
  return (
    <Wrapper>
      <header className="mx-auto max-w-[557px] text-center">
        <h2 className="text-[24px] lg:text-[35px]">
          Driven by our core values
        </h2>
        <p className="mx-auto max-w-[398px]">
          We are advocates of growth, progress and career advancement.
        </p>
      </header>
      <section className="mt-[38px] grid grid-cols-1 justify-between gap-[60px] md:grid-cols-2 lg:grid-cols-3">
        <CoreValueCardLayout
          iconPath="/icons/clock.png"
          title="Flexibility"
          description="We offer weekdays, weekends, and online classes which enable you to learn at your own pace and convenience."
        />
        <CoreValueCardLayout
          iconPath="/icons/table-chair.png"
          title="Condusive Environment"
          description="We have provided an exquisite learning environment so you may have ease of learning."
        />
        <CoreValueCardLayout
          iconPath="/icons/money.png"
          title="Affordable tuition fees"
          description="We have initiated all of our programs to be affordable, and our payment method can be paid in three installments. Terms & conditions applied."
        />
        <CoreValueCardLayout
          iconPath="/icons/link.png"
          title="Learning & Development"
          description="We have in place modern learning facilities and technologies to ease your learning. Also ensure you engage in projects to develop your skills."
        />
        <CoreValueCardLayout
          iconPath="/icons/pertnership.png"
          title="Great Colleagues"
          description="Your contemporaries will be great and inquisitive minds like you. Willing to learn and effect real change. Also, you’ll have the opportunity to network among your peers."
        />
        <CoreValueCardLayout
          iconPath="/icons/ribbon.png"
          title="Certificates"
          description="You’ll receive a valuable certificate of participation at the end of the program."
        />
      </section>
    </Wrapper>
  );
};

const CoreValueCardLayout = ({
  iconPath,
  title,
  description,
}: {
  iconPath: string;
  title: string;
  description: string;
}) => {
  return (
    <section className="mx-auto flex min-h-[185px] max-w-[358px] flex-col items-center text-center lg:items-start lg:text-start">
      <Image width={30} height={30} src={iconPath} alt={`icon`} />
      <div className="mt-[23px]">
        <h6 className="mb-[13px] text-[18px] font-[700] lg:text-[20px]">
          {title}
        </h6>
        <p>{description}</p>
      </div>
    </section>
  );
};
