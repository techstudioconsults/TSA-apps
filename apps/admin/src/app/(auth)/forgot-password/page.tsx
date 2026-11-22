"use client";

import { Loader } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { authService } from "@/services/auth/auth.service";
import { apiError } from "@/app/(dashboard)/learning/_components/utils";
import {
  inputClass,
  PasswordCard,
  submitClass,
} from "../_components/password-card";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Enter your work email address.");
      return;
    }
    setState("sending");
    try {
      await authService.forgotPassword(email);
      setState("sent");
    } catch (err) {
      setError(apiError(err));
      setState("idle");
    }
  };

  if (state === "sent") {
    return (
      <PasswordCard title="Check your email">
        <p className="text-center text-gray-700">
          If <strong>{email.trim()}</strong> has a staff account, a link to
          reset the password is on its way. It works once and expires in 1 hour.
        </p>
        <Link
          href="/login"
          className="block text-center font-medium text-blue-600 hover:underline"
        >
          Back to sign in
        </Link>
      </PasswordCard>
    );
  }

  return (
    <PasswordCard
      title="Reset your password"
      subtitle="We'll email you a link to choose a new one."
    >
      <form onSubmit={submit} noValidate className="space-y-5">
        {error ? (
          <div
            role="alert"
            className="rounded border border-red-200 bg-red-50 px-4 py-2 text-center text-red-700"
          >
            {error}
          </div>
        ) : null}
        <div>
          <label
            htmlFor="email"
            className="mb-1 block font-medium text-gray-700"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(error)}
            className={inputClass}
          />
        </div>
        <button
          type="submit"
          disabled={state === "sending"}
          className={submitClass}
        >
          {state === "sending" ? (
            <Loader className="size-5 animate-spin" aria-hidden />
          ) : null}
          Send reset link
        </button>
        <Link
          href="/login"
          className="block text-center text-sm font-medium text-blue-600 hover:underline"
        >
          Back to sign in
        </Link>
      </form>
    </PasswordCard>
  );
}
