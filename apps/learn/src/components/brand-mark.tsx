import Link from "next/link";

/**
 * Tech Studio Academy logo + "Learning". The lockup files are 308×120
 * (2× for a 40px-high header). `tone` is the background it sits on.
 */
export function BrandMark({
  href = "/",
  tone = "light",
}: {
  href?: string;
  tone?: "light" | "dark";
}) {
  const onDark = tone === "dark";
  return (
    <Link
      href={href}
      className="flex min-h-11 items-center gap-3 rounded-md no-underline"
      aria-label="Tech Studio Academy Learning, home"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized static PNG; next/image adds nothing here */}
      <img
        src={onDark ? "/brand/tsa-logo-light.png" : "/brand/tsa-logo-dark.png"}
        alt=""
        width={103}
        height={40}
        className="h-10 w-auto"
      />
      <span
        aria-hidden="true"
        className={`h-7 w-px ${onDark ? "bg-navy-line" : "bg-line"}`}
      />
      <span
        aria-hidden="true"
        className={`font-display text-[17px] font-bold ${onDark ? "text-white" : "text-ink"}`}
      >
        Learning
      </span>
    </Link>
  );
}
