"use client";

import { FULLSTACKFAQS } from "@/lib/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components";
import { Wrapper } from "@workspace/ui/lib";
import Link from "next/link";

export const OnlineClassAccordion: React.FC = () => {
  return (
    <section className="">
      <Wrapper className="!my-0 p-0">
        <section className="">
          <Accordion type="multiple">
            {FULLSTACKFAQS.map((faqItem) => (
              <AccordionItem key={faqItem.id} value={`item-${faqItem.id}`}>
                <AccordionTrigger className="group flex w-full items-center justify-between text-left text-sm transition-all lg:text-xl">
                  <span>{faqItem.question}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <p>{faqItem.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <p className="text-center text-sm lg:text-base">
          Can&apos;t find the answer you are looking for?{" "}
          <Link href="/contact" className="font-semibold text-primary">
            Send us a message here
          </Link>
        </p>
      </Wrapper>
    </section>
  );
};
