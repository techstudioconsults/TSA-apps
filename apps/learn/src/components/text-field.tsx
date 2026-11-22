import { forwardRef, type InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const TextField = forwardRef<HTMLInputElement, Props>(function TextField(
  { label, error, id, ...input },
  ref,
) {
  const fieldId = id ?? input.name;
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={fieldId}
        className="text-[13px] leading-[18px] font-medium"
      >
        {label}
      </label>
      <input
        ref={ref}
        id={fieldId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className={`text-ink h-12 rounded-md border bg-white px-3.5 text-[15px] ${error ? "border-bad" : "border-line-strong"}`}
        {...input}
      />
      {error ? (
        <p id={`${fieldId}-error`} className="text-bad m-0 text-[13px]">
          {error}
        </p>
      ) : null}
    </div>
  );
});
