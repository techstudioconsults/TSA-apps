"use client";

import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type LogoProperties = {
  logo?: string;
  width?: number;
  height?: number;
  className?: string;
};

export const Logo: FC<LogoProperties> = ({
  logo,
  width = 120,
  height = 37,
  className,
}) => {
  return (
    <Link href="/" data-testid="logo" className="">
      {logo ? (
        <Image
          priority
          src={logo}
          alt="Logo"
          width={width}
          height={height}
          className={className}
          style={{ height: "auto", width: "auto" }}
        />
      ) : (
        <p className="text-xl font-bold">LOGO</p>
      )}
    </Link>
  );
};
