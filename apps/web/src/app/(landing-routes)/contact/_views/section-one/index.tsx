import Image from "next/image";
import React from "react";
import { MdEmail } from "react-icons/md";

import { ContactForm } from "../../_components/contact-form";
import { Wrapper } from "@workspace/ui/lib";

export const SectionOne: React.FC = () => {
  return (
    <section className="min-h-[653px]">
      <Wrapper>
        <section className="flex flex-col-reverse gap-12 lg:flex-row lg:gap-[109px]">
          <div className="mb-10 flex-1 lg:mb-0">
            <ContactForm />
          </div>
          <div className="mb-10 flex-1 text-center lg:mb-0 lg:mt-[90px] lg:text-start">
            <div className="mb-6">
              <h3 className="mb-2 text-2xl font-bold">Our Office Location</h3>
              <p className="text-gray-700">Where the magic happens</p>
            </div>
            <div className="flex flex-col items-center gap-5 lg:flex-row lg:items-start">
              <div>
                <Image
                  width={66}
                  height={46}
                  src="/images/flag.webp"
                  alt="flag"
                />
              </div>
              <div>
                <h6 className="font-semibold">Lagos, Nigeria</h6>
                <p className="text-high-grey-II">
                  1 Ogunlesi Street, Off Awoyokun, Onipanu, Lagos.
                </p>
                <h6 className="mt-6 font-semibold">Call or Whatsapp</h6>
                <p className="mt-2 text-high-grey-II">
                  <span className="font-semibold">Busola:</span>
                  <a className="text-dark" href="tel:+2348113800161">
                    +234 811 380 0161
                  </a>
                </p>
                <p className="mt-2 text-high-grey-II">
                  <span className="font-semibold">Blessing:</span>
                  <a className="text-dark" href="tel:+2348126051769">
                    +234 812 605 1769
                  </a>
                </p>
                <div className="mt-8 flex items-center justify-center gap-4 lg:justify-normal">
                  <MdEmail className="text-2xl" />
                  <a
                    href="mailto:info@techstudioacademy.com"
                    className="font-semibold"
                  >
                    info@techstudioacademy.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Wrapper>
    </section>
  );
};
