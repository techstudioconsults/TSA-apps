import { AlertTriangle, CheckCircle2, Clock, Info } from "lucide-react";
import type { ReactNode } from "react";

const tones = {
  info: {
    box: "bg-action-soft text-ink",
    icon: (
      <Info
        className="text-action size-5 shrink-0"
        strokeWidth={1.5}
        aria-hidden
      />
    ),
  },
  caution: {
    box: "bg-caution-soft text-caution",
    icon: (
      <Clock
        className="text-caution size-5 shrink-0"
        strokeWidth={1.5}
        aria-hidden
      />
    ),
  },
  danger: {
    box: "bg-bad-soft text-bad",
    icon: (
      <AlertTriangle
        className="text-bad size-5 shrink-0"
        strokeWidth={1.5}
        aria-hidden
      />
    ),
  },
  success: {
    box: "bg-ok-soft text-ok",
    icon: (
      <CheckCircle2
        className="text-ok size-5 shrink-0"
        strokeWidth={1.5}
        aria-hidden
      />
    ),
  },
};

export function Notice({
  tone = "info",
  title,
  children,
  role,
}: {
  tone?: keyof typeof tones;
  title?: ReactNode;
  children?: ReactNode;
  role?: "alert" | "status";
}) {
  return (
    <div
      role={role}
      className={`flex items-start gap-3 rounded-[10px] px-4 py-3 text-sm leading-5 ${tones[tone].box}`}
    >
      {tones[tone].icon}
      <div>
        {title ? <strong className="font-semibold">{title}</strong> : null}{" "}
        {children}
      </div>
    </div>
  );
}
