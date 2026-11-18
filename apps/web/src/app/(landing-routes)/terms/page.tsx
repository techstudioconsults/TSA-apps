import type { Metadata } from "next";
import { LegalDocument } from "../_components/legal/legal-document";
import { LegalHero } from "../_components/legal/legal-hero";
import { TERMS_LAST_UPDATED, TERMS_SECTIONS } from "./_data";

export const metadata: Metadata = {
  title: "Terms of Service | Techstudio Academy",
  description:
    "The terms that govern your access to and use of the Tech Studio Consults website, services and content.",
};

const Terms = () => {
  return (
    <div>
      <LegalHero title="Terms of Service" lastUpdated={TERMS_LAST_UPDATED} />
      <LegalDocument sections={TERMS_SECTIONS} />
    </div>
  );
};

export default Terms;
