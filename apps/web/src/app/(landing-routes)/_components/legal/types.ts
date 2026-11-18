export interface LegalLink {
  text: string;
  /** Renders as a link when set (mailto:, tel:, https://…). */
  href?: string;
}

export interface LegalContactRow {
  label: string;
  links: LegalLink[];
}

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "contact"; rows: LegalContactRow[] };

export interface LegalSection {
  title?: string;
  blocks: LegalBlock[];
}

export const p = (text: string): LegalBlock => ({ type: "p", text });
export const h = (text: string): LegalBlock => ({ type: "h", text });
export const ul = (...items: string[]): LegalBlock => ({ type: "ul", items });
export const contact = (...rows: LegalContactRow[]): LegalBlock => ({
  type: "contact",
  rows,
});
