"use client";

import { forwardRef, useState, type InputHTMLAttributes } from "react";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  error?: string;
};

export const PasswordField = forwardRef<HTMLInputElement, Props>(
  function PasswordField({ label, error, id, ...input }, ref) {
    const [visible, setVisible] = useState(false);
    const fieldId = id ?? input.name;
    return (
      <div className="flex flex-col gap-2">
        <label
          htmlFor={fieldId}
          className="text-[13px] leading-[18px] font-medium"
        >
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            id={fieldId}
            type={visible ? "text" : "password"}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${fieldId}-error` : undefined}
            className={`text-ink h-12 w-full rounded-md border bg-white pr-16 pl-3.5 text-[15px] ${error ? "border-bad" : "border-line-strong"}`}
            {...input}
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-pressed={visible}
            aria-label={visible ? "Hide password" : "Show password"}
            className="text-action absolute top-1 right-1 h-10 rounded-md px-3 text-[13px] font-semibold"
          >
            {visible ? "Hide" : "Show"}
          </button>
        </div>
        {error ? (
          <p id={`${fieldId}-error`} className="text-bad m-0 text-[13px]">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
