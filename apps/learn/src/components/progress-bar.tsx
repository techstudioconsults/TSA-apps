import { clampPercent } from "@/lib/format";

interface ProgressBarProps {
  value: number;
  label: string;
  tone?: "light" | "dark";
  size?: "sm" | "md";
}

export function ProgressBar({
  value,
  label,
  tone = "light",
  size = "md",
}: ProgressBarProps) {
  const percent = clampPercent(value);
  const track = tone === "dark" ? "bg-navy-line" : "bg-action-soft";
  const fill = tone === "dark" ? "bg-action-on-navy" : "bg-action";
  const height = size === "sm" ? "h-1.5" : "h-2";
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`${height} ${track} w-full overflow-hidden rounded-full`}
    >
      <div
        className={`${height} ${fill} rounded-full transition-[width]`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
