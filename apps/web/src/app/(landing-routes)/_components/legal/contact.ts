import type { LegalContactRow } from "./types";

/** Mirrors the details on the /contact page. */
const CONTACT = {
  email: "info@techstudioacademy.com",
  phones: ["+234 805 6713 508", "+234 802 3679 765"],
  website: "www.techstudioacademy.com",
  address: "1 Ogunlesi Street, Off Awoyokun, Onipanu, Lagos, Nigeria.",
} as const;

export const contactRows = {
  email: (label = "Email"): LegalContactRow => ({
    label,
    links: [{ text: CONTACT.email, href: `mailto:${CONTACT.email}` }],
  }),
  phone: (label = "Phone"): LegalContactRow => ({
    label,
    links: CONTACT.phones.map((phone) => ({
      text: phone,
      href: `tel:${phone.replaceAll(" ", "")}`,
    })),
  }),
  website: (label = "Website"): LegalContactRow => ({
    label,
    links: [{ text: CONTACT.website, href: `https://${CONTACT.website}` }],
  }),
  address: (label = "Address"): LegalContactRow => ({
    label,
    links: [{ text: CONTACT.address }],
  }),
};
