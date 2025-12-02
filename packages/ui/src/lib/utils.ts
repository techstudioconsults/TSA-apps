import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes with conditional variants.
 */
const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(...inputs));
};

export { cn };
