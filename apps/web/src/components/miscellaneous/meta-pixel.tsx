"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Meta (Facebook) Pixel for techstudioacademy.com — dataset "yusuf rafiu dare's Pixel".
 *
 * Before this component the pixel only loaded on /courses/[slug]/success, so
 * course pages sent no PageView: Meta could not count landing page views,
 * and the "Website visitors 180D" retargeting audience could not fill.
 *
 * - Loads on every page and sends PageView on first load and on each
 *   client-side route change.
 * - Skips PageView on /courses/[slug]/success: that page sends exactly one
 *   Lead per real form submit (see lib/utils/meta-lead.ts), and the
 *   "Syllabi download" custom conversion matches that page's URL, so a
 *   PageView there would be counted as an extra download.
 * - fbq.disablePushState stops the pixel's own history-change PageView, which
 *   would double count route changes and fire on the success page.
 * - Production only, never on Vercel previews (same rule as GoogleAnalytics).
 */
export const META_PIXEL_ID = "1171106073347114";

const isSuccessPath = (path: string) => /\/success\/?$/.test(path);

export function MetaPixel() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // The first PageView is sent by the base snippet below.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!pathname || isSuccessPath(pathname)) return;
    window.fbq?.("track", "PageView");
  }, [pathname]);

  if (process.env.NODE_ENV !== "production") return null;
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "preview") return null;

  return (
    <Script id="meta-pixel-base" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq.disablePushState = true;
fbq('init', '${META_PIXEL_ID}');
if (!/\\/success\\/?$/.test(window.location.pathname)) fbq('track', 'PageView');`}
    </Script>
  );
}
