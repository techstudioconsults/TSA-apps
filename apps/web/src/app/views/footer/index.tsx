"use client";

import { Input, SelectSeparator } from "@workspace/ui/components";
import { cn, CustomButton, Logo } from "@workspace/ui/lib";
import Link from "next/link";
import { FC } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const TsaFooter: FC<TsaFooterProperties> = ({
  className,
  navLinks,
  subscribeComponent,
  ...rest
}) => {
  return (
    <div
      className={cn(
        `bg-primary px-[1rem] py-[64px] text-white lg:px-0`,
        className,
      )}
      {...rest}
    >
      <footer className="mx-auto max-w-[1240px]">
        <section className="flex flex-col gap-8 lg:flex-row lg:justify-between lg:gap-0">
          <div className="flex flex-col">
            <Logo
              logo={
                "https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1760470861/techstudio/tsa-repo/rcgdvnlkc2tnwkxtxbgh.png"
              }
            />
            <ul className="mt-5 flex flex-col gap-1 text-sm">
              <li className="mb-2">
                <p className="text-light text-xs">
                  1, Ogunlesi Street, Awoyokun Bus Stop,
                  <br /> Onipanu Lagos
                </p>
              </li>
            </ul>
          </div>
          <div className="flex flex-col lg:w-1/6">
            <p className="pb-2.5 text-base font-bold">Courses</p>
            <ul className="flex flex-col gap-3">
              {navLinks.length
                ? navLinks?.map((course: Course, index) => {
                    return (
                      <li key={index}>
                        <Link
                          className="text-xs text-white hover:text-mid-danger"
                          href={`/courses/${course.title
                            .toLowerCase()
                            .trim()
                            .replaceAll(/[\s/]+/g, "-")}`}
                        >
                          {course.title}
                        </Link>
                      </li>
                    );
                  })
                : `Loading Links`}
            </ul>
          </div>
          <div className="flex flex-col lg:w-1/6">
            <h5 className="text-base text-white">About Us</h5>
            <ul className="mt-3 flex flex-col gap-3">
              <li>
                <Link
                  className="text-xs text-white hover:text-mid-danger"
                  href="/about"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  className="text-xs text-white hover:text-mid-danger"
                  href="/contact"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  className="text-xs text-white hover:text-mid-danger"
                  href="/careers"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col lg:w-1/3">
            <div>
              <h5 className="pb-2.5 text-base text-white">
                Subscribe to our newsletter
              </h5>
              {subscribeComponent || (
                <div className="flex items-center justify-between rounded-lg bg-white p-1">
                  <span className="w-full">
                    <Input
                      disabled
                      type="email"
                      className="border-none py-2 text-xs text-black"
                      placeholder="Email Address"
                      aria-label="Email Address"
                      aria-describedby="button-addon2"
                    />
                  </span>
                  <CustomButton
                    isDisabled={true}
                    size="lg"
                    variant="primary"
                    className="bg-mid-blue"
                  >
                    Subscribe
                  </CustomButton>
                </div>
              )}
            </div>
          </div>
        </section>
        <SelectSeparator className="mb-[30px] mt-[32px]" />
        <section className="flex flex-col items-center justify-between gap-5 pt-4 lg:flex-row">
          <p>&copy; {new Date().getFullYear()} TechStudio Academy</p>
          <ul className="flex items-center gap-[33px]">
            <p className="font-light">Terms and Policy</p>
            <li>
              <a
                target="_blank"
                href="https://twitter.com/techstudioacdmy"
                className="text-white hover:text-mid-danger"
                rel="noreferrer"
              >
                <FaXTwitter />
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://linkedin.com/company/techstudioacademy"
                className="text-white hover:text-mid-danger"
                rel="noreferrer"
              >
                <FaLinkedinIn />
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://facebook.com/techstudioacademy"
                className="text-white hover:text-mid-danger"
                rel="noreferrer"
              >
                <FaFacebookF />
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://instagram.com/techstudioacademy"
                className="text-white hover:text-mid-danger"
                rel="noreferrer"
              >
                <FaInstagram />
              </a>
            </li>
          </ul>
        </section>
      </footer>
    </div>
  );
};
