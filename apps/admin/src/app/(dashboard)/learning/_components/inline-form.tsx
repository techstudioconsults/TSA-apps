"use client";

import { Loader2 } from "lucide-react";
import { useState, type ReactNode } from "react";

import { apiError } from "./utils";

/** One-field form: a text input, optional extra controls, Save / Cancel. */
export function InlineForm({
  label,
  placeholder,
  initialValue = "",
  submitLabel,
  onSubmit,
  onCancel,
  extra,
  maxLength = 200,
}: {
  label: string;
  placeholder?: string;
  initialValue?: string;
  submitLabel: string;
  onSubmit: (value: string) => Promise<unknown>;
  onCancel: () => void;
  extra?: ReactNode;
  maxLength?: number;
}) {
  const [value, setValue] = useState(initialValue);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputId = `inline-${label.replace(/\W+/g, "-").toLowerCase()}`;

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      setError(`${label} can't be empty`);
      return;
    }
    setPending(true);
    setError(null);
    try {
      await onSubmit(trimmed);
    } catch (err) {
      setError(apiError(err, "Couldn't save. Try again."));
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-2" noValidate>
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <div className="flex flex-wrap items-center gap-2">
        <input
          id={inputId}
          autoFocus
          value={value}
          maxLength={maxLength}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Escape" && onCancel()}
          aria-invalid={Boolean(error)}
          className="border-input bg-background focus-visible:ring-ring h-10 min-w-[220px] flex-1 rounded-md border px-3 text-sm focus-visible:ring-2 focus-visible:outline-none"
        />
        {extra}
        <button
          type="submit"
          disabled={pending}
          className="bg-primary text-primary-foreground inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-semibold disabled:opacity-70"
        >
          {pending ? (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          ) : null}
          {submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="hover:bg-muted h-10 rounded-md px-3 text-sm font-medium"
        >
          Cancel
        </button>
      </div>
      {error ? (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </form>
  );
}
