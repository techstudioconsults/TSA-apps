import type { Metadata } from "next";
import { Suspense } from "react";

import { LoadingBlock } from "@/components/page-state";
import { SimpleShell } from "@/components/simple-shell";
import { ResetPasswordView } from "./reset-password-view";

export const metadata: Metadata = { title: "Set your password" };

export default function ResetPasswordPage() {
  return (
    <SimpleShell>
      <Suspense
        fallback={
          <div className="w-full max-w-[440px]">
            <LoadingBlock lines={2} />
          </div>
        }
      >
        <ResetPasswordView />
      </Suspense>
    </SimpleShell>
  );
}
