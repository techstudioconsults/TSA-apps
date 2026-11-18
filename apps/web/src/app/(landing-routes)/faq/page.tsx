import type { Metadata } from "next";
import { Hero } from "./_views/hero";
import { SectionOne } from "./_views/section-one";

export const metadata: Metadata = { title: "FAQ" };

const Faq = () => {
  return (
    <div>
      <Hero />
      <SectionOne />
    </div>
  );
};

export default Faq;
