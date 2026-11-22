import { cn } from "@workspace/ui/lib/utils";

const tones = {
  neutral: "bg-slate-100 text-slate-700",
  info: "bg-blue-50 text-blue-800",
  success: "bg-emerald-50 text-emerald-800",
  warning: "bg-amber-50 text-amber-800",
  danger: "bg-red-50 text-red-800",
} as const;

export type PillTone = keyof typeof tones;

export function StatusPill({
  tone,
  children,
  className,
}: {
  tone: PillTone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
