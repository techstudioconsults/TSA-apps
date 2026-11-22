"use client";

import { useQuery } from "@tanstack/react-query";
import { Eye, EyeOff, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { tokenManager } from "@/lib/http/token-manager";
import { authService } from "@/services/auth/auth.service";
import { apiError } from "@/app/(dashboard)/learning/_components/utils";
import {
  inputClass,
  PasswordCard,
  submitClass,
} from "../_components/password-card";

const RULES = [
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { label: "A letter", test: (v: string) => /[A-Za-z]/.test(v) },
  { label: "A number", test: (v: string) => /\d/.test(v) },
];

function ResetPasswordView() {
  const params = useSearchParams();
  const router = useRouter();
  const [token] = useState(() => params.get("token"));
  useEffect(() => {
    if (token) window.history.replaceState(null, "", "/reset-password");
  }, [token]);

  const link = useQuery({
    queryKey: ["auth", "reset-link", token],
    queryFn: () => authService.verifyResetLink(token!),
    enabled: Boolean(token),
    retry: false,
    staleTime: Infinity,
  });

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!token || link.isError) {
    return (
      <PasswordCard
        title="This link has expired"
        subtitle="Reset links last 1 hour (7 days for new accounts) and work once."
      >
        <Link href="/forgot-password" className={submitClass}>
          Send me a new link
        </Link>
      </PasswordCard>
    );
  }
  if (!link.data) {
    return (
      <PasswordCard title="Checking your link…">
        <div className="flex justify-center" role="status">
          <Loader
            className="size-6 animate-spin text-gray-500"
            aria-label="Loading"
          />
        </div>
      </PasswordCard>
    );
  }

  const invite = link.data.purpose === "invite";
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const missing = RULES.filter((r) => !r.test(password)).map((r) =>
      r.label.toLowerCase(),
    );
    if (missing.length)
      return setError(`Password needs: ${missing.join(", ")}.`);
    if (new TextEncoder().encode(password).length > 72)
      return setError("Password must be at most 72 characters.");
    if (password !== confirm) return setError("The two passwords don't match.");
    setSaving(true);
    try {
      await authService.resetPassword(token, password);
      tokenManager.logout();
      router.replace("/login?reset=1");
    } catch (err) {
      setError(apiError(err));
      setSaving(false);
    }
  };

  return (
    <PasswordCard
      title={invite ? "Set your password" : "Choose a new password"}
      subtitle={
        <>
          Hi {link.data.firstName}, this is for{" "}
          <strong>{link.data.email}</strong>.
        </>
      }
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
            htmlFor="password"
            className="mb-1 block font-medium text-gray-700"
          >
            New password
          </label>
          <div className="relative">
            <input
              id="password"
              type={show ? "text" : "password"}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${inputClass} pr-11`}
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              aria-label={show ? "Hide password" : "Show password"}
              className="absolute top-1/2 right-2 flex size-9 -translate-y-1/2 items-center justify-center text-gray-500"
            >
              {show ? (
                <EyeOff className="size-5" aria-hidden />
              ) : (
                <Eye className="size-5" aria-hidden />
              )}
            </button>
          </div>
          <ul className="mt-2 space-y-1 text-sm" aria-label="Password rules">
            {RULES.map((rule) => {
              const met = rule.test(password);
              return (
                <li
                  key={rule.label}
                  className={met ? "text-emerald-700" : "text-gray-500"}
                >
                  {met ? "✓" : "○"} {rule.label}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <label
            htmlFor="confirm"
            className="mb-1 block font-medium text-gray-700"
          >
            Type it again
          </label>
          <input
            id="confirm"
            type={show ? "text" : "password"}
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className={inputClass}
          />
        </div>
        <button type="submit" disabled={saving} className={submitClass}>
          {saving ? (
            <Loader className="size-5 animate-spin" aria-hidden />
          ) : null}
          {invite ? "Set password" : "Save new password"}
        </button>
        <p className="text-center text-xs text-gray-500">
          Saving signs you out everywhere else.
        </p>
      </form>
    </PasswordCard>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordView />
    </Suspense>
  );
}
