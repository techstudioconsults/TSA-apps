import { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import React, { Suspense } from "react";
import { Toaster } from "@workspace/ui/components";
import { WhatsAppIcon } from "../components/miscellaneous/whatsapp";
import { SourceTracker } from "../lib/utils/source-tracker";
import { cn } from "@workspace/ui/lib";

import "@workspace/ui/globals.css";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Techstudio Academy",
  description: "TSA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(openSans.className)}>
        <Toaster />
        <WhatsAppIcon />
        <Suspense fallback={null}>
          <SourceTracker />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
