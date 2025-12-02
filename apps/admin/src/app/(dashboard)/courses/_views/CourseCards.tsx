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
import { CalendarDays, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import CourseModal from "./CourseModal";
import WarningModal from "./WarningModal";
import SuccessModal from "../../_components/topnav/response-modal";
import {
  useCoursesQuery,
  useDeleteCourseMutation,
} from "@/lib/react-query/courses";
import { CustomButton, ErrorEmptyState } from "@workspace/ui/lib";
import { Icons } from "@workspace/ui/icons";

const CourseCards = () => {
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [warningModalOpen, setWarningModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const router = useRouter();

  const { data: coursesData, isLoading, isError, refetch } = useCoursesQuery();
  const courses = useMemo(() => coursesData ?? [], [coursesData]);

  const { mutateAsync: deleteCourse, isPending: isDeleting } =
    useDeleteCourseMutation();

  const openCourseModal = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCourseModalOpen(true);
  };

  const openWarningModal = () => {
    setWarningModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedCourseId) {
      await deleteCourse({ id: selectedCourseId });
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

  if (isError) {
    return <ErrorEmptyState onRetry={refetch} />;
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="text-center">
        <p>No courses available</p>
      </div>
    );
  }

  const handleContinue = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <WarningModal
        isOpen={warningModalOpen}
        onClose={() => setWarningModalOpen(false)}
        onConfirm={confirmDelete}
      />

      <CourseModal
        open={courseModalOpen}
        setOpen={setCourseModalOpen}
        onEdit={() => router.push(`/courses/${selectedCourseId}`)}
        onDelete={openWarningModal}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id} className="group overflow-hidden border-none">
            <CardHeader className="flex flex-row items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="rounded bg-primary-75 p-2 text-primary">
                  <Icons.book className="h-4 w-4" />
                </span>
                <CardTitle className="text-base">{course.title}</CardTitle>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <CustomButton
                    variant="ghost"
                    size="icon"
                    disabled={isDeleting}
                    isIconOnly
                    icon={<MoreVertical className="h-4 w-4" />}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="min-w-50 shadow-none"
                >
                  <DropdownMenuItem
                    onClick={() => router.push(`/courses/${course.id}`)}
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
            <CardContent>
              <p className="line-clamp-3 text-sm text-muted-foreground">
                {course.about}
              </p>
              <div className="mt-4 flex justify-between items-center gap-2">
                <Badge
                  variant="outline"
                  className="flex items-center justify-center gap-1 w-full"
                >
                  <CalendarDays className="size-3" />
                  <span>Weekday: {course.duration?.weekday || 0}w</span>
                </Badge>
                <Badge
                  variant="outline"
                  className="flex items-center justify-center gap-1 w-full"
                >
                  <CalendarDays className="size-3" />
                  <span>Weekend: {course.duration?.weekend || 0}w</span>
                </Badge>
                <Badge
                  variant="outline"
                  className="flex items-center justify-center gap-1 w-full"
                >
                  <CalendarDays className="size-3" />
                  <span>Online: {course.duration?.online || 0}w</span>
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <CustomButton
                variant="ghost"
                onClick={() => router.push(`/courses/${course.id}`)}
              >
                View details
              </CustomButton>
              <CustomButton
                variant="primary"
                onClick={() => openCourseModal(course.id)}
              >
                Manage
              </CustomButton>
            </CardFooter>
          </Card>
        ))}
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Course Deleted Successfully"
        description="Selected Course has been deleted"
        actionLabel="Continue"
        onAction={handleContinue}
      />
    </>
  );
};

export default CourseCards;
