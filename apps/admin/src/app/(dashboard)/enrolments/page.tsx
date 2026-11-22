"use client";

import {
  KeyRound,
  Loader2,
  MoreHorizontal,
  Search,
  UserPlus,
  Users,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components";
import { ErrorEmptyState } from "@workspace/ui/lib";
import {
  useCohortOptionsQuery,
  useCourseEnrolmentsQuery,
  useCourseOptionsQuery,
  useEnrolCohortMutation,
  useEnrolStudentMutation,
  useSendPasswordLinkMutation,
  useUpdateEnrolmentMutation,
} from "@/services/learning/learning.queries";
import type { EnrolmentRow } from "@/services/learning/learning.types";
import { RoleGate } from "../learning/_components/role-gate";
import { StatusPill, type PillTone } from "../learning/_components/status-pill";
import {
  apiError,
  formatDate,
  fromDateInput,
  toDateInput,
} from "../learning/_components/utils";

const PAGE_SIZE = 50;

function accessState(row: EnrolmentRow): { tone: PillTone; label: string } {
  if (row.status === "revoked") return { tone: "danger", label: "Revoked" };
  if (row.expiresAt && new Date(row.expiresAt) <= new Date())
    return { tone: "neutral", label: `Expired ${formatDate(row.expiresAt)}` };
  if (new Date(row.startsAt) > new Date())
    return { tone: "info", label: `Starts ${formatDate(row.startsAt)}` };
  return {
    tone: "success",
    label: row.expiresAt ? `Until ${formatDate(row.expiresAt)}` : "No end date",
  };
}

const field = "border-input bg-background h-10 rounded-md border px-3 text-sm";
const primaryBtn =
  "bg-primary text-primary-foreground inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold disabled:opacity-60";
const secondaryBtn =
  "hover:bg-muted inline-flex h-10 items-center justify-center gap-2 rounded-md border px-4 text-sm font-semibold";

function AccessUntilField({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        Access until{" "}
        <span className="text-muted-foreground font-normal">(optional)</span>
      </label>
      <input
        id={id}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={field}
      />
      <p className="text-muted-foreground text-xs">
        Leave empty for no end date. Access ends at midnight Lagos time.
      </p>
    </div>
  );
}

function EnrolStudentDialog({
  courseId,
  open,
  onOpenChange,
}: {
  courseId: string;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const [email, setEmail] = useState("");
  const [until, setUntil] = useState("");
  const [error, setError] = useState<string | null>(null);
  const enrol = useEnrolStudentMutation(courseId);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Enter the email the student logs in with.");
      return;
    }
    try {
      await enrol.mutateAsync({
        email: email.trim(),
        expiresAt: fromDateInput(until),
      });
      toast.success(`${email.trim()} is enrolled`);
      setEmail("");
      setUntil("");
      onOpenChange(false);
    } catch (err) {
      setError(apiError(err));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
          <DialogHeader>
            <DialogTitle>Enrol a student</DialogTitle>
            <DialogDescription>
              The student must already have an account (added under Students or
              imported).
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="enrol-email" className="text-sm font-medium">
              Student&apos;s email
            </label>
            <input
              id="enrol-email"
              type="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={Boolean(error)}
              className={field}
            />
          </div>
          <AccessUntilField
            id="enrol-until"
            value={until}
            onChange={setUntil}
          />
          {error ? (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          ) : null}
          <DialogFooter>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className={secondaryBtn}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={enrol.isPending}
              className={primaryBtn}
            >
              {enrol.isPending ? (
                <Loader2 className="size-4 animate-spin" aria-hidden />
              ) : null}
              Enrol student
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function EnrolCohortDialog({
  courseId,
  open,
  onOpenChange,
}: {
  courseId: string;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const cohorts = useCohortOptionsQuery(open ? courseId : "");
  const [cohortId, setCohortId] = useState("");
  const [until, setUntil] = useState("");
  const [error, setError] = useState<string | null>(null);
  const enrol = useEnrolCohortMutation(courseId);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!cohortId) {
      setError("Choose a cohort.");
      return;
    }
    try {
      const result = await enrol.mutateAsync({
        cohortId,
        expiresAt: fromDateInput(until),
      });
      const skipped = result.students - result.created;
      toast.success(
        `Enrolled ${result.created} of ${result.students} students${skipped ? ` (${skipped} were already enrolled)` : ""}`,
      );
      setCohortId("");
      setUntil("");
      onOpenChange(false);
    } catch (err) {
      setError(apiError(err));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
          <DialogHeader>
            <DialogTitle>Enrol a cohort</DialogTitle>
            <DialogDescription>
              Enrols every student in the cohort. Students already enrolled in
              this course are left as they are.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="enrol-cohort" className="text-sm font-medium">
              Cohort
            </label>
            <select
              id="enrol-cohort"
              value={cohortId}
              onChange={(e) => setCohortId(e.target.value)}
              className={field}
            >
              <option value="">
                {cohorts.isLoading ? "Loading cohorts…" : "Choose a cohort"}
              </option>
              {cohorts.data?.map((cohort) => (
                <option key={cohort.id} value={cohort.id}>
                  {cohort.title} · {cohort.type} · starts{" "}
                  {formatDate(cohort.startDate)}
                </option>
              ))}
            </select>
            {cohorts.data?.length === 0 ? (
              <p className="text-muted-foreground text-xs">
                This course has no cohorts.
              </p>
            ) : null}
          </div>
          <AccessUntilField
            id="cohort-until"
            value={until}
            onChange={setUntil}
          />
          {error ? (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          ) : null}
          <DialogFooter>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className={secondaryBtn}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={enrol.isPending}
              className={primaryBtn}
            >
              {enrol.isPending ? (
                <Loader2 className="size-4 animate-spin" aria-hidden />
              ) : null}
              Enrol cohort
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ExtendDialog({
  row,
  courseId,
  onClose,
}: {
  row: EnrolmentRow | null;
  courseId: string;
  onClose: () => void;
}) {
  const [until, setUntil] = useState("");
  const update = useUpdateEnrolmentMutation(courseId);
  const open = Boolean(row);
  useEffect(() => setUntil(toDateInput(row?.expiresAt)), [row]);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <form
          className="flex flex-col gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!row) return;
            try {
              await update.mutateAsync({
                enrolmentId: row.id,
                expiresAt: fromDateInput(until),
                status: "active",
              });
              toast.success(
                until
                  ? `Access extended to ${formatDate(fromDateInput(until))}`
                  : "Access no longer expires",
              );
              onClose();
            } catch (err) {
              toast.error(apiError(err));
            }
          }}
        >
          <DialogHeader>
            <DialogTitle>Change access dates</DialogTitle>
            <DialogDescription>
              {row ? `${row.student.firstName} ${row.student.lastName}` : ""}.
              Currently{" "}
              {row?.expiresAt
                ? `until ${formatDate(row.expiresAt)}`
                : "no end date"}
              . Saving also restores revoked access.
            </DialogDescription>
          </DialogHeader>
          <AccessUntilField
            id="extend-until"
            value={until}
            onChange={setUntil}
          />
          <DialogFooter>
            <button type="button" onClick={onClose} className={secondaryBtn}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={update.isPending}
              className={primaryBtn}
            >
              {update.isPending ? (
                <Loader2 className="size-4 animate-spin" aria-hidden />
              ) : null}
              Save
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function RowActions({
  row,
  courseId,
  onExtend,
}: {
  row: EnrolmentRow;
  courseId: string;
  onExtend: (row: EnrolmentRow) => void;
}) {
  const update = useUpdateEnrolmentMutation(courseId);
  const sendLink = useSendPasswordLinkMutation();
  const name = `${row.student.firstName} ${row.student.lastName}`;

  const setStatus = (status: EnrolmentRow["status"], message: string) =>
    update.mutate(
      { enrolmentId: row.id, status },
      {
        onSuccess: () => toast.success(message),
        onError: (e) => toast.error(apiError(e)),
      },
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="hover:bg-muted flex size-9 items-center justify-center rounded-md"
        aria-label={`Actions for ${name}`}
      >
        {update.isPending || sendLink.isPending ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          <MoreHorizontal className="size-4" aria-hidden />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => onExtend(row)}>
          Change access dates
        </DropdownMenuItem>
        {row.student.userId ? (
          <DropdownMenuItem
            onSelect={() =>
              sendLink.mutate(row.student.userId!, {
                onSuccess: () =>
                  toast.success(
                    `Set-password link sent to ${row.student.email}`,
                  ),
                onError: (e) => toast.error(apiError(e)),
              })
            }
          >
            <KeyRound className="mr-2 size-4" aria-hidden /> Email a
            set-password link
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuSeparator />
        {row.status === "revoked" ? (
          <DropdownMenuItem
            onSelect={() => setStatus("active", `${name} has access again`)}
          >
            Restore access
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            className="text-red-600"
            onSelect={() => setStatus("revoked", `${name}'s access is revoked`)}
          >
            Revoke access
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function EnrolmentsView() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const courseId = params.get("course") ?? "";
  const page = Math.max(1, Number(params.get("page")) || 1);

  const courses = useCourseOptionsQuery();
  const enrolments = useCourseEnrolmentsQuery(courseId, page);
  const [search, setSearch] = useState("");
  const [studentOpen, setStudentOpen] = useState(false);
  const [cohortOpen, setCohortOpen] = useState(false);
  const [extending, setExtending] = useState<EnrolmentRow | null>(null);

  const setParams = (next: Record<string, string | null>) => {
    const sp = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(next)) {
      if (v) sp.set(k, v);
      else sp.delete(k);
    }
    router.replace(`${pathname}?${sp.toString()}`);
  };

  const rows = useMemo(() => {
    const all = enrolments.data?.enrolments ?? [];
    const q = search.trim().toLowerCase();
    if (!q) return all;
    return all.filter((r) =>
      `${r.student.firstName} ${r.student.lastName} ${r.student.email}`
        .toLowerCase()
        .includes(q),
    );
  }, [enrolments.data, search]);

  const total = enrolments.data?.total ?? 0;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Enrolments</h1>
        <p className="text-muted-foreground text-sm">
          Who can watch each course on the learning site, until when, and how
          far they&apos;ve got.
        </p>
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <div className="flex min-w-[260px] flex-col gap-1.5">
          <label htmlFor="course-select" className="text-sm font-medium">
            Course
          </label>
          <select
            id="course-select"
            value={courseId}
            onChange={(e) =>
              setParams({ course: e.target.value || null, page: null })
            }
            className={field}
          >
            <option value="">
              {courses.isLoading ? "Loading courses…" : "Choose a course"}
            </option>
            {courses.data?.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
        {courseId ? (
          <div className="ml-auto flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCohortOpen(true)}
              className={secondaryBtn}
            >
              <Users className="size-4" aria-hidden /> Enrol a cohort
            </button>
            <button
              type="button"
              onClick={() => setStudentOpen(true)}
              className={primaryBtn}
            >
              <UserPlus className="size-4" aria-hidden /> Enrol a student
            </button>
          </div>
        ) : null}
      </div>

      {!courseId ? (
        <div className="bg-background text-muted-foreground rounded-lg border p-6 text-sm">
          Choose a course to see its students.
        </div>
      ) : enrolments.isError ? (
        <ErrorEmptyState onRetry={enrolments.refetch} />
      ) : (
        <div className="bg-background flex flex-col rounded-lg border">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b p-3">
            <div className="relative">
              <label htmlFor="enrolment-search" className="sr-only">
                Search this page by name or email
              </label>
              <Search
                className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2"
                aria-hidden
              />
              <input
                id="enrolment-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name or email"
                className={`${field} w-72 pl-9`}
              />
            </div>
            <span className="text-muted-foreground text-sm">
              {total} {total === 1 ? "student" : "students"} ·{" "}
              {enrolments.data?.totalLectures ?? 0} published lectures
            </span>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-muted-foreground">Student</TableHead>
                <TableHead className="text-muted-foreground">Cohort</TableHead>
                <TableHead className="text-muted-foreground w-48">
                  Progress
                </TableHead>
                <TableHead className="text-muted-foreground">
                  Last active
                </TableHead>
                <TableHead className="text-muted-foreground">Access</TableHead>
                <TableHead className="text-muted-foreground">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enrolments.isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={6}>
                        <div className="bg-muted h-5 animate-pulse rounded" />
                      </TableCell>
                    </TableRow>
                  ))
                : rows.map((row) => {
                    const access = accessState(row);
                    return (
                      <TableRow key={row.id}>
                        <TableCell>
                          <div className="font-medium">
                            {row.student.firstName} {row.student.lastName}
                          </div>
                          <div className="text-muted-foreground text-xs">
                            {row.student.email}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          {row.cohort?.title ?? (
                            <span className="text-muted-foreground">
                              Individual
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              role="progressbar"
                              aria-label={`Progress for ${row.student.firstName}`}
                              aria-valuenow={row.progress.percent}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              className="bg-muted h-2 flex-1 overflow-hidden rounded-full"
                            >
                              <div
                                className="bg-primary h-2"
                                style={{ width: `${row.progress.percent}%` }}
                              />
                            </div>
                            <span className="w-10 text-right text-xs tabular-nums">
                              {row.progress.percent}%
                            </span>
                          </div>
                          <div className="text-muted-foreground mt-1 text-xs">
                            {row.progress.completedLectures} of{" "}
                            {row.progress.totalLectures} lectures
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          {row.progress.lastActivityAt ? (
                            formatDate(row.progress.lastActivityAt)
                          ) : (
                            <span className="text-muted-foreground">
                              Not started
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <StatusPill tone={access.tone}>
                            {access.label}
                          </StatusPill>
                        </TableCell>
                        <TableCell className="text-right">
                          <RowActions
                            row={row}
                            courseId={courseId}
                            onExtend={setExtending}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              {!enrolments.isLoading && rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-muted-foreground py-10 text-center text-sm"
                  >
                    {search
                      ? "No students on this page match that search."
                      : "No one is enrolled in this course yet."}
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
          {pages > 1 ? (
            <nav
              aria-label="Pages"
              className="flex items-center justify-between border-t p-3 text-sm"
            >
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setParams({ page: String(page - 1) })}
                className={`${secondaryBtn} disabled:opacity-50`}
              >
                Previous
              </button>
              <span>
                Page {page} of {pages}
              </span>
              <button
                type="button"
                disabled={page >= pages}
                onClick={() => setParams({ page: String(page + 1) })}
                className={`${secondaryBtn} disabled:opacity-50`}
              >
                Next
              </button>
            </nav>
          ) : null}
        </div>
      )}

      {courseId ? (
        <>
          <EnrolStudentDialog
            courseId={courseId}
            open={studentOpen}
            onOpenChange={setStudentOpen}
          />
          <EnrolCohortDialog
            courseId={courseId}
            open={cohortOpen}
            onOpenChange={setCohortOpen}
          />
          <ExtendDialog
            row={extending}
            courseId={courseId}
            onClose={() => setExtending(null)}
          />
        </>
      ) : null}
    </div>
  );
}

export default function EnrolmentsPage() {
  return (
    <RoleGate allow="enrolments">
      <Suspense>
        <EnrolmentsView />
      </Suspense>
    </RoleGate>
  );
}
