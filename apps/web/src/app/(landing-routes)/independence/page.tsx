import type { Metadata } from "next";
import Link from "next/link";
import { Wrapper } from "@workspace/ui/lib";
import { INDEPENDENCE_OFFER } from "@/lib/campaigns/independence";
import { OfferStatus } from "./_views/offer-status";

const {
  discount,
  years,
  datesLabel,
  deadlineLabel,
  thresholdLabel,
  highBonus,
  lowBonus,
} = INDEPENDENCE_OFFER;

export const metadata: Metadata = {
  title: `Independence Day Offer — up to ${discount} off all courses | Techstudio Academy`,
  description: `Nigeria @ ${years}: register for any Tech Studio Academy course between ${datesLabel} and get up to ${discount} off your tuition. Terms apply.`,
  openGraph: {
    title: `Nigeria @ ${years} — up to ${discount} off all Tech Studio Academy courses`,
    description: `Celebrate Independence with up to ${discount} off any course. Register by ${deadlineLabel}. Terms apply.`,
  },
};

const TIERS = [
  { tuition: `${thresholdLabel} and above`, bonus: highBonus },
  { tuition: `below ${thresholdLabel}`, bonus: lowBonus },
];

const TERMS = [
  `The Independence Month offer is open to registrations made between 1 October 2026 and ${deadlineLabel}, 11:59 pm (Lagos time).`,
  `The bonus is up to ${discount}. Classes with tuition of ${thresholdLabel} and above get a ${highBonus} bonus; classes with tuition below ${thresholdLabel} get a ${lowBonus} bonus.`,
  "The bonus is based on the tuition of the specific class you register for — the course and its format (weekday, weekend or online) — as listed by Tech Studio Academy at the time you register.",
  "The bonus is deducted from your tuition. It cannot be exchanged for cash, refunded or transferred to another person.",
  "One bonus per student, per course registration.",
  "The bonus cannot be combined with any other discount, scholarship or promotion unless Tech Studio Academy confirms otherwise in writing.",
  "The offer applies to new registrations only. Students who registered or paid before 1 October 2026 are not eligible.",
  "Instalment payment is still available. The bonus is applied to your total tuition, and our admissions team will confirm your final fee and payment plan with you.",
  "Tech Studio Academy may amend or withdraw this offer at any time. Tech Studio Academy's decision on eligibility is final.",
];

const primaryCta =
  "inline-flex h-12 items-center justify-center rounded-[5px] bg-mid-blue px-7 font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
const secondaryCta =
  "inline-flex h-12 items-center justify-center rounded-[5px] border border-white/60 px-7 font-semibold text-white transition-colors hover:bg-white/10";

/** Green–white–green stripe, echoing the flag. */
const FlagStripe = ({ className = "" }: { className?: string }) => (
  <div
    aria-hidden
    className={`flex h-2 w-24 overflow-hidden rounded-full ${className}`}
  >
    <span className="w-1/3 bg-[#008751]" />
    <span className="w-1/3 bg-white" />
    <span className="w-1/3 bg-[#008751]" />
  </div>
);

const STEPS = [
  {
    title: "Choose your course",
    body: "Pick the programme and class format that fit where you want your career to go. Every course qualifies.",
    link: { label: "Explore courses", href: "/explore" },
  },
  {
    title: `Register by ${deadlineLabel}`,
    body: "Fill in the short registration form on this website before the offer closes.",
    link: { label: "Register now", href: "/register" },
  },
  {
    title: `Get up to ${discount} off`,
    body: `${highBonus} off classes with tuition of ${thresholdLabel} and above, ${lowBonus} off classes below that. Our admissions team will confirm your final fee and payment options with you.`,
  },
];

const DETAILS = [
  {
    label: "Bonus",
    value: `${highBonus} off (tuition ${thresholdLabel} and above) · ${lowBonus} off (tuition below ${thresholdLabel})`,
  },
  { label: "Courses", value: "All Tech Studio Academy courses" },
  { label: "Offer window", value: datesLabel },
  { label: "Deadline", value: `${deadlineLabel}, 11:59 pm (Lagos time)` },
  {
    label: "How to claim",
    value: "Register on this website within the offer window",
  },
];

const FAQS = [
  {
    q: "Which courses does the bonus apply to?",
    a: "All of them. Every Tech Studio Academy course qualifies, in every format (weekday, weekend and online).",
  },
  {
    q: "How much will I get off?",
    a: `It depends on the tuition of the class you choose. If it is ${thresholdLabel} or more, you get ${highBonus} off. If it is below ${thresholdLabel}, you get ${lowBonus} off. Because tuition differs by format, the same course can fall in different tiers — e.g. a weekday class and an online class of the same course.`,
  },
  {
    q: "When does the offer end?",
    a: `Registrations must be made by ${deadlineLabel}, 11:59 pm Lagos time. After that the standard fees apply.`,
  },
  {
    q: "Can I still pay in instalments?",
    a: "Yes. Instalment options are still available — our admissions team will walk you through them when they reach out.",
  },
  {
    q: "I have another question. Who can I talk to?",
    a: "Reach us through the Contact page or the WhatsApp button on this page and we'll help you choose the right course.",
  },
];

const IndependencePage = () => {
  return (
    <div>
      {/* Hero */}
      <header className="w-full bg-[url('/images/HeroBg.webp')] bg-cover bg-center pt-[120px] text-white">
        <Wrapper className="!mt-0">
          <section className="mx-auto flex max-w-[860px] flex-col items-center py-[60px] text-center lg:py-[110px]">
            <FlagStripe />
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Nigeria @ {years} · Independence Month
            </p>
            <h1 className="mt-4 text-[34px] font-bold leading-tight text-white lg:text-[52px]">
              {years} years of independence.
              <br />
              <span className="text-secondary">Up to {discount} off</span> your
              tech career.
            </h1>
            <p className="mt-6 max-w-[680px] text-base text-white/85 lg:text-lg">
              To celebrate Nigeria&apos;s {years}th Independence Day, Tech
              Studio Academy is giving up to {discount} off every course.
              Register between {datesLabel} to claim it.{" "}
              <a
                href="#terms"
                className="whitespace-nowrap text-white underline underline-offset-2"
              >
                Terms apply
              </a>
              .
            </p>
            <OfferStatus className="mt-8" />
            <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
              <Link href="/register" className={primaryCta}>
                Register now
              </Link>
              <Link href="/explore" className={secondaryCta}>
                Explore courses
              </Link>
            </div>
          </section>
        </Wrapper>
      </header>

      {/* How it works */}
      <section className="bg-white py-[72px] lg:py-[100px]">
        <Wrapper className="!mt-0">
          <div className="mx-auto max-w-[680px] text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mid-blue">
              How to claim it
            </p>
            <h2 className="mt-3 text-[28px] font-bold text-primary lg:text-[36px]">
              Three steps to your Independence bonus
            </h2>
          </div>
          {/* How much you get */}
          <div className="mx-auto mt-10 grid max-w-[680px] gap-4 sm:grid-cols-2">
            {TIERS.map((tier) => (
              <div
                key={tier.tuition}
                className="rounded-xl border border-mid-blue/30 bg-white p-6 text-center"
              >
                <p className="text-sm text-mid-grey-III">
                  Class tuition {tier.tuition}
                </p>
                <p className="mt-2 text-[32px] font-bold leading-none text-mid-blue">
                  {tier.bonus} off
                </p>
              </div>
            ))}
          </div>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <li
                key={step.title}
                className="flex flex-col rounded-xl border border-border bg-low-blue/40 p-6"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-mid-blue font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-lg font-bold text-primary">
                  {step.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-mid-grey-III">
                  {step.body}
                </p>
                {step.link ? (
                  <Link
                    href={step.link.href}
                    className="mt-4 text-sm font-semibold text-mid-blue underline-offset-4 hover:underline"
                  >
                    {step.link.label} →
                  </Link>
                ) : null}
              </li>
            ))}
          </ol>
        </Wrapper>
      </section>

      {/* Offer details + why */}
      <section className="bg-low-blue py-[72px] lg:py-[100px]">
        <Wrapper className="!mt-0">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mid-blue">
                Why we&apos;re celebrating
              </p>
              <h2 className="mt-3 text-[28px] font-bold text-primary lg:text-[36px]">
                Independence is built one skill at a time
              </h2>
              <p className="mt-5 leading-relaxed text-mid-grey-III">
                For {years} years Nigerians have been building — businesses,
                careers and a future of their own. Since 2017, Tech Studio
                Academy has trained more than 1,000 students in Lagos to do
                exactly that with tech skills.
              </p>
              <p className="mt-4 leading-relaxed text-mid-grey-III">
                This October, we&apos;re marking {years} years of independence
                by putting up to {discount} back in your pocket when you start
                your journey with us.
              </p>
            </div>
            <dl className="overflow-hidden rounded-xl border border-border bg-white">
              {DETAILS.map((row) => (
                <div
                  key={row.label}
                  className="flex flex-col gap-1 border-b border-border px-6 py-4 last:border-b-0 sm:flex-row sm:gap-6"
                >
                  <dt className="w-36 shrink-0 text-sm font-semibold text-primary">
                    {row.label}
                  </dt>
                  <dd className="text-sm text-mid-grey-III">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Wrapper>
      </section>

      {/* FAQ */}
      <section className="bg-white py-[72px] lg:py-[100px]">
        <Wrapper className="!mt-0">
          <h2 className="text-center text-[28px] font-bold text-primary lg:text-[36px]">
            Questions about the offer
          </h2>
          <div className="mx-auto mt-10 flex max-w-[780px] flex-col gap-3">
            {FAQS.map((item) => (
              <details
                key={item.q}
                className="group rounded-lg border border-border bg-white px-5 py-4 open:bg-low-blue/40"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-primary [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    aria-hidden
                    className="text-xl leading-none text-mid-blue transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-mid-grey-III">
                  {item.a}{" "}
                  {item.q.startsWith("I have another") ? (
                    <Link
                      href="/contact"
                      className="font-semibold text-mid-blue underline underline-offset-2"
                    >
                      Contact us
                    </Link>
                  ) : null}
                </p>
              </details>
            ))}
          </div>
        </Wrapper>
      </section>

      {/* Terms & Conditions */}
      <section
        id="terms"
        className="scroll-mt-[120px] border-t border-border bg-white py-[64px] lg:py-[88px]"
      >
        <Wrapper className="!mt-0">
          <div className="mx-auto max-w-[780px]">
            <h2 className="text-[24px] font-bold text-primary lg:text-[30px]">
              Terms &amp; Conditions
            </h2>
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-mid-grey-III marker:font-semibold marker:text-primary">
              {TERMS.map((term) => (
                <li key={term} className="pl-1">
                  {term}
                </li>
              ))}
            </ol>
          </div>
        </Wrapper>
      </section>

      {/* Final CTA */}
      <section className="bg-primary py-[64px] text-white lg:py-[88px]">
        <Wrapper className="!mt-0">
          <div className="mx-auto flex max-w-[720px] flex-col items-center text-center">
            <FlagStripe />
            <h2 className="mt-6 text-[28px] font-bold text-white lg:text-[36px]">
              Start your course with up to {discount} off
            </h2>
            <p className="mt-4 text-white/80">
              The offer closes on {deadlineLabel}. Register now and our
              admissions team will take it from there.
            </p>
            <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
              <Link href="/register" className={primaryCta}>
                Register now
              </Link>
              <Link href="/explore" className={secondaryCta}>
                Explore courses
              </Link>
            </div>
          </div>
        </Wrapper>
      </section>
    </div>
  );
};

export default IndependencePage;
