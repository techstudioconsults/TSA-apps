import "@fontsource-variable/inter";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import type { Metadata, Viewport } from "next";

import "./globals.css";
import { QueryProvider } from "@/lib/react-query/query-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: { default: "TSA Learning", template: "%s · TSA Learning" },
  description:
    "Watch your Tech Studio Academy courses and track your progress.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1b33",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <QueryProvider>
          <Toaster position="top-center" richColors />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
