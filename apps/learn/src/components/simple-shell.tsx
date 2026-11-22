import { BrandMark } from "./brand-mark";

/** Header-only layout for the password pages. */
export function SimpleShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-surface-sunken flex min-h-screen flex-col">
      <header className="border-line flex h-16 items-center border-b bg-white px-6">
        <BrandMark href="/login" />
      </header>
      <main className="flex flex-1 flex-wrap items-start justify-center gap-8 px-4 py-14">
        {children}
      </main>
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border-line flex flex-col gap-5 rounded-2xl border bg-white px-6 py-8 shadow-[0_1px_2px_rgba(11,27,51,0.08)] sm:px-8 ${className}`}
    >
      {children}
    </div>
  );
}
