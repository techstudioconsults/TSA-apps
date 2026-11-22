"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Notice } from "@/components/notice";
import { PasswordField } from "@/components/password-field";
import { TextField } from "@/components/text-field";
import { errorMessage } from "@/lib/http/http";
import { tokenManager } from "@/lib/http/token-manager";
import { useLogin } from "@/services/auth/auth.queries";
import { STUDENT_ROLE } from "@/services/auth/auth.service";

const schema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Enter your email")
    .email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
});
type FormValues = z.infer<typeof schema>;

/** Only same-site paths, never "//evil.com" or "https://…" */
function safeRedirect(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const login = useLogin();
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: FormValues) => {
    setFormError(null);
    try {
      const result = await login.mutateAsync(values);
      if (result.user.role !== STUDENT_ROLE) {
        setFormError(
          "This site is for students. Staff should log in at dashboard.techstudioacademy.com.",
        );
        return;
      }
      tokenManager.setAuth(result.tokens.access);
      router.replace(safeRedirect(params.get("redirect")));
    } catch (error) {
      const message = errorMessage(
        error,
        "We couldn't log you in. Please try again.",
      );
      setFormError(
        message.toLowerCase().includes("invalid credentials")
          ? "That email and password don't match. Check them, or reset your password."
          : message,
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-6"
    >
      {params.get("reset") === "1" && !formError ? (
        <Notice tone="success" role="status">
          Your password is saved. Log in with it now.
        </Notice>
      ) : null}
      {formError ? (
        <Notice tone="danger" role="alert">
          {formError}
        </Notice>
      ) : null}
      <TextField
        label="Email"
        type="email"
        autoComplete="email"
        inputMode="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <div className="flex flex-col gap-2">
        <PasswordField
          label="Password"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />
        <Link
          href="/forgot-password"
          className="text-action self-end text-[13px] font-medium"
        >
          Forgot password?
        </Link>
      </div>
      <button
        type="submit"
        disabled={login.isPending}
        className="bg-action hover:bg-action-hover flex h-12 items-center justify-center gap-2 rounded-[10px] text-[15px] font-semibold text-white disabled:opacity-70"
      >
        {login.isPending ? (
          <Loader2 className="size-5 animate-spin" aria-hidden />
        ) : null}
        {login.isPending ? "Logging in" : "Log in"}
      </button>
    </form>
  );
}
