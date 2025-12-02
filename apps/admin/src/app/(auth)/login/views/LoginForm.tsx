/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader } from "lucide-react";
import { CustomButton } from "@workspace/ui/lib";
import { useLoginMutation } from "@/lib/services/auth/auth.mutations";
import { signInFormData, signInSchema } from "@/schemas";
import { tokenManager } from "@/lib/http/token-manager";

const LoginForm: FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  const { mutateAsync: loginMutate, isPending } = useLoginMutation();
  const isSubmitting = isPending;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<signInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  useEffect(() => {
    // Redirect if already authenticated
    if (tokenManager.isAuthenticated()) {
      router.replace("/");
    }
  }, [router]);

  const onSubmit = async (data: signInFormData) => {
    setFormError(null);
    try {
      const result = await loginMutate({
        email: data.email,
        password: data.password,
      });

      if (result.success && result.tokens) {
        tokenManager.setAuth(
          result.tokens.accessToken,
          result.tokens.refreshToken,
        );
        reset();
        router.push("/");
      } else {
        setFormError(result.error ?? "Invalid email or password");
      }
    } catch (error: unknown) {
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof (error as any).message === "string"
      ) {
        errorMessage = (error as any).message;
      }
      setFormError(errorMessage);
    }
  };

  return (
    <div className="container mx-auto flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="animate-fade-in w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        <div>
          <h2 className="text-center text-2xl font-extrabold text-mid-blue">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-base text-gray-600">
            Please sign in to your account
          </p>
        </div>

        {formError && (
          <div className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-2 text-center text-red-700">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1 block font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className={`w-full rounded-md border px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-mid-blue ${
                errors.email
                  ? "border-red-400 focus:ring-red-300"
                  : "border-gray-300"
              }`}
              disabled={isSubmitting}
              autoComplete="email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-1 block font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
                className={`w-full rounded-md border px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-mid-blue ${
                  errors.password
                    ? "border-red-400 focus:ring-red-300"
                    : "border-gray-300"
                }`}
                disabled={isSubmitting}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-mid-blue focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={0}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span className="cursor-not-allowed font-medium text-blue-600 opacity-70 hover:underline">
                Forgot your password?
              </span>
            </div>
          </div>

          <div className="pt-2">
            <CustomButton
              variant="primary"
              type="submit"
              className="w-full"
              size="xl"
              isDisabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader className="mr-2 h-5 w-5 animate-spin" />
              ) : null}
              {isSubmitting ? "Signing in..." : "Sign in"}
            </CustomButton>
          </div>
        </form>

        <div className="flex items-center gap-2 pt-4">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">or</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <div className="text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <span className="cursor-pointer font-medium text-mid-blue opacity-80 hover:underline">
            Contact admin
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

// Add fade-in animation to your global CSS or Tailwind config:
// .animate-fade-in { animation: fadeIn 0.5s ease; }
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
