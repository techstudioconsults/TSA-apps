"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { Notice } from "@/components/notice";
import { LoadingBlock } from "@/components/page-state";
import { PasswordField } from "@/components/password-field";
import { Card } from "@/components/simple-shell";
import { errorMessage } from "@/lib/http/http";
import { tokenManager } from "@/lib/http/token-manager";
import { PASSWORD_RULES, passwordProblems } from "@/lib/password-rules";
import { useResetPassword, useVerifyLink } from "@/services/auth/auth.queries";
import { ForgotPasswordForm } from "../forgot-password/forgot-password-form";

const schema = z
  .object({
    password: z.string().superRefine((value, ctx) => {
      const problems = passwordProblems(value);
      if (problems.length)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Password needs: ${problems.join(", ").toLowerCase()}`,
        });
    }),
    confirm: z.string().min(1, "Type the password again"),
  })
  .refine((values) => values.password === values.confirm, {
    path: ["confirm"],
    message: "The two passwords don't match",
  });
type FormValues = z.infer<typeof schema>;

export function ResetPasswordView() {
  const params = useSearchParams();
  const router = useRouter();
  // Read once, then drop the token from the address bar so it isn't left in history
  const [token] = useState(() => params.get("token"));
  useEffect(() => {
    if (token) window.history.replaceState(null, "", "/reset-password");
  }, [token]);

  const link = useVerifyLink(token);
  const reset = useResetPassword();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { password: "", confirm: "" },
  });
  const password = useWatch({ control, name: "password" });

  if (!token || link.isError) {
    return (
      <div className="flex w-full max-w-[440px] flex-col gap-4">
        <Notice
          tone="caution"
          role="alert"
          title="This link has expired or was already used."
        >
          Links last 7 days for new accounts and 1 hour for password resets.
          Enter your email and we&apos;ll send a new one.
        </Notice>
        <ForgotPasswordForm />
      </div>
    );
  }

  if (link.isLoading || !link.data) {
    return (
      <div className="w-full max-w-[440px]">
        <LoadingBlock label="Checking your link" lines={2} />
      </div>
    );
  }

  const invite = link.data.purpose === "invite";

  const onSubmit = async (values: FormValues) => {
    await reset.mutateAsync({ token, password: values.password });
    tokenManager.logout();
    router.replace("/login?reset=1");
  };

  return (
    <Card className="w-full max-w-[440px]">
      <div className="flex flex-col gap-2">
        {invite ? (
          <span className="text-ink-muted text-[13px] font-medium">
            Link from your welcome email
          </span>
        ) : null}
        <h1 className="font-display m-0 text-[28px] leading-[34px] font-bold">
          {invite ? "Set your password" : "Choose a new password"}
        </h1>
        <p className="text-ink-muted m-0 text-[15px] leading-[22px]">
          Hi {link.data.firstName}, choose a password for{" "}
          <strong className="text-ink font-semibold">{link.data.email}</strong>.
          You&apos;ll use it to log in from now on.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-5"
      >
        {reset.isError ? (
          <Notice tone="danger" role="alert">
            {errorMessage(reset.error)}
          </Notice>
        ) : null}
        <PasswordField
          label="New password"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />
        <ul
          aria-label="Password rules"
          className="m-0 flex list-none flex-col gap-2 p-0 text-[13px] leading-[18px]"
        >
          {PASSWORD_RULES.map((rule) => {
            const met = rule.test(password ?? "");
            return (
              <li
                key={rule.id}
                className={`flex items-center gap-2.5 ${met ? "text-ok" : "text-ink-muted"}`}
              >
                {met ? (
                  <CheckCircle2
                    className="size-[18px]"
                    strokeWidth={2}
                    aria-hidden
                  />
                ) : (
                  <Circle className="size-[18px]" strokeWidth={2} aria-hidden />
                )}
                <span>
                  {rule.label}{" "}
                  <span className="font-semibold">
                    {met ? "done" : "needed"}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
        <PasswordField
          label="Type it again"
          autoComplete="new-password"
          error={errors.confirm?.message}
          {...register("confirm")}
        />
        <button
          type="submit"
          disabled={reset.isPending}
          className="bg-action hover:bg-action-hover flex h-12 items-center justify-center gap-2 rounded-[10px] text-[15px] font-semibold text-white disabled:opacity-70"
        >
          {reset.isPending ? (
            <Loader2 className="size-5 animate-spin" aria-hidden />
          ) : null}
          {invite ? "Set password" : "Save new password"}
        </button>
        <p className="text-ink-muted m-0 text-xs leading-4">
          This link works once. Saving a password signs you out on any other
          device.
        </p>
      </form>
    </Card>
  );
}
