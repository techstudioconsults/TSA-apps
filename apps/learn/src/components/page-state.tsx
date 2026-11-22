import { RefreshCw } from "lucide-react";

export function LoadingBlock({
  label = "Loading",
  lines = 3,
}: {
  label?: string;
  lines?: number;
}) {
  return (
    <div role="status" aria-live="polite" className="flex flex-col gap-3">
      <span className="sr-only">{label}</span>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="bg-line-soft h-20 animate-pulse rounded-2xl"
        />
      ))}
    </div>
  );
}

export function ErrorBlock({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div
      role="alert"
      className="border-line flex flex-col items-start gap-3 rounded-2xl border bg-white p-6"
    >
      <p className="text-ink m-0 text-[15px] leading-6">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="border-line text-ink inline-flex h-11 items-center gap-2 rounded-[10px] border bg-white px-4 text-[15px] font-semibold"
        >
          <RefreshCw className="size-4" strokeWidth={1.5} aria-hidden /> Try
          again
        </button>
      ) : null}
    </div>
  );
}
