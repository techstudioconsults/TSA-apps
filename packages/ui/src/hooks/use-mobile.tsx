import * as React from "react";

// Treat viewports narrower than this as "mobile" for layout purposes.
// This is aligned with the design requirement that the sidebar
// becomes a drawer below ~1440px wide.
const MOBILE_BREAKPOINT = 1440;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>();

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
