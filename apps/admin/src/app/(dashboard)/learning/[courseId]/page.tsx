"use client";

import {
  ChevronLeft,
  ExternalLink,
  FileText,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  Video,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { AlertModal, ErrorEmptyState } from "@workspace/ui/lib";
import {
  useCreateLectureMutation,
  useCreateSectionMutation,
  useCurriculumQuery,
  useDeleteSectionMutation,
  useRenameSectionMutation,
  useReorderLecturesMutation,
  useReorderSectionsMutation,
} from "@/services/learning/learning.queries";
import { learningService } from "@/services/learning/learning.service";
import type {
  AdminLecture,
  AdminSection,
  LectureType,
} from "@/services/learning/learning.types";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/react-query/query-keys";
import { InlineForm } from "../_components/inline-form";
import { SortableList } from "../_components/sortable-list";
import { StatusPill } from "../_components/status-pill";
import { apiError, formatDuration, lectureState } from "../_components/utils";

const LEARNING_URL =
  process.env.NEXT_PUBLIC_LEARNING_URL ??
  "https://learning.techstudioacademy.com";

function LectureRow({
  lecture,
  handle,
  courseId,
}: {
  lecture: AdminLecture;
  handle: React.ReactNode;
  courseId: string;
}) {
  const state = lectureState(lecture);
  const Icon = lecture.type === "video" ? Video : FileText;
  return (
    <div className="hover:bg-muted/50 flex min-h-12 items-center gap-2 border-t px-2 py-1.5">
      {handle}
      <Icon
        className="text-muted-foreground size-4 shrink-0"
        aria-label={lecture.type === "video" ? "Video" : "Reading"}
      />
      <Link
        href={`/learning/${courseId}/lectures/${lecture.id}`}
        className="min-w-0 flex-1 truncate py-2 text-sm font-medium hover:underline"
      >
        {lecture.title}
      </Link>
      {lecture.isPreview ? (
        <StatusPill tone="info">Free preview</StatusPill>
      ) : null}
      <StatusPill tone={state.tone}>{state.label}</StatusPill>
      <span className="text-muted-foreground w-14 text-right text-xs tabular-nums">
        {lecture.type === "video" && lecture.durationSeconds
          ? formatDuration(lecture.durationSeconds)
          : ""}
      </span>
    </div>
  );
}

function SectionCard({
  section,
  index,
  handle,
  courseId,
  onDelete,
}: {
  section: AdminSection;
  index: number;
  handle: React.ReactNode;
  courseId: string;
  onDelete: (section: AdminSection) => void;
}) {
  const [renaming, setRenaming] = useState(false);
  const [adding, setAdding] = useState(false);
  const [type, setType] = useState<LectureType>("video");
  const [order, setOrder] = useState(section.lectures);
  useEffect(() => setOrder(section.lectures), [section.lectures]);

  const rename = useRenameSectionMutation(courseId);
  const createLecture = useCreateLectureMutation(courseId);
  const reorder = useReorderLecturesMutation(courseId);

  const onReorder = (ids: string[]) => {
    const previous = order;
    setOrder(ids.map((id) => order.find((l) => l.id === id)!));
    reorder.mutate(
      { sectionId: section.id, ids },
      {
        onError: (error) => {
          setOrder(previous);
          toast.error(apiError(error, "Couldn't save the new order"));
        },
      },
    );
  };

  return (
    <section
      aria-label={`Module ${index + 1}: ${section.title}`}
      className="bg-background rounded-lg border"
    >
      <header className="flex min-h-14 items-center gap-2 px-2 py-2">
        {handle}
        {renaming ? (
          <div className="flex-1">
            <InlineForm
              label="Module title"
              initialValue={section.title}
              submitLabel="Save"
              onCancel={() => setRenaming(false)}
              onSubmit={async (title) => {
                await rename.mutateAsync({ sectionId: section.id, title });
                setRenaming(false);
              }}
            />
          </div>
        ) : (
          <>
            <div className="min-w-0 flex-1">
              <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                Module {index + 1}
              </p>
              <h2 className="truncate text-base font-semibold">
                {section.title}
              </h2>
            </div>
            <span className="text-muted-foreground text-xs">
              {section.lectures.length}{" "}
              {section.lectures.length === 1 ? "lecture" : "lectures"}
            </span>
            <button
              type="button"
              onClick={() => setRenaming(true)}
              className="hover:bg-muted flex size-9 items-center justify-center rounded-md"
              aria-label={`Rename ${section.title}`}
            >
              <Pencil className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => onDelete(section)}
              className="flex size-9 items-center justify-center rounded-md text-red-600 hover:bg-red-50"
              aria-label={`Delete ${section.title}`}
            >
              <Trash2 className="size-4" aria-hidden />
            </button>
          </>
        )}
      </header>

      {order.length ? (
        <SortableList
          items={order}
          onReorder={onReorder}
          disabled={reorder.isPending}
          renderItem={(lecture, lectureHandle) => (
            <LectureRow
              lecture={lecture}
              handle={lectureHandle}
              courseId={courseId}
            />
          )}
        />
      ) : (
        <p className="text-muted-foreground border-t px-4 py-4 text-sm">
          No lectures in this module yet.
        </p>
      )}

      <div className="border-t px-4 py-3">
        {adding ? (
          <InlineForm
            label="Lecture title"
            placeholder="e.g. Setting up VS Code"
            submitLabel="Add lecture"
            onCancel={() => setAdding(false)}
            extra={
              <>
                <label htmlFor={`type-${section.id}`} className="sr-only">
                  Lecture type
                </label>
                <select
                  id={`type-${section.id}`}
                  value={type}
                  onChange={(e) => setType(e.target.value as LectureType)}
                  className="border-input bg-background h-10 rounded-md border px-2 text-sm"
                >
                  <option value="video">Video</option>
                  <option value="text">Reading</option>
                </select>
              </>
            }
            onSubmit={async (title) => {
              await createLecture.mutateAsync({
                sectionId: section.id,
                title,
                type,
              });
              setAdding(false);
              toast.success(
                type === "video"
                  ? "Lecture added. Open it to upload the video."
                  : "Lecture added.",
              );
            }}
          />
        ) : (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="text-primary inline-flex h-10 items-center gap-1.5 rounded-md px-2 text-sm font-semibold hover:underline"
          >
            <Plus className="size-4" aria-hidden /> Add lecture
          </button>
        )}
      </div>
    </section>
  );
}

export default function CourseBuilderPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const client = useQueryClient();
  const [refetchInterval, setRefetchInterval] = useState<number | false>(false);
  const curriculum = useCurriculumQuery(courseId, { refetchInterval });
  const data = curriculum.data;

  const [sections, setSections] = useState<AdminSection[]>([]);
  useEffect(() => setSections(data?.sections ?? []), [data]);

  const lectures = useMemo(
    () => sections.flatMap((s) => s.lectures),
    [sections],
  );
  const busy = lectures.some(
    (l) => l.videoStatus === "uploading" || l.videoStatus === "processing",
  );
  const ready = lectures.filter(
    (l) => !l.published && (l.type === "text" || l.videoStatus === "ready"),
  );
  const published = lectures.filter((l) => l.published).length;

  // Poll while Bunny is still processing, so statuses update without a reload
  useEffect(() => setRefetchInterval(busy ? 10_000 : false), [busy]);

  const [addingSection, setAddingSection] = useState(false);
  const [toDelete, setToDelete] = useState<AdminSection | null>(null);
  const [publishing, setPublishing] = useState(false);
  const createSection = useCreateSectionMutation(courseId);
  const deleteSection = useDeleteSectionMutation(courseId);
  const reorderSections = useReorderSectionsMutation(courseId);

  const onReorderSections = (ids: string[]) => {
    const previous = sections;
    setSections(ids.map((id) => sections.find((s) => s.id === id)!));
    reorderSections.mutate(ids, {
      onError: (error) => {
        setSections(previous);
        toast.error(apiError(error, "Couldn't save the new order"));
      },
    });
  };

  const publishAllReady = async () => {
    setPublishing(true);
    let done = 0;
    const failures: string[] = [];
    for (const lecture of ready) {
      try {
        await learningService.updateLecture(lecture.id, { published: true });
        done += 1;
      } catch (error) {
        failures.push(`${lecture.title}: ${apiError(error)}`);
      }
    }
    setPublishing(false);
    await Promise.all([
      client.invalidateQueries({
        queryKey: queryKeys.learning.curriculum(courseId),
      }),
      client.invalidateQueries({ queryKey: queryKeys.learning.summary() }),
    ]);
    if (done)
      toast.success(
        `Published ${done} ${done === 1 ? "lecture" : "lectures"}. Students can see them now.`,
      );
    if (failures.length)
      toast.error(`Couldn't publish ${failures.length}: ${failures[0]}`);
  };

  if (curriculum.isError)
    return <ErrorEmptyState onRetry={curriculum.refetch} />;

  return (
    <div className="flex max-w-[960px] flex-col gap-6">
      <AlertModal
        isOpen={Boolean(toDelete)}
        onClose={() => setToDelete(null)}
        loading={deleteSection.isPending}
        type="warning"
        title="Delete module"
        description={
          toDelete?.lectures.length
            ? `"${toDelete.title}" still has ${toDelete.lectures.length} lectures. Delete or move them first.`
            : `Delete "${toDelete?.title}"? Students won't see it any more.`
        }
        confirmText="Delete module"
        confirmVariant="destructive"
        onConfirm={async () => {
          if (!toDelete) return;
          try {
            await deleteSection.mutateAsync(toDelete.id);
            toast.success("Module deleted");
          } catch (error) {
            toast.error(apiError(error));
          }
          setToDelete(null);
        }}
      />

      <Link
        href="/learning"
        className="text-primary inline-flex min-h-10 w-fit items-center gap-1 text-sm font-medium"
      >
        <ChevronLeft className="size-4" aria-hidden /> Course content
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">
            {data?.course.title ?? "Loading…"}
          </h1>
          {data ? (
            <p className="text-muted-foreground text-sm">
              {sections.length} modules · {lectures.length} lectures ·{" "}
              {published} published
              {busy ? " · checking video processing every 10 seconds" : ""}
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {data ? (
            <a
              href={`${LEARNING_URL}/courses/${data.course.slug ?? data.course.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-muted inline-flex h-10 items-center gap-1.5 rounded-md border px-3 text-sm font-medium"
            >
              View as student <ExternalLink className="size-3.5" aria-hidden />
            </a>
          ) : null}
          {ready.length ? (
            <button
              type="button"
              onClick={publishAllReady}
              disabled={publishing}
              className="bg-primary text-primary-foreground inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-semibold disabled:opacity-70"
            >
              {publishing ? (
                <Loader2 className="size-4 animate-spin" aria-hidden />
              ) : null}
              Publish {ready.length} ready{" "}
              {ready.length === 1 ? "lecture" : "lectures"}
            </button>
          ) : null}
        </div>
      </div>

      {curriculum.isLoading ? (
        <div
          className="flex flex-col gap-3"
          role="status"
          aria-label="Loading modules"
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-muted h-28 animate-pulse rounded-lg" />
          ))}
        </div>
      ) : (
        <>
          {sections.length ? (
            <SortableList
              items={sections}
              onReorder={onReorderSections}
              disabled={reorderSections.isPending}
              className="flex flex-col gap-4"
              renderItem={(section, handle) => (
                <SectionCard
                  section={section}
                  index={sections.findIndex((s) => s.id === section.id)}
                  handle={handle}
                  courseId={courseId}
                  onDelete={setToDelete}
                />
              )}
            />
          ) : (
            <div className="bg-background rounded-lg border p-6 text-sm">
              <p className="font-medium">This course has no modules yet.</p>
              <p className="text-muted-foreground mt-1">
                Add a module (for example &quot;Week 1: HTML basics&quot;), then
                add lectures to it.
              </p>
            </div>
          )}

          <div className="bg-background rounded-lg border border-dashed p-4">
            {addingSection ? (
              <InlineForm
                label="Module title"
                placeholder="e.g. Week 1: HTML basics"
                submitLabel="Add module"
                onCancel={() => setAddingSection(false)}
                onSubmit={async (title) => {
                  await createSection.mutateAsync(title);
                  setAddingSection(false);
                }}
              />
            ) : (
              <button
                type="button"
                onClick={() => setAddingSection(true)}
                className="text-primary inline-flex h-10 items-center gap-1.5 rounded-md px-2 text-sm font-semibold hover:underline"
              >
                <Plus className="size-4" aria-hidden /> Add module
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
