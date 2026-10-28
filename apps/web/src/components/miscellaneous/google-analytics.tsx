import Script from "next/script";

/**
 * Google Analytics 4 (gtag.js) for techstudioacademy.com.
 *
 * - Stream: "techstudioacademy.com - GA4" (property 375221569).
 * - Loads in production builds only, and skips Vercel preview deployments,
 *   so local dev and PR previews never pollute the numbers.
 * - NEXT_PUBLIC_GA_ID overrides the default. Measurement IDs are public by
 *   design (they ship in every page's HTML), so the fallback is safe in code.
 * - Client-side route changes are counted by GA4 Enhanced Measurement
 *   ("page changes based on browser history events"), which is on for this stream.
 */
const DEFAULT_GA_ID = "G-GXRQ53RFKE";
const GA_ID = (process.env.NEXT_PUBLIC_GA_ID || DEFAULT_GA_ID).trim();

export function GoogleAnalytics() {
  if (process.env.NODE_ENV !== "production") return null;
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "preview") return null;
  // Never interpolate a malformed value into the inline script.
  if (!/^G-[A-Z0-9]{4,16}$/.test(GA_ID)) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
