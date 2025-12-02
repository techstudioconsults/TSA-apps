"use client";

import Link from "next/link";
import React, { useEffect } from "react";

import { PaginationComp } from "../pagination";
import { Wrapper } from "@workspace/ui/lib";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components";
import useFAQStore from "@/app/(landing-routes)/faq/action";
import { AccordionSkeleton } from "@/app/(landing-routes)/faq/_components/skeleton/accordion.skeleton";

export const TsaAccordion: React.FC = () => {
  const { getFAQ, faq, loading, error } = useFAQStore();

  useEffect(() => {
    getFAQ();
  }, [getFAQ]);

  return (
    <section className="min-h-[857px]">
      <Wrapper className="min-h-[580px] lg:!mt-0">
        {/* Render the Accordion when the data is loaded */}
        <section className="min-h-[580px]">
          {loading && <AccordionSkeleton />}
          {error && (
            <p className="text-center text-lg text-red-500">
              Failed to load FAQs: {error}
            </p>
          )}
          {!loading && !error && faq && (
            <Accordion type="multiple">
              {faq.map((faqItem) => (
                <AccordionItem key={faqItem.id} value={`item-${faqItem.id}`}>
                  <AccordionTrigger className="group flex h-[80px] w-full items-center justify-between text-left text-sm transition-all lg:text-xl">
                    <span>{faqItem.question}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>{faqItem.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </section>

        {/* Pagination */}
        <div className="">
          <PaginationComp />
        </div>

        {/* Fallback message */}
        <p className="text-center">
          Can’t find the answer you are looking for?{" "}
          <Link href="/contact" className="font-semibold text-primary">
            Send us a message here
          </Link>
        </p>
      </Wrapper>
    </section>
  );
};
