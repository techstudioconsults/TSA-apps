"use client";

import { ONLINETESTIMONIAL } from "@/lib/constants";
import { CustomButton, Wrapper } from "@workspace/ui/lib";
import { useEffect, useState } from "react";

export const OnlineTestimonial = () => {
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
    <section className="min-h-[508px] bg-accent py-[50px]">
      <Wrapper className="max-w-6xl text-center">
        <h2 className="mb-[55px] text-[24px] lg:text-[36px]">
          Real Student Success Stories
        </h2>
        <div className="mb-14 grid grid-cols-1 items-center justify-around gap-5 lg:grid-cols-3">
          {ONLINETESTIMONIAL.map((testimony) => (
            <div
              key={testimony.id}
              className="flex min-h-[215px] flex-col gap-3 rounded-xl bg-white p-5"
            >
              <div className="text-left">
                <h6>{testimony.name}</h6>
                <p>Tech Studio Alumni</p>
              </div>
              <div>
                <p className="text-left">{testimony.message}</p>
              </div>
            </div>
          ))}
        </div>
        <CustomButton
          href={whatsappLink}
          variant="primary"
          size="lg"
          className="w-[300px] bg-mid-blue"
        >
          Ask a Question on whatsapp
        </CustomButton>
      </Wrapper>
    </section>
  );
};
