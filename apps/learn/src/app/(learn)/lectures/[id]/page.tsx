"use client";

import { CheckCircle2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { LectureIcon } from "@/components/lecture-icon";
import { Notice } from "@/components/notice";
import { ErrorBlock, LoadingBlock } from "@/components/page-state";
import { ProgressBar } from "@/components/progress-bar";
import { SiteHeader } from "@/components/site-header";
import { config } from "@/lib/config";
import { lectureMeta } from "@/lib/format";
import { errorMessage } from "@/lib/http/http";
import {
  useCompleteLecture,
  useCourseOutline,
  useLecture,
} from "@/services/learn/learn.queries";
import type { LectureDetail } from "@/services/learn/learn.types";
import { LectureBody } from "./lecture-body";
import { VideoPlayer } from "./video-player";

function CourseSidebar({ lecture }: { lecture: LectureDetail }) {
  const outline = useCourseOutline(lecture.course.slug ?? lecture.course.id);
  const data = outline.data;
  return (
    <aside
      aria-label="Course content"
      className="border-line flex flex-col overflow-hidden rounded-2xl border bg-white lg:sticky lg:top-6 lg:max-h-[calc(100vh-48px)]"
    >
      <div className="border-line-soft flex flex-col gap-2 border-b px-5 py-4">
        <Link
          href={`/courses/${lecture.course.slug ?? lecture.course.id}`}
          className="text-ink text-[15px] font-semibold no-underline"
        >
          {lecture.course.title}
        </Link>
        {data ? (
          <>
            <ProgressBar
              value={data.progress.percent}
              label="Course progress"
              size="sm"
            />
            <span className="text-ink-muted text-[13px]">
              {data.progress.completedLectures} of {data.progress.totalLectures}{" "}
              done
            </span>
          </>
        ) : null}
      </div>
      <div className="overflow-y-auto">
        {!data ? (
          <div className="p-4">
            <LoadingBlock lines={2} label="Loading course content" />
          </div>
        ) : (
          data.sections.map((section, index) => (
            <section key={section.id} aria-labelledby={`side-${section.id}`}>
              <h3
                id={`side-${section.id}`}
                className="bg-surface-sunken text-ink-muted m-0 px-5 py-2.5 text-xs font-semibold tracking-[0.04em] uppercase"
              >
                Module {index + 1}: {section.title}
              </h3>
              <ol className="m-0 list-none p-0">
                {section.lectures.map((item) => {
                  const current = item.id === lecture.id;
                  const inner = (
                    <>
                      <LectureIcon
                        type={item.type}
                        completed={item.completed}
                        locked={item.locked}
                      />
                      <span className="flex-1 text-sm leading-5">
                        {item.title}
                      </span>
                      <span className="text-ink-muted text-xs whitespace-nowrap">
                        {lectureMeta(item.type, item.durationSeconds)}
                      </span>
                    </>
                  );
                  const base = "flex min-h-12 items-center gap-3 px-5 py-2.5";
                  return (
                    <li key={item.id}>
                      {item.locked ? (
                        <div className={`${base} text-ink-muted`}>{inner}</div>
                      ) : (
                        <Link
                          href={`/lectures/${item.id}`}
                          aria-current={current ? "page" : undefined}
                          className={`${base} no-underline ${current ? "bg-action-soft text-action border-action border-l-[3px] pl-[17px] font-semibold" : "text-ink hover:bg-surface-sunken"}`}
                        >
                          {inner}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ol>
            </section>
          ))
        )}
      </div>
    </aside>
  );
}

function VideoState({ lecture }: { lecture: LectureDetail }) {
  if (lecture.videoStatus === "failed") {
    return (
      <Notice tone="danger" title="This video can't play right now.">
        We&apos;ve been told and are fixing it.{" "}
        <a
          href={config.supportUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline"
        >
          Contact us
        </a>{" "}
        if it&apos;s still broken tomorrow.
      </Notice>
    );
  }
  return (
    <div className="bg-navy text-on-navy-muted flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-2xl p-6 text-center">
      <Loader2 className="size-6 animate-spin" aria-hidden />
      <p className="m-0 max-w-[40ch] text-[15px] leading-6">
        This video is still being prepared. Check back in a few minutes.
      </p>
    </div>
  );
}

function CompleteButton({ lecture }: { lecture: LectureDetail }) {
  const complete = useCompleteLecture(lecture.id);
  const done = lecture.progress.completed || complete.isSuccess;
  if (done) {
    return (
      <span className="bg-ok-soft text-ok flex h-11 items-center gap-2 rounded-[10px] px-4 text-[15px] font-semibold">
        <CheckCircle2 className="size-5" strokeWidth={1.5} aria-hidden /> Done
      </span>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={() => complete.mutate()}
        disabled={complete.isPending}
        className="bg-action hover:bg-action-hover flex h-11 items-center gap-2 rounded-[10px] px-4 text-[15px] font-semibold text-white disabled:opacity-70"
      >
        {complete.isPending ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : null}
        Mark as done
      </button>
      {complete.isError ? (
        <p role="alert" className="text-bad m-0 text-[13px]">
          {errorMessage(complete.error)}
        </p>
      ) : null}
    </div>
  );
}

export default function LecturePage() {
  const { id } = useParams<{ id: string }>();
  const lecture = useLecture(id);
  const data = lecture.data;
  const track = Boolean(data?.enrolled);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto grid max-w-[1320px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        {lecture.isLoading ? (
          <LoadingBlock label="Loading the lecture" />
        ) : lecture.isError || !data ? (
          <div className="flex flex-col gap-4 lg:col-span-2">
            <Link
              href="/"
              className="text-action flex min-h-11 w-fit items-center gap-1 text-[15px] font-medium no-underline"
            >
              <ChevronLeft className="size-4" strokeWidth={1.5} aria-hidden />{" "}
              My courses
            </Link>
            <ErrorBlock
              message={errorMessage(
                lecture.error,
                "We couldn't open this lecture.",
              )}
              onRetry={() => lecture.refetch()}
            />
          </div>
        ) : (
          <>
            <article className="flex min-w-0 flex-col gap-5">
              <nav
                aria-label="Breadcrumb"
                className="text-ink-muted flex flex-wrap items-center gap-1 text-[13px]"
              >
                <Link
                  href={`/courses/${data.course.slug ?? data.course.id}`}
                  className="text-action font-medium no-underline"
                >
                  {data.course.title}
                </Link>
                <ChevronRight
                  className="size-3.5"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <span>{data.section.title}</span>
              </nav>
              {data.type === "video" ? (
                data.video ? (
                  <VideoPlayer key={data.id} lecture={data} track={track} />
                ) : (
                  <VideoState lecture={data} />
                )
              ) : null}
              <div className="flex flex-wrap items-start justify-between gap-4">
                <h1 className="font-display m-0 min-w-0 flex-1 text-[24px] leading-[32px] font-bold sm:text-[28px] sm:leading-[34px]">
                  {data.title}
                </h1>
                {data.type === "text" && track ? (
                  <CompleteButton lecture={data} />
                ) : null}
              </div>
              {!data.enrolled ? (
                <Notice tone="info" title="This is a free preview.">
                  Progress isn&apos;t saved for previews.
                </Notice>
              ) : data.type === "video" && !data.progress.completed ? (
                <p className="text-ink-muted m-0 text-[13px]">
                  Watch most of the video and it&apos;s marked as done for you.
                </p>
              ) : null}
              {data.body ? <LectureBody body={data.body} /> : null}
              <nav
                aria-label="Lecture navigation"
                className="border-line flex flex-wrap justify-between gap-3 border-t pt-5"
              >
                {data.previousLectureId ? (
                  <Link
                    href={`/lectures/${data.previousLectureId}`}
                    className="border-line text-ink flex h-11 items-center gap-1 rounded-[10px] border bg-white px-4 text-[15px] font-semibold no-underline"
                  >
                    <ChevronLeft
                      className="size-4"
                      strokeWidth={1.5}
                      aria-hidden
                    />{" "}
                    Previous
                  </Link>
                ) : (
                  <span />
                )}
                {data.nextLectureId ? (
                  <Link
                    href={`/lectures/${data.nextLectureId}`}
                    className="bg-action hover:bg-action-hover flex h-11 items-center gap-1 rounded-[10px] px-4 text-[15px] font-semibold text-white no-underline"
                  >
                    Next lecture{" "}
                    <ChevronRight
                      className="size-4"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  </Link>
                ) : (
                  <Link
                    href={`/courses/${data.course.slug ?? data.course.id}`}
                    className="border-line text-ink flex h-11 items-center rounded-[10px] border bg-white px-4 text-[15px] font-semibold no-underline"
                  >
                    Back to course
                  </Link>
                )}
              </nav>
            </article>
            <CourseSidebar lecture={data} />
          </>
        )}
      </main>
    </>
  );
}
