import type { Metadata } from "next";
import React from "react";

// The register page is a client component, so its title is set here.
export const metadata: Metadata = { title: "Register" };

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
