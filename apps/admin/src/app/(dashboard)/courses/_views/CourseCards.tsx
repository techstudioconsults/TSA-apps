"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Badge,
  Separator,
} from "@workspace/ui/components";
import { CalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import {
  AlertModal,
  CustomButton,
  EmptyState,
  ErrorEmptyState,
} from "@workspace/ui/lib";
import { Icons } from "@workspace/ui/icons";
import {
  useCoursesQuery,
  useDeleteCourseMutation,
} from "@/services/courses/course.queries";
import { Course } from "@/services/courses/course.service";

const CourseCards = () => {
  const [warningModalOpen, setWarningModalOpen] = useState(false);
  const [selectedCourseId] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const router = useRouter();

  const {
    data: coursesData,
    isLoading,
    isError,
    refetch,
  } = useCoursesQuery({});
  const courses: Course[] = useMemo(
    () => coursesData?.data.items ?? [],
    [coursesData],
  );

  const { mutateAsync: deleteCourse, isPending: isDeleting } =
    useDeleteCourseMutation();

  const openWarningModal = () => {
    setWarningModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedCourseId) {
      await deleteCourse(selectedCourseId);
      setWarningModalOpen(false);
      setShowSuccessModal(true);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card
            key={i}
            className="animate-pulse flex flex-col justify-between min-h-[274px] border-none shadow-none"
          >
            <CardHeader>
              <div className="h-4 w-1/2 rounded bg-muted" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-3 w-full rounded bg-muted" />
                <div className="size-3/4 rounded bg-muted" />
                <div className="h-3 w-2/4 rounded bg-muted" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-4">
              <div className="h-8 w-24 rounded bg-muted" />
              <div className="h-8 w-24 rounded bg-muted" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (!courses) {
    return (
      <EmptyState
        icon={
          <Icons.book className="size-10 p-1.5 bg-primary/10 rounded-md text-primary" />
        }
        title="Course not found"
        description={"No courses available."}
        className="bg-background"
      />
    );
  }

  if (isError) {
    return <ErrorEmptyState onRetry={refetch} />;
  }

  const handleContinue = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <AlertModal
        isOpen={warningModalOpen}
        onClose={() => setWarningModalOpen(false)}
        onConfirm={confirmDelete}
        type={"warning"}
        title={"Delete Course"}
        description={
          "Are you sure you want to delete this course? This action cannot be undone."
        }
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
        {courses.map((course: Course) => (
          <Card
            key={course.id}
            className="group overflow-hidden flex flex-col justify-between border-none"
          >
            <CardHeader className="flex flex-row items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="rounded bg-primary/10 p-2 text-primary">
                  <Icons.book className="size-4" />
                </span>
                <CardTitle className="text-base capitalize">
                  {course.title}
                </CardTitle>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <CustomButton
                    variant="ghost"
                    size="icon"
                    disabled={isDeleting}
                    isIconOnly
                    icon={<Icons.ellipsis className="size-4" />}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="min-w-50 shadow-none"
                >
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/courses/edit?courseid=${course.id}`)
                    }
                  >
                    <Icons.edit />
                    Edit Course
                  </DropdownMenuItem>
                  <Separator />
                  <DropdownMenuItem
                    onClick={openWarningModal}
                    className="text-destructive"
                  >
                    <Icons.trash className="text-destructive" />
                    Delete Course
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <p className="text-xs leading-5 mb-6 text-muted-foreground line-clamp-4 mb-4">
                {course.about}
              </p>
              <div className="mt-4 flex justify-between items-center gap-2">
                <Badge className="flex items-center tracking-widest text-[11px] justify-center gap-1 w-full bg-indigo-100 text-indigo-800">
                  <CalendarDays className="size-3" />
                  <span>Weekday: {course.duration?.weekday || 0}w</span>
                </Badge>
                <Badge className="flex  items-center tracking-widest text-[11px] justify-center gap-1 w-full bg-indigo-100 text-indigo-800">
                  <CalendarDays className="size-3" />
                  <span>Weekend: {course.duration?.weekend || 0}w</span>
                </Badge>
                <Badge className="flex  items-center tracking-widest text-[11px] justify-center gap-1 w-full bg-indigo-100 text-indigo-800">
                  <CalendarDays className="size-3" />
                  <span>Online: {course.duration?.online || 0}w</span>
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <CustomButton
                variant="primary"
                onClick={() => router.push(`/courses/${course.id}`)}
              >
                View details
              </CustomButton>
            </CardFooter>
          </Card>
        ))}
      </div>

      <AlertModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Course Deleted Successfully"
        description="Selected Course has been deleted"
        onConfirm={handleContinue}
        type={"success"}
      />
    </>
  );
};

export default CourseCards;
