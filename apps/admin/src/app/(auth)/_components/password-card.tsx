import type { ReactNode } from "react";

/** Same card look as the sign-in form. */
export function PasswordCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="container mx-auto flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-lg">
        <div>
          <h1 className="text-mid-blue text-center text-2xl font-extrabold">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-2 text-center text-base text-gray-600">
              {subtitle}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </div>
  );
}

export const inputClass =
  "w-full rounded-md border border-gray-300 px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-mid-blue aria-[invalid=true]:border-red-400";
export const submitClass =
  "flex h-12 w-full items-center justify-center gap-2 rounded-md bg-mid-blue text-base font-semibold text-white disabled:opacity-60";
