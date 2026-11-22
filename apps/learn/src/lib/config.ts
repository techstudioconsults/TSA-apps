/** Public runtime settings (NEXT_PUBLIC_* are inlined at build time). */
export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
  supportUrl:
    process.env.NEXT_PUBLIC_SUPPORT_URL ??
    "https://techstudioacademy.com/contact",
} as const;
