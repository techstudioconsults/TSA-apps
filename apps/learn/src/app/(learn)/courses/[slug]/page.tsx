"use client";

import { ChevronDown, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import { LectureIcon } from "@/components/lecture-icon";
import { Notice } from "@/components/notice";
import { ErrorBlock, LoadingBlock } from "@/components/page-state";
import { ProgressBar } from "@/components/progress-bar";
import { SiteHeader } from "@/components/site-header";
import { config } from "@/lib/config";
import { formatDate, lectureMeta } from "@/lib/format";
import { errorMessage } from "@/lib/http/http";
import { useCourseOutline } from "@/services/learn/learn.queries";
import type {
  CourseOutline,
  OutlineLecture,
} from "@/services/learn/learn.types";

function firstOpenLecture(outline: CourseOutline): OutlineLecture | undefined {
  const all = outline.sections
    .flatMap((s) => s.lectures)
    .filter((l) => !l.locked);
  return all.find((l) => !l.completed) ?? all[0];
}

function Section({
  section,
  index,
  defaultOpen,
}: {
  section: CourseOutline["sections"][number];
  index: number;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const done = section.lectures.filter((l) => l.completed).length;
  const panelId = `section-${section.id}`;
  return (
    <li className="border-line overflow-hidden rounded-2xl border bg-white">
      <h3 className="m-0">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="hover:bg-surface-sunken flex min-h-16 w-full items-center gap-4 px-5 py-3 text-left"
        >
          <span className="flex flex-1 flex-col gap-0.5">
            <span className="text-ink-muted text-xs font-semibold tracking-[0.04em] uppercase">
              Module {index + 1}
            </span>
            <span className="text-ink text-[17px] leading-6 font-semibold">
              {section.title}
            </span>
          </span>
          <span className="text-ink-muted text-[13px] whitespace-nowrap">
            {done}/{section.lectures.length} done
          </span>
          <ChevronDown
            className={`text-ink-muted size-5 transition-transform ${open ? "rotate-180" : ""}`}
            strokeWidth={1.5}
            aria-hidden
          />
        </button>
      </h3>
      {open ? (
        <ol
          id={panelId}
          className="border-line-soft m-0 list-none border-t p-0"
        >
          {section.lectures.map((lecture) => {
            const row = (
              <>
                <LectureIcon
                  type={lecture.type}
                  completed={lecture.completed}
                  locked={lecture.locked}
                />
                <span className="flex-1 text-[15px] leading-[22px]">
                  {lecture.title}
                </span>
                {lecture.isPreview && lecture.locked === false ? (
                  <span className="bg-action-soft text-action rounded-full px-2 py-0.5 text-xs font-semibold">
                    Preview
                  </span>
                ) : null}
                <span className="text-ink-muted text-[13px] whitespace-nowrap">
                  {lectureMeta(lecture.type, lecture.durationSeconds)}
                </span>
              </>
            );
            return (
              <li
                key={lecture.id}
                className="border-line-soft border-b last:border-b-0"
              >
                {lecture.locked ? (
                  <div className="text-ink-muted flex min-h-14 items-center gap-3 px-5 py-3">
                    {row}
                  </div>
                ) : (
                  <Link
                    href={`/lectures/${lecture.id}`}
                    className="text-ink hover:bg-surface-sunken flex min-h-14 items-center gap-3 px-5 py-3 no-underline"
                  >
                    {row}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      ) : null}
    </li>
  );
}

export default function CourseOutlinePage() {
  const { slug } = useParams<{ slug: string }>();
  const outline = useCourseOutline(slug);
  const data = outline.data;
  const next = data ? firstOpenLecture(data) : undefined;
  const enrolledActive = Boolean(data?.enrolment?.active);
  // Open the module holding the next lecture, or the first one
  const openSectionId =
    data?.sections.find((s) => s.lectures.some((l) => l.id === next?.id))?.id ??
    data?.sections[0]?.id;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-[960px] flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10">
        <Link
          href="/"
          className="text-action flex min-h-11 w-fit items-center gap-1 text-[15px] font-medium no-underline"
        >
          <ChevronLeft className="size-4" strokeWidth={1.5} aria-hidden /> My
          courses
        </Link>
        {outline.isLoading ? (
          <LoadingBlock label="Loading the course" />
        ) : outline.isError || !data ? (
          <ErrorBlock
            message={errorMessage(
              outline.error,
              "We couldn't load this course.",
            )}
            onRetry={() => outline.refetch()}
          />
        ) : (
          <>
            <header className="flex flex-col gap-4">
              <h1 className="font-display m-0 text-[28px] leading-[34px] font-bold sm:text-[32px] sm:leading-[40px]">
                {data.course.title}
              </h1>
              {data.course.about ? (
                <p className="text-ink-muted m-0 max-w-[68ch] text-[15px] leading-6">
                  {data.course.about}
                </p>
              ) : null}
              {data.enrolment ? (
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex min-w-[220px] flex-1 flex-col gap-2">
                    <ProgressBar
                      value={data.progress.percent}
                      label="Course progress"
                    />
                    <p className="text-ink-muted m-0 text-[13px]">
                      {data.progress.completedLectures} of{" "}
                      {data.progress.totalLectures} lectures done ·{" "}
                      {data.progress.percent}%
                      {data.enrolment.expiresAt && enrolledActive
                        ? ` · Access until ${formatDate(data.enrolment.expiresAt)}`
                        : ""}
                    </p>
                  </div>
                  {enrolledActive && next ? (
                    <Link
                      href={`/lectures/${next.id}`}
                      className="bg-action hover:bg-action-hover flex h-12 items-center rounded-[10px] px-5 text-[15px] font-semibold text-white no-underline"
                    >
                      {data.progress.completedLectures > 0
                        ? "Continue"
                        : "Start course"}
                    </Link>
                  ) : null}
                </div>
              ) : null}
            </header>
            {data.enrolment && !enrolledActive ? (
              <Notice
                tone="caution"
                title={`Your access ended ${formatDate(data.enrolment.expiresAt)}.`}
              >
                Your progress is saved.{" "}
                <a
                  href={config.supportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline"
                >
                  Ask about renewing
                </a>
                .
              </Notice>
            ) : !data.enrolment ? (
              <Notice tone="info" title="You aren't enrolled in this course.">
                You can watch the preview lectures.
              </Notice>
            ) : null}
            <section
              aria-labelledby="content-heading"
              className="flex flex-col gap-3"
            >
              <h2
                id="content-heading"
                className="font-display m-0 text-[20px] font-bold"
              >
                Course content
              </h2>
              <ol className="m-0 flex list-none flex-col gap-3 p-0">
                {data.sections.map((section, index) => (
                  <Section
                    key={section.id}
                    section={section}
                    index={index}
                    defaultOpen={section.id === openSectionId}
                  />
                ))}
              </ol>
            </section>
          </>
        )}
      </main>
    </>
  );
}
