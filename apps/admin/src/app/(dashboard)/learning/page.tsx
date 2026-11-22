"use client";

import Link from "next/link";

import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components";
import { ErrorEmptyState } from "@workspace/ui/lib";
import { useCoursesSummaryQuery } from "@/services/learning/learning.queries";
import type { CourseContentSummary } from "@/services/learning/learning.types";
import { StatusPill } from "./_components/status-pill";

function ContentStatus({ course }: { course: CourseContentSummary }) {
  const pills = [];
  if (course.failed)
    pills.push(
      <StatusPill key="f" tone="danger">
        {course.failed} failed
      </StatusPill>,
    );
  if (course.processing)
    pills.push(
      <StatusPill key="p" tone="info">
        {course.processing} processing
      </StatusPill>,
    );
  if (course.readyToPublish)
    pills.push(
      <StatusPill key="r" tone="warning">
        {course.readyToPublish} ready to publish
      </StatusPill>,
    );
  if (!pills.length) {
    pills.push(
      course.lectures === 0 ? (
        <StatusPill key="e" tone="neutral">
          No content yet
        </StatusPill>
      ) : (
        <StatusPill key="ok" tone="success">
          All published
        </StatusPill>
      ),
    );
  }
  return <div className="flex flex-wrap gap-1.5">{pills}</div>;
}

export default function CourseContentPage() {
  const { data, isLoading, isError, refetch } = useCoursesSummaryQuery();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Course content</h1>
        <p className="text-muted-foreground text-sm">
          Videos and notes students see on learning.techstudioacademy.com. Pick
          a course to add modules and lectures.
        </p>
      </div>

      {isError ? (
        <ErrorEmptyState onRetry={refetch} />
      ) : (
        <Card className="border-none shadow-none">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-muted-foreground">
                    Course
                  </TableHead>
                  <TableHead className="text-muted-foreground text-right">
                    Modules
                  </TableHead>
                  <TableHead className="text-muted-foreground text-right">
                    Lectures
                  </TableHead>
                  <TableHead className="text-muted-foreground text-right">
                    Published
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    Status
                  </TableHead>
                  <TableHead className="text-muted-foreground text-right">
                    Active students
                  </TableHead>
                  <TableHead className="text-muted-foreground text-right">
                    Avg. progress
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell colSpan={8}>
                          <div className="bg-muted h-5 animate-pulse rounded" />
                        </TableCell>
                      </TableRow>
                    ))
                  : data?.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">
                          <Link
                            href={`/learning/${course.id}`}
                            className="hover:underline"
                          >
                            {course.title}
                          </Link>
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {course.sections}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {course.lectures}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {course.published}/{course.lectures}
                        </TableCell>
                        <TableCell>
                          <ContentStatus course={course} />
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {course.enrolled}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {course.enrolled ? `${course.averageProgress}%` : "—"}
                        </TableCell>
                        <TableCell className="text-right">
                          <Link
                            href={`/learning/${course.id}`}
                            className="text-primary inline-flex min-h-10 items-center rounded-md px-3 text-sm font-semibold hover:underline"
                          >
                            Manage content
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                {!isLoading && data?.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-muted-foreground py-10 text-center"
                    >
                      No courses yet. Create one under Courses first.
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
