import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-screen flex-col gap-4 xl:grid xl:grid-cols-2">
      {/* Logo and Image Section */}
      <section className="relative h-[15rem] xl:h-screen">
        <Link className="absolute left-4 top-4 hover:animate-pulse" href={`/`}>
          <Image width={48} height={48} src={"/icons/logo.png"} alt="logo" />
        </Link>
        <Image
          width={742}
          height={1000}
          className="h-full w-full object-cover"
          src="/images/model.png"
          alt="model"
          priority
        />
      </section>

      {/* Content Section */}
      <section className="flex items-center justify-center">{children}</section>

      {/* Footer */}
      <p className="absolute bottom-4 right-4 hidden font-bold xl:block">
        &copy; {new Date().getFullYear()} TechStudio Academy
      </p>
    </main>
  );
}
