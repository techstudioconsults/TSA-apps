"use client";

import { BlurImage } from "@workspace/ui/components";
import { CustomButton } from "@workspace/ui/lib";
import { FC } from "react";
import { FaLinkedinIn } from "react-icons/fa";

export const TeamCard: FC<TeamProperties> = ({
  image,
  name,
  role,
  linkedIn,
}) => {
  return (
    <section className="mx-auto w-[100%] rounded-[12px] bg-background p-3 lg:w-[384px]">
      <div className="relative min-h-[387px] w-[100%] rounded-[12px] bg-low-grey-II">
        <BlurImage
          priority
          width={500}
          height={387}
          src={image || `/images/default-avatar.png`}
          alt={name}
          className="min-h-[387px] rounded-[12px] object-cover"
        />
        <CustomButton
          href={linkedIn}
          size="icon"
          className="absolute bottom-[-25px] right-[20px] z-10 h-[50px] rounded-full border-4 border-border bg-[#0077B5] p-3 text-lg text-white"
        >
          <FaLinkedinIn />
        </CustomButton>
      </div>
      <div className="mt-[18px]">
        <h6 className="font-bold">{name}</h6>
        <span className="text-lg text-mid-grey-II">{role}</span>
      </div>
    </section>
  );
};
