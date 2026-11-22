"use client";

import {
  ChevronLeft,
  FileText,
  Loader2,
  RefreshCw,
  Trash2,
  UploadCloud,
  Video,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { AlertModal, ErrorEmptyState } from "@workspace/ui/lib";
import {
  useCurriculumQuery,
  useDeleteLectureMutation,
  useLectureQuery,
  useSyncVideoMutation,
  useUpdateLectureMutation,
} from "@/services/learning/learning.queries";
import type { AdminLectureDetail } from "@/services/learning/learning.types";
import { StatusPill } from "../../../_components/status-pill";
import {
  formatBytes,
  timeLeft,
  useVideoUpload,
} from "../../../_components/use-video-upload";
import {
  apiError,
  formatDuration,
  lectureState,
} from "../../../_components/utils";

const panel = "bg-background flex flex-col gap-4 rounded-lg border p-5";

function VideoPanel({
  lecture,
  courseId,
}: {
  lecture: AdminLectureDetail;
  courseId: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const sync = useSyncVideoMutation(lecture.id, courseId);
  const upload = useVideoUpload(lecture.id, () => {
    toast.success(
      "Upload finished. Bunny is processing the video; this page updates on its own.",
    );
    void sync.mutateAsync(undefined).catch(() => undefined);
  });

  const choose = (files: FileList | null) => {
    const file = files?.[0];
    if (file) void upload.start(file);
  };

  const { state } = upload;
  const processing =
    lecture.videoStatus === "uploading" || lecture.videoStatus === "processing";

  return (
    <section aria-labelledby="video-heading" className={panel}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="video-heading" className="text-base font-semibold">
          Video
        </h2>
        <div className="flex items-center gap-2">
          {lecture.durationSeconds ? (
            <span className="text-muted-foreground text-sm tabular-nums">
              {formatDuration(lecture.durationSeconds)}
            </span>
          ) : null}
          {lecture.bunnyVideoId ? (
            <button
              type="button"
              onClick={() =>
                sync.mutate(undefined, {
                  onSuccess: (l) =>
                    toast.success(`Status: ${lectureState(l).label}`),
                  onError: (e) => toast.error(apiError(e)),
                })
              }
              disabled={sync.isPending || upload.active}
              className="hover:bg-muted inline-flex h-9 items-center gap-1.5 rounded-md border px-3 text-sm font-medium disabled:opacity-60"
            >
              <RefreshCw
                className={`size-3.5 ${sync.isPending ? "animate-spin" : ""}`}
                aria-hidden
              />{" "}
              Check status
            </button>
          ) : null}
        </div>
      </div>

      {lecture.embed && !upload.active ? (
        <div className="relative aspect-video w-full overflow-hidden rounded-md bg-black">
          <iframe
            src={lecture.embed.url}
            title={`Preview: ${lecture.title}`}
            allow="encrypted-media; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full border-0"
          />
        </div>
      ) : null}

      {processing && !upload.active ? (
        <div
          role="status"
          className="flex items-start gap-3 rounded-md bg-blue-50 p-4 text-sm text-blue-900"
        >
          <Loader2
            className="mt-0.5 size-4 shrink-0 animate-spin"
            aria-hidden
          />
          <p>
            {lecture.videoStatus === "uploading"
              ? "Waiting for the upload to reach Bunny. If you closed the tab mid-upload, upload the file again."
              : "Bunny is processing the video. This usually takes a few minutes per 10 minutes of video. This page checks every 10 seconds."}
          </p>
        </div>
      ) : null}

      {lecture.videoStatus === "failed" && !upload.active ? (
        <p
          role="alert"
          className="rounded-md bg-red-50 p-4 text-sm text-red-800"
        >
          Bunny couldn&apos;t process this file. Re-export it as MP4 (H.264) and
          upload it again.
        </p>
      ) : null}

      {state.phase === "uploading" || state.phase === "preparing" ? (
        <div
          className="flex flex-col gap-2 rounded-md border p-4"
          aria-live="polite"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <span className="min-w-0 truncate font-medium">
              {state.fileName}
            </span>
            <span className="text-muted-foreground tabular-nums">
              {state.phase === "preparing"
                ? "Preparing…"
                : `${formatBytes(state.sent)} of ${formatBytes(state.total)} · ${Math.floor((state.sent / state.total) * 100)}%`}
            </span>
          </div>
          <div
            role="progressbar"
            aria-label="Upload progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={
              state.phase === "uploading"
                ? Math.floor((state.sent / state.total) * 100)
                : 0
            }
            className="bg-muted h-2 overflow-hidden rounded-full"
          >
            <div
              className="bg-primary h-2 rounded-full transition-[width]"
              style={{
                width:
                  state.phase === "uploading"
                    ? `${(state.sent / state.total) * 100}%`
                    : "0%",
              }}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground text-xs">
              {state.phase === "uploading"
                ? (timeLeft(state.sent, state.total, state.startedAt) ??
                  "Starting…")
                : ""}{" "}
              Keep this tab open.
            </span>
            <button
              type="button"
              onClick={upload.cancel}
              className="text-sm font-medium text-red-600 hover:underline"
            >
              Cancel upload
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            choose(e.dataTransfer.files);
          }}
          className={`flex flex-col items-center gap-2 rounded-md border-2 border-dashed p-6 text-center ${dragging ? "border-primary bg-primary/5" : ""}`}
        >
          <UploadCloud className="text-muted-foreground size-7" aria-hidden />
          <p className="text-sm font-medium">
            {lecture.bunnyVideoId
              ? "Replace the video"
              : "Drop the video file here"}
          </p>
          <p className="text-muted-foreground text-xs">
            MP4 or MOV, up to 8 GB. Uploads go straight to Bunny and resume if
            the connection drops.
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="video/*,.mkv"
            className="sr-only"
            id="video-file"
            onChange={(e) => {
              choose(e.target.files);
              e.target.value = "";
            }}
          />
          <label
            htmlFor="video-file"
            className="bg-primary text-primary-foreground mt-1 inline-flex h-10 cursor-pointer items-center rounded-md px-4 text-sm font-semibold focus-within:ring-2"
          >
            Choose file
          </label>
          {state.phase === "error" ? (
            <p role="alert" className="text-sm text-red-600">
              {state.message}
            </p>
          ) : null}
        </div>
      )}
    </section>
  );
}

export default function LectureEditorPage() {
  const { courseId, lectureId } = useParams<{
    courseId: string;
    lectureId: string;
  }>();
  const router = useRouter();
  const [refetchInterval, setRefetchInterval] = useState<number | false>(false);
  const query = useLectureQuery(lectureId, { refetchInterval });
  const curriculum = useCurriculumQuery(courseId);
  const lecture = query.data;
  const update = useUpdateLectureMutation(lectureId, courseId);
  const remove = useDeleteLectureMutation(courseId);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const loadedId = useRef<string | null>(null);

  // Fill the form once per lecture; background refetches must not wipe typing
  useEffect(() => {
    if (lecture && loadedId.current !== lecture.id) {
      loadedId.current = lecture.id;
      setTitle(lecture.title);
      setBody(lecture.body ?? "");
    }
  }, [lecture]);

  const processing =
    lecture?.videoStatus === "uploading" ||
    lecture?.videoStatus === "processing";
  useEffect(
    () => setRefetchInterval(processing ? 10_000 : false),
    [processing],
  );

  if (query.isError) return <ErrorEmptyState onRetry={query.refetch} />;
  if (!lecture) {
    return (
      <div
        className="flex max-w-[960px] flex-col gap-4"
        role="status"
        aria-label="Loading lecture"
      >
        <div className="bg-muted h-8 w-64 animate-pulse rounded" />
        <div className="bg-muted h-64 animate-pulse rounded-lg" />
      </div>
    );
  }

  const state = lectureState(lecture);
  const dirty =
    title.trim() !== lecture.title || (body || null) !== (lecture.body || null);
  const canPublish = lecture.type === "text" || lecture.videoStatus === "ready";
  const sections = curriculum.data?.sections ?? [];

  const save = async (
    payload: Parameters<typeof update.mutateAsync>[0],
    message: string,
  ) => {
    try {
      await update.mutateAsync(payload);
      toast.success(message);
    } catch (error) {
      toast.error(apiError(error));
    }
  };

  return (
    <div className="flex max-w-[960px] flex-col gap-6">
      <AlertModal
        isOpen={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        loading={remove.isPending}
        type="warning"
        title="Delete lecture"
        description={`Delete "${lecture.title}"? Students lose access to it and their progress on it stops counting.`}
        confirmText="Delete lecture"
        confirmVariant="destructive"
        onConfirm={async () => {
          try {
            await remove.mutateAsync(lecture.id);
            toast.success("Lecture deleted");
            router.replace(`/learning/${courseId}`);
          } catch (error) {
            toast.error(apiError(error));
            setConfirmDelete(false);
          }
        }}
      />

      <Link
        href={`/learning/${courseId}`}
        className="text-primary inline-flex min-h-10 w-fit items-center gap-1 text-sm font-medium"
      >
        <ChevronLeft className="size-4" aria-hidden />{" "}
        {curriculum.data?.course.title ?? "Back to course"}
      </Link>

      <div className="flex flex-wrap items-center gap-3">
        {lecture.type === "video" ? (
          <Video
            className="text-muted-foreground size-5"
            aria-label="Video lecture"
          />
        ) : (
          <FileText
            className="text-muted-foreground size-5"
            aria-label="Reading lecture"
          />
        )}
        <h1 className="min-w-0 flex-1 text-2xl font-bold">{lecture.title}</h1>
        <StatusPill tone={state.tone}>{state.label}</StatusPill>
        {lecture.isPreview ? (
          <StatusPill tone="info">Free preview</StatusPill>
        ) : null}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="flex min-w-0 flex-col gap-6">
          {lecture.type === "video" ? (
            <VideoPanel lecture={lecture} courseId={courseId} />
          ) : null}

          <form
            className={panel}
            onSubmit={(e) => {
              e.preventDefault();
              if (!title.trim()) {
                toast.error("The title can't be empty");
                return;
              }
              void save(
                { title: title.trim(), body: body.trim() ? body : null },
                "Saved",
              );
            }}
          >
            <h2 className="text-base font-semibold">
              {lecture.type === "video"
                ? "Title and notes"
                : "Title and content"}
            </h2>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="lecture-title" className="text-sm font-medium">
                Title
              </label>
              <input
                id="lecture-title"
                value={title}
                maxLength={200}
                onChange={(e) => setTitle(e.target.value)}
                className="border-input bg-background h-10 rounded-md border px-3 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="lecture-body" className="text-sm font-medium">
                {lecture.type === "video"
                  ? "Notes under the video (optional)"
                  : "Reading"}
              </label>
              <textarea
                id="lecture-body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={lecture.type === "video" ? 6 : 16}
                maxLength={100000}
                className="border-input bg-background rounded-md border px-3 py-2 text-sm leading-6"
                aria-describedby="body-help"
              />
              <p id="body-help" className="text-muted-foreground text-xs">
                Plain text. Leave a blank line between paragraphs. Links
                starting with https:// become clickable.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={!dirty || update.isPending}
                className="bg-primary text-primary-foreground inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-semibold disabled:opacity-50"
              >
                {update.isPending ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                ) : null}
                Save changes
              </button>
              {dirty ? (
                <span className="text-muted-foreground text-xs">
                  Unsaved changes
                </span>
              ) : null}
            </div>
          </form>
        </div>

        <aside className="flex flex-col gap-6">
          <section aria-labelledby="publish-heading" className={panel}>
            <h2 id="publish-heading" className="text-base font-semibold">
              Visibility
            </h2>
            <p className="text-muted-foreground text-sm">
              {lecture.published
                ? "Enrolled students can see this lecture."
                : canPublish
                  ? "Hidden from students until you publish it."
                  : "Upload the video and wait for processing to finish before publishing."}
            </p>
            {lecture.published ? (
              <button
                type="button"
                onClick={() =>
                  save(
                    { published: false },
                    "Unpublished. Students can't see it now.",
                  )
                }
                disabled={update.isPending}
                className="hover:bg-muted h-10 rounded-md border text-sm font-semibold"
              >
                Unpublish
              </button>
            ) : (
              <button
                type="button"
                onClick={() =>
                  save(
                    { published: true },
                    "Published. Students can see it now.",
                  )
                }
                disabled={!canPublish || update.isPending}
                className="bg-primary text-primary-foreground h-10 rounded-md text-sm font-semibold disabled:opacity-50"
              >
                Publish
              </button>
            )}
            <label className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={lecture.isPreview}
                onChange={(e) =>
                  save(
                    { isPreview: e.target.checked },
                    e.target.checked
                      ? "Anyone logged in can now watch this lecture"
                      : "Only enrolled students can watch this lecture",
                  )
                }
                className="mt-0.5 size-4"
              />
              <span>
                <span className="font-medium">Free preview</span>
                <span className="text-muted-foreground block text-xs">
                  Logged-in students who aren&apos;t enrolled can watch it too.
                </span>
              </span>
            </label>
          </section>

          <section aria-labelledby="module-heading" className={panel}>
            <h2 id="module-heading" className="text-base font-semibold">
              Module
            </h2>
            <label htmlFor="lecture-module" className="sr-only">
              Move to module
            </label>
            <select
              id="lecture-module"
              value={lecture.sectionId}
              disabled={!sections.length || update.isPending}
              onChange={(e) =>
                save(
                  { sectionId: e.target.value },
                  "Moved. It's now the last lecture in that module.",
                )
              }
              className="border-input bg-background h-10 rounded-md border px-2 text-sm"
            >
              {sections.map((section, index) => (
                <option key={section.id} value={section.id}>
                  Module {index + 1}: {section.title}
                </option>
              ))}
            </select>
          </section>

          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-red-200 text-sm font-semibold text-red-700 hover:bg-red-50"
          >
            <Trash2 className="size-4" aria-hidden /> Delete lecture
          </button>
        </aside>
      </div>
    </div>
  );
}
