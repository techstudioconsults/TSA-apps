"use client";

import { useEffect, useState } from "react";

import { formatTime } from "~/lib/utils";

const COUNTDOWN_KEY = "weekday-class-countdown";

interface WeekdayCountdownBannerProperties {
  targetDate?: Date | string; // Accept Date object, ISO string, or human-readable string
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

// Helper to parse human-readable date strings like "5th May 2025"
const parseHumanDate = (dateString: string): Date => {
  // Remove ordinal indicators (st, nd, rd, th)
  const cleanedString = dateString.replace(/(\d+)(st|nd|rd|th)/, "$1");
  return new Date(cleanedString);
};

// Helper to get next weekday (Mon-Fri) at 9:00 AM
const getNextWeekdayTime = () => {
  const now = new Date();
  const nextDay = new Date(now);

  if (now.getDay() === 6) {
    // Saturday
    nextDay.setDate(now.getDate() + 2);
  } else if (now.getDay() === 0) {
    // Sunday
    nextDay.setDate(now.getDate() + 1);
  } else if (now.getDay() === 5 && now.getHours() >= 9) {
    // Friday after 9 AM
    nextDay.setDate(now.getDate() + 3);
  } else if (now.getHours() >= 9) {
    // Weekday after 9 AM
    nextDay.setDate(now.getDate() + 1);
  }

  nextDay.setHours(9, 0, 0, 0);
  return nextDay.getTime();
};

export const WeekdayCountdownBanner = ({
  targetDate,
}: WeekdayCountdownBannerProperties) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [displayDate, setDisplayDate] = useState<string>("");

  useEffect(() => {
    const determineEndTime = () => {
      if (!targetDate) {
        const savedEndTime = localStorage.getItem(COUNTDOWN_KEY);
        let endTime: number;

        if (savedEndTime) {
          endTime = Number.parseInt(savedEndTime);
          if (Date.now() > endTime) {
            endTime = getNextWeekdayTime();
            localStorage.setItem(COUNTDOWN_KEY, endTime.toString());
          }
        } else {
          endTime = getNextWeekdayTime();
          localStorage.setItem(COUNTDOWN_KEY, endTime.toString());
        }

        // Format for display time
        const date = new Date(endTime);
        setDisplayDate(
          date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        );
        return endTime;
      }

      // Handle provided targetDate
      let date: Date;
      if (typeof targetDate === "string") {
        // Check if it's an ISO string or human-readable
        date = targetDate.includes(",")
          ? parseHumanDate(targetDate)
          : new Date(targetDate);
      } else {
        date = targetDate;
      }

      // Format for display
      setDisplayDate(
        date.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      );

      return date.getTime();
    };

    const endTime = determineEndTime();
    const updateCountdown = () => {
      const now = Date.now();
      const difference = endTime - now;

      if (difference <= 0) {
        if (!targetDate) {
          const newEndTime = getNextWeekdayTime();
          localStorage.setItem(COUNTDOWN_KEY, newEndTime.toString());
          setTimeLeft(calculateTimeLeft(newEndTime));

          // Update display date
          const date = new Date(newEndTime);
          setDisplayDate(
            date.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
          );
          return;
        }
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft(calculateTimeLeft(endTime));
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className="mx-auto min-h-[172px] max-w-[1080px] rounded-[10px] bg-white p-[40px] text-black shadow-lg lg:translate-y-[-5rem]">
      <h2 className="text-center text-xl font-bold md:text-3xl">
        {timeLeft.days <= 0 &&
        timeLeft.hours <= 0 &&
        timeLeft.minutes <= 0 &&
        timeLeft.seconds <= 0
          ? "Class Started!"
          : "Next Cohort Starts In:"}
      </h2>

      {displayDate && (
        <p className="mt-2 text-center text-lg font-semibold text-mid-blue lg:text-2xl">
          {timeLeft.days <= 0 &&
          timeLeft.hours <= 0 &&
          timeLeft.minutes <= 0 &&
          timeLeft.seconds <= 0
            ? "The class is now in session"
            : `${targetDate}`}
        </p>
      )}

      {(timeLeft.days > 0 ||
        timeLeft.hours > 0 ||
        timeLeft.minutes > 0 ||
        timeLeft.seconds > 0) && (
        <div className="mx-auto mt-6 grid w-full max-w-xl grid-cols-2 items-center justify-center gap-4 text-2xl font-bold text-destructive md:grid-cols-4 md:gap-6 md:text-3xl lg:gap-14 lg:text-4xl">
          <div className="flex flex-col items-center justify-center rounded-sm p-4 text-center md:min-w-20">
            <span>{formatTime(timeLeft.days)}</span>
            <p className="text-sm text-foreground md:text-base">Days</p>
          </div>

          <div className="flex flex-col items-center justify-center rounded-sm p-4 text-center md:min-w-20">
            <span>{formatTime(timeLeft.hours)}</span>
            <p className="text-sm text-foreground md:text-base">Hours</p>
          </div>

          <div className="flex flex-col items-center justify-center rounded-sm p-4 text-center md:min-w-20">
            <span>{formatTime(timeLeft.minutes)}</span>
            <p className="text-sm text-foreground md:text-base">Minutes</p>
          </div>

          <div className="flex flex-col items-center justify-center rounded-sm p-4 text-center md:min-w-20">
            <span>{formatTime(timeLeft.seconds)}</span>
            <p className="text-sm text-foreground md:text-base">Seconds</p>
          </div>
        </div>
      )}
    </section>
  );
};
