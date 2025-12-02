import type { Metadata } from "next";

import "@workspace/ui/globals.css";
import { ReactQueryProvider } from "@/lib/react-query/query-provider";
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
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
