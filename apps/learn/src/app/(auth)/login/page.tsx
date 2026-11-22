import type { Metadata } from "next";
import { Suspense } from "react";
import { Check, Mail } from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Log in" };

const benefits = [
  "Resume every video where you left off",
  "Plays smoothly on mobile data",
  "Your progress is saved as you watch",
];

export default function LoginPage() {
  return (
    <div className="bg-surface-sunken flex min-h-screen flex-wrap">
      <section className="bg-navy flex flex-[1_1_420px] flex-col justify-between gap-8 px-6 py-10 text-[#f2f5fa] sm:px-14 sm:py-12">
        <BrandMark tone="dark" />
        <div className="flex max-w-[440px] flex-col gap-5">
          <h1 className="font-display m-0 text-[32px] leading-[40px] font-bold tracking-[-0.01em] sm:text-[40px] sm:leading-[48px]">
            Your course, on any screen.
          </h1>
          <p className="text-on-navy-muted m-0 text-[17px] leading-[26px]">
            Watch your lectures, pick up exactly where you stopped, and see how
            far you have come.
          </p>
          <ul className="m-0 flex list-none flex-col gap-3.5 p-0 text-[15px] leading-[22px]">
            {benefits.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check
                  className="text-action-on-navy size-5 shrink-0"
                  strokeWidth={1.5}
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-on-navy-muted m-0 text-[13px]">
          Tech Studio Academy · Lagos
        </p>
      </section>
      <section className="flex flex-[1_1_480px] items-center justify-center px-4 py-12">
        <div className="border-line flex w-full max-w-[420px] flex-col gap-6 rounded-2xl border bg-white px-6 py-10 shadow-[0_1px_2px_rgba(11,27,51,0.08)] sm:px-8">
          <div className="flex flex-col gap-2">
            <h2 className="font-display m-0 text-[28px] leading-[34px] font-bold">
              Log in
            </h2>
            <p className="text-ink-muted m-0 text-[15px] leading-[22px]">
              Use the email you registered with Tech Studio Academy.
            </p>
          </div>
          <Suspense>
            <LoginForm />
          </Suspense>
          <div className="bg-action-soft text-ink flex gap-3 rounded-[10px] px-4 py-3.5 text-[13px] leading-5">
            <Mail
              className="text-action size-5 shrink-0"
              strokeWidth={1.5}
              aria-hidden
            />
            <span>
              <strong className="font-semibold">New here?</strong> We emailed
              you a link to set your password when you enrolled. Can&apos;t find
              it? Use &quot;Forgot password?&quot; and we&apos;ll send a new
              one.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
