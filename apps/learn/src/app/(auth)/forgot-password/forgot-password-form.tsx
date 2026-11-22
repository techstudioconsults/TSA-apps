"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Notice } from "@/components/notice";
import { Card } from "@/components/simple-shell";
import { TextField } from "@/components/text-field";
import { errorMessage } from "@/lib/http/http";
import { useForgotPassword } from "@/services/auth/auth.queries";

const schema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Enter your email")
    .email("Enter a valid email address"),
});
type FormValues = z.infer<typeof schema>;

export function ForgotPasswordForm({
  defaultEmail = "",
}: {
  defaultEmail?: string;
}) {
  const request = useForgotPassword();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: defaultEmail },
  });

  if (request.isSuccess) {
    return (
      <Card className="w-full max-w-[440px]">
        <h1 className="font-display m-0 text-[28px] leading-[34px] font-bold">
          Check your email
        </h1>
        <p className="text-ink-muted m-0 text-[15px] leading-[22px]">
          If an account exists for{" "}
          <strong className="text-ink font-semibold">
            {getValues("email")}
          </strong>
          , a link to reset your password is on its way. It works once and
          expires in 1 hour. Check your spam folder too.
        </p>
        <Link href="/login" className="text-action text-[15px] font-semibold">
          Back to log in
        </Link>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-[440px]">
      <div className="flex flex-col gap-2">
        <h1 className="font-display m-0 text-[28px] leading-[34px] font-bold">
          Reset your password
        </h1>
        <p className="text-ink-muted m-0 text-[15px] leading-[22px]">
          Enter the email you registered with. We&apos;ll send you a link to
          choose a new password.
        </p>
      </div>
      <form
        onSubmit={handleSubmit((values) => request.mutate(values.email))}
        noValidate
        className="flex flex-col gap-5"
      >
        {request.isError ? (
          <Notice tone="danger" role="alert">
            {errorMessage(request.error)}
          </Notice>
        ) : null}
        <TextField
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <button
          type="submit"
          disabled={request.isPending}
          className="bg-action hover:bg-action-hover flex h-12 items-center justify-center gap-2 rounded-[10px] text-[15px] font-semibold text-white disabled:opacity-70"
        >
          {request.isPending ? (
            <Loader2 className="size-5 animate-spin" aria-hidden />
          ) : null}
          Send me a link
        </button>
      </form>
      <Link href="/login" className="text-action text-[15px] font-medium">
        Back to log in
      </Link>
    </Card>
  );
}
