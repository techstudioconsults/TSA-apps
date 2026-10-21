export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "ul"; items: string[] };

export interface LegalSection {
  title?: string;
  blocks: LegalBlock[];
}

export const p = (text: string): LegalBlock => ({ type: "p", text });
export const h = (text: string): LegalBlock => ({ type: "h", text });
export const ul = (...items: string[]): LegalBlock => ({ type: "ul", items });
