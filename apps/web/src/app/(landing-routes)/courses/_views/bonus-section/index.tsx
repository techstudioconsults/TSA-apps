"use client";

import { CustomButton, Wrapper } from "@workspace/ui/lib";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";

export const BonusSection = () => {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if running in the browser
    const userAgent =
      typeof navigator === "undefined" ? "" : navigator.userAgent;
    setIsIOS(/iPad|iPhone|iPod/.test(userAgent));
  }, []);

  const whatsappLink = isIOS
    ? "https://api.whatsapp.com/send/?phone=2348113800161&text=Hello!%20TechStudio%20Academy,%20I%E2%80%99ll%20like%20to%20make%20an%20enquiry"
    : "https://api.whatsapp.com/send/?phone=2348113800161&text=Hello!%20TechStudio%20Academy,%20I%E2%80%99ll%20like%20to%20make%20an%20enquiry";

  return (
    <section className="bg-accent py-14">
      <Wrapper className="max-w-6xl text-center">
        <h2 className="mb-[55px] text-[24px] lg:text-[36px]">
          Enrol Now and Get These FREE Bonuses
        </h2>
        <div className="mb-14 grid grid-cols-1 items-center gap-5 lg:grid-cols-3">
          <div className="flex flex-col gap-2 h-full rounded-xl bg-white px-5 py-7 text-left">
            <div className="w-full max-w-28 rounded-2xl bg-low-blue p-1 text-center">
              <p className="font-medium text-mid-blue">₦50k Value</p>
            </div>
            <h6 className="text-xl font-semibold">
              LinkedIn Optimization Guide
            </h6>
            <p>
              Complete guide to optimize your LinkedIn profile for tech
              opportunities
            </p>
          </div>
          <div className="flex flex-col gap-2 h-full rounded-xl bg-white px-5 py-7 text-left">
            <div className="w-full max-w-28 rounded-2xl bg-low-blue p-1 text-center">
              <p className="font-medium text-mid-blue">₦50k Value</p>
            </div>
            <h6 className="text-xl font-semibold">
              Job Application Swipe File
            </h6>
            <p>
              Proven templates and strategies for landing your first tech job
            </p>
          </div>
          <div className="flex flex-col gap-2 h-full rounded-xl bg-white px-5 py-7 text-left">
            <div className="w-full max-w-28 rounded-2xl bg-low-blue p-1 text-center">
              <p className="font-medium text-mid-blue">₦50k Value</p>
            </div>
            <h6 className="text-xl font-semibold">Alumni Network Access</h6>
            <p>
              Complete guide to optimize your LinkedIn profile for tech
              opportunities
            </p>
          </div>
        </div>

        <CustomButton
          href={whatsappLink}
          variant="primary"
          size="xl"
          className=" bg-[#00e676] text-white hover:bg-success hover:text-white"
          isLeftIconVisible
          icon={<FaWhatsapp className="!size-10" />}
        >
          Ask a Question on whatsapp
        </CustomButton>
      </Wrapper>
    </section>
  );
};
