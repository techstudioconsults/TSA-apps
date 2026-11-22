import type { Metadata } from "next";

import { SimpleShell } from "@/components/simple-shell";
import { ForgotPasswordForm } from "./forgot-password-form";

export const metadata: Metadata = { title: "Reset your password" };

export default function ForgotPasswordPage() {
  return (
    <SimpleShell>
      <ForgotPasswordForm />
    </SimpleShell>
  );
}
