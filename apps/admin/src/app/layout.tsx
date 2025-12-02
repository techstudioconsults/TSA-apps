import type { Metadata } from "next";
import Providers from "./providers";

import "@workspace/ui/globals.css";
export const metadata: Metadata = {
  title: "tsa-repo Admin",
  description: "Admin dashboard for tsa-repo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
