"use client";

import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

interface DimensionProperties {
  scrollY: number;
  totalHeight: number;
  winHeight: number;
}

// function useIsMobile() {
//   const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

//   useEffect(() => {
//     const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
//     const onChange = () => {
//       setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
//     };
//     mql.addEventListener('change', onChange);
//     setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
//     return () => mql.removeEventListener('change', onChange);
//   }, []);

//   return !!isMobile;
// }

const useWindowHeight = () => {
  const [dimensions, setDimensions] = useState<DimensionProperties>({
    scrollY: 0,
    totalHeight: 0,
    winHeight: 0,
  });

  useEffect(() => {
    setDimensions({
      scrollY: window.scrollY,
      totalHeight: document.documentElement.scrollHeight,
      winHeight: window.innerHeight,
    });
    const handleScroll = () => {
      setDimensions({
        scrollY: window.scrollY,
        totalHeight: document.documentElement.scrollHeight,
        winHeight: window.innerHeight,
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // console.log(scrollY);

  return dimensions;
};

const useWindowWidth = () => {
  const [winWidth, setWinWidth] = useState(0);
  useEffect(() => {
    const timeout: ReturnType<typeof setTimeout> = setTimeout(() => {
      setWinWidth(window.innerWidth);
    }, 300);

    const handleResize = () => {
      setWinWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, []);

  return { winWidth };
};

export { useWindowHeight, useWindowWidth };
