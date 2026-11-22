"use client";

import { BookOpen, PlayCircle } from "lucide-react";
import Link from "next/link";

import { ErrorBlock, LoadingBlock } from "@/components/page-state";
import { ProgressBar } from "@/components/progress-bar";
import { SiteHeader } from "@/components/site-header";
import { config } from "@/lib/config";
import { formatDate, formatDuration, greeting } from "@/lib/format";
import { errorMessage } from "@/lib/http/http";
import { useCurrentUser } from "@/services/auth/auth.queries";
import {
  useContinueLearning,
  useMyCourses,
} from "@/services/learn/learn.queries";
import type { MyCourse } from "@/services/learn/learn.types";

function courseHref(course: MyCourse["course"]) {
  return `/courses/${course.slug ?? course.id}`;
}

function ContinueCard() {
  const { data, isLoading } = useContinueLearning();
  if (isLoading || !data) return null;
  const href = `/lectures/${data.lecture.id}`;
  const where =
    data.lecture.type === "video" && data.lastPositionSeconds > 0
      ? `You stopped at ${formatDuration(data.lastPositionSeconds)}`
      : data.completed
        ? "Next up"
        : "Pick up where you left off";
  return (
    <section
      aria-labelledby="continue-heading"
      className="bg-navy flex flex-wrap items-center gap-6 rounded-2xl p-6 text-[#f2f5fa] sm:p-8"
    >
      <div className="flex min-w-[240px] flex-1 flex-col gap-2">
        <h2
          id="continue-heading"
          className="text-on-navy-muted m-0 text-[13px] font-semibold tracking-[0.04em] uppercase"
        >
          Continue learning
        </h2>
        <p className="font-display m-0 text-[22px] leading-[28px] font-bold">
          {data.lecture.title}
        </p>
        <p className="text-on-navy-muted m-0 text-[15px]">
          {data.course.title} · {where}
        </p>
      </div>
      <Link
        href={href}
        className="bg-action-on-navy text-navy flex h-12 items-center gap-2 rounded-[10px] px-5 text-[15px] font-semibold no-underline"
      >
        <PlayCircle className="size-5" strokeWidth={1.5} aria-hidden />
        Resume
      </Link>
    </section>
  );
}

function CourseCard({ item }: { item: MyCourse }) {
  const { course, progress, active, expiresAt, completedAt } = item;
  const started = progress.completedLectures > 0;
  return (
    <li className="border-line flex flex-col gap-4 rounded-2xl border bg-white p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display m-0 text-[19px] leading-[26px] font-bold">
          {course.title}
        </h3>
        {completedAt ? (
          <span className="bg-ok-soft text-ok shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold">
            Completed
          </span>
        ) : !active ? (
          <span className="bg-caution-soft text-caution shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold">
            Access ended
          </span>
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        <ProgressBar
          value={progress.percent}
          label={`${course.title} progress`}
        />
        <p className="text-ink-muted m-0 text-[13px]">
          {progress.completedLectures} of {progress.totalLectures} lectures done
          · {progress.percent}%
        </p>
      </div>
      {active ? (
        <>
          {expiresAt ? (
            <p className="text-ink-muted m-0 text-[13px]">
              Access until {formatDate(expiresAt)}
            </p>
          ) : null}
          <Link
            href={courseHref(course)}
            className="border-line text-ink mt-auto flex h-11 items-center justify-center rounded-[10px] border text-[15px] font-semibold no-underline"
          >
            {started ? "Open course" : "Start course"}
          </Link>
        </>
      ) : (
        <>
          <p className="text-ink-muted m-0 text-[13px] leading-5">
            Your access ended {formatDate(expiresAt)}. Your progress is saved
            and comes back when access is renewed.
          </p>
          <a
            href={config.supportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border-line text-ink mt-auto flex h-11 items-center justify-center rounded-[10px] border text-[15px] font-semibold no-underline"
          >
            Ask about renewing
          </a>
        </>
      )}
    </li>
  );
}

export default function MyCoursesPage() {
  const { data: user } = useCurrentUser();
  const courses = useMyCourses();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-[1200px] flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10">
        <h1 className="font-display m-0 text-[28px] leading-[34px] font-bold">
          {greeting()}
          {user ? `, ${user.firstName}` : ""}
        </h1>
        <ContinueCard />
        <section
          aria-labelledby="courses-heading"
          className="flex flex-col gap-4"
        >
          <h2
            id="courses-heading"
            className="font-display m-0 text-[20px] font-bold"
          >
            My courses
          </h2>
          {courses.isLoading ? (
            <LoadingBlock label="Loading your courses" />
          ) : courses.isError ? (
            <ErrorBlock
              message={errorMessage(
                courses.error,
                "We couldn't load your courses.",
              )}
              onRetry={() => courses.refetch()}
            />
          ) : !courses.data?.length ? (
            <div className="border-line flex flex-col items-start gap-3 rounded-2xl border bg-white p-6">
              <BookOpen
                className="text-ink-muted size-6"
                strokeWidth={1.5}
                aria-hidden
              />
              <p className="m-0 text-[15px] leading-6">
                You aren&apos;t enrolled in a course yet. If you&apos;ve paid,
                it can take a few hours to appear.
              </p>
              <a
                href={config.supportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-action text-[15px] font-semibold"
              >
                Contact the TSA team
              </a>
            </div>
          ) : (
            <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 p-0">
              {courses.data.map((item) => (
                <CourseCard key={item.enrolmentId} item={item} />
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}
