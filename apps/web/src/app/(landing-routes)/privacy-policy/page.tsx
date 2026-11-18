import type { Metadata } from "next";
import { LegalDocument } from "../_components/legal/legal-document";
import { LegalHero } from "../_components/legal/legal-hero";
import { PRIVACY_LAST_UPDATED, PRIVACY_SECTIONS } from "./_data";

export const metadata: Metadata = {
  title: "Privacy Policy | Techstudio Academy",
  description:
    "How Tech Studio Consults collects, uses, stores, discloses and protects your personal information.",
};

const PrivacyPolicy = () => {
  return (
    <div>
      <LegalHero title="Privacy Policy" lastUpdated={PRIVACY_LAST_UPDATED} />
      <LegalDocument sections={PRIVACY_SECTIONS} />
    </div>
  );
};

export default PrivacyPolicy;
