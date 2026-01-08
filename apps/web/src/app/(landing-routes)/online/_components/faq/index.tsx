"use client";

import { FC } from "react";
import { Wrapper } from "@workspace/ui/lib";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components";
import type { OnlineCourse } from "../../data";

interface FAQSectionProps {
  course: OnlineCourse;
}

export const FAQSection: FC<FAQSectionProps> = ({ course }) => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <Wrapper className="max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-[24px] lg:text-[36px] font-bold text-[#1F2666] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
          Everything you need to know about our Weekend Online Course
          </p>
        </div>
        <div className="mb-8">
          <Accordion type="multiple">
            {course.faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-none font-normal">
                <AccordionTrigger className="group flex h-[80px] w-full items-center justify-between text-left text-lg transition-all lg:text-xl ">
                  <span className="text-[#1E1E1E] text-lg md:text-xl">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700 text-base md:text-lg">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <p className="text-center text-[#1F2666] text-lg md:text-xl lg:text-2xl">
          Still have questions?{" "}
          <Link href="/contact" className="font-bold hover:underline text-lg md:text-xl lg:text-2xl">
            Contact Us Now!
          </Link>
        </p>
      </Wrapper>
    </section>
  );
};

