"use client";

import { formatTime } from "@/lib/utils";
import { cn, CustomButton, Wrapper } from "@workspace/ui/lib";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CountdownBannerProperties {
  title?: string;
  subtitle?: string;
  targetDate?: Date | string;
  className?: string;
  showDays?: boolean;
  showHours?: boolean;
  showMinutes?: boolean;
  showSeconds?: boolean;
  timeUpMessage?: string;
  timeUpSubtitle?: string;
  timeLabels?: {
    days?: string;
    hours?: string;
    minutes?: string;
    seconds?: string;
  };
  spotsRemaining?: number;
}

const calculateTimeLeft = (endTime: number) => {
  const difference = endTime - Date.now();
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const parseHumanDate = (dateString: string): Date => {
  const cleanedString = dateString.replace(/(\d+)(st|nd|rd|th)/, "$1");
  return new Date(cleanedString);
};

export const OnlineCountdownBanner = ({
  title = "Don't Miss This Opportunity!",
  subtitle = "Enrolment closes",
  targetDate,
  className,
  showDays = true,
  showHours = true,
  showMinutes = true,
  showSeconds = true,
  timeUpMessage = "Offer Expired!",
  timeUpSubtitle = "This offer has now ended",
  timeLabels = {
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
  },
  spotsRemaining = 30,
}: CountdownBannerProperties) => {
  const [isIOS, setIsIOS] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (!targetDate) return;

    let endTime: number;
    let date: Date;

    if (typeof targetDate === "string") {
      date = targetDate.includes(",")
        ? parseHumanDate(targetDate)
        : new Date(targetDate);
      endTime = date.getTime();
    } else {
      date = targetDate;
      endTime = targetDate.getTime();
    }

    // Format the date as "Month Day, Year"
    setFormattedDate(
      date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    );

    const updateCountdown = () => {
      const now = Date.now();
      const difference = endTime - now;

      if (difference <= 0) {
        setIsTimeUp(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setIsTimeUp(false);
      setTimeLeft(calculateTimeLeft(endTime));
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);

    // Check if running in the browser
    const userAgent =
      typeof navigator === "undefined" ? "" : navigator.userAgent;
    setIsIOS(/iPad|iPhone|iPod/.test(userAgent));
  }, [targetDate]);

  const whatsappLink = isIOS
    ? "https://api.whatsapp.com/send/?phone=2348113800161&text=Hello!%20TechStudio%20Academy,%20I%E2%80%99ll%20like%20to%20make%20an%20enquiry"
    : "https://api.whatsapp.com/send/?phone=2348113800161&text=Hello!%20TechStudio%20Academy,%20I%E2%80%99ll%20like%20to%20make%20an%20enquiry";

  return (
    <Wrapper
      className={cn(
        "relative !my-0 mx-auto flex w-full flex-col items-center gap-7 rounded-xl bg-primary px-6 py-10 text-center text-white shadow-lg",
        className,
      )}
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white md:text-3xl">
          {isTimeUp ? timeUpMessage : title}
        </h2>
        <p className="mt-5 font-medium">
          {isTimeUp
            ? timeUpSubtitle
            : `${subtitle} ${formattedDate} or when ${spotsRemaining} spots are filled`}
        </p>
      </div>

      {!isTimeUp && (
        <div className="mx-auto mt-6 grid w-full max-w-md grid-cols-4 gap-4 text-center">
          {showDays && (
            <div className="flex flex-col items-center rounded-md border-2 border-white bg-[#FFFFFF40] p-5">
              <span className="text-3xl font-bold md:text-4xl">
                {formatTime(timeLeft.days)}
              </span>
              <p className="text-sm">{timeLabels.days}</p>
            </div>
          )}

          {showHours && (
            <div className="flex flex-col items-center rounded-md border-2 border-white bg-[#FFFFFF40] p-5">
              <span className="text-3xl font-bold md:text-4xl">
                {formatTime(timeLeft.hours)}
              </span>
              <p className="text-sm">{timeLabels.hours}</p>
            </div>
          )}

          {showMinutes && (
            <div className="flex flex-col items-center rounded-md border-2 border-white bg-[#FFFFFF40] p-5">
              <span className="text-3xl font-bold md:text-4xl">
                {formatTime(timeLeft.minutes)}
              </span>
              <p className="text-sm">{timeLabels.minutes}</p>
            </div>
          )}

          {showSeconds && (
            <div className="flex flex-col items-center rounded-md border-2 border-white bg-[#FFFFFF40] p-5">
              <span className="text-3xl font-bold md:text-4xl">
                {formatTime(timeLeft.seconds)}
              </span>
              <p className="text-sm">{timeLabels.seconds}</p>
            </div>
          )}
        </div>
      )}
      <CustomButton
        href={whatsappLink}
        variant="primary"
        size="lg"
        className="w-[323px] bg-mid-blue"
      >
        Ask a Question on whatsapp
      </CustomButton>
      <div className="absolute left-2 top-2 hidden overflow-hidden xl:block">
        <Image
          width={116}
          height={118}
          src={"/icons/box-2.png"}
          alt={"icon"}
          className="object-cover"
        />
      </div>
      <div className="absolute bottom-2 right-2 hidden overflow-hidden xl:block">
        <Image
          width={116}
          height={118}
          src={"/icons/box-2.png"}
          alt={"icon"}
          className="object-cover"
        />
      </div>
    </Wrapper>
  );
};
