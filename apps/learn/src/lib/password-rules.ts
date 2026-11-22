/** Mirrors the API's rules for new passwords (8–72 characters, a letter and a number). */
export const PASSWORD_RULES = [
  {
    id: "length",
    label: "At least 8 characters",
    test: (v: string) => v.length >= 8,
  },
  {
    id: "letter",
    label: "At least one letter",
    test: (v: string) => /[A-Za-z]/.test(v),
  },
  {
    id: "number",
    label: "At least one number",
    test: (v: string) => /\d/.test(v),
  },
] as const;

export const MAX_PASSWORD_BYTES = 72;

export function passwordProblems(value: string): string[] {
  const problems: string[] = PASSWORD_RULES.filter(
    (rule) => !rule.test(value),
  ).map((rule) => rule.label);
  if (new TextEncoder().encode(value).length > MAX_PASSWORD_BYTES)
    problems.push("At most 72 characters");
  return problems;
}
