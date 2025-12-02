"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const WhatsAppIcon: React.FC = () => {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if running in the browser
    const userAgent =
      typeof navigator === "undefined" ? "" : navigator.userAgent;
    setIsIOS(/iPad|iPhone|iPod/.test(userAgent));
  }, []);

  const whatsappLink = isIOS
    ? "https://api.whatsapp.com/send/?phone=2348113800161&text=Hello!%20TechStudio%20Academy,%20I%E2%80%99ll%20like%20to%20make%20an%20enquiry"
    : "https://api.whatsapp.com/send/?phone=2348113800161&text=Hello!%20TechStudio%20Academy,%20I%E2%80%99ll%20like%20to%20make%20an%20enquiry";

  return (
    <Link
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-[9999] lg:bottom-7 lg:right-7"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00e676] shadow-lg lg:h-16 lg:w-16 lg:text-[30px]">
        <Image
          width={32}
          height={32}
          src={"/icons/whatsapp.png"}
          alt={"whatsapp"}
        />
      </div>
    </Link>
  );
};
