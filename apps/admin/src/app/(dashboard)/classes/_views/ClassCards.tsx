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
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Avatar,
  AvatarFallback,
} from "@workspace/ui/components";
import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
// Removed duplicate import of Icons
import { useEffect, useMemo, useState } from "react";

import {
  AlertModal,
  cn,
  CustomButton,
  EmptyState,
  ErrorEmptyState,
} from "@workspace/ui/lib";
import {
  useDeleteClassMutation,
  useClassesQuery,
} from "@/services/classes/class.queries";
import { useCoursesQuery } from "@/services/courses/course.queries";
import { Class } from "@/services/classes/class.service";
import { Course } from "@/services/courses/course.service";
import { Icons } from "@workspace/ui/icons";
// NOTE: CustomButton is already imported above from '@workspace/ui/lib'

// Renders classes for a specific course id
const CourseClassesTabContent = ({
  courseId,
  onEdit,
  onDelete,
  isDeleting,
}: {
  courseId: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}) => {
  // const router = useRouter()
  const {
    data: classesData,
    isLoading,
    isError,
    refetch,
  } = useClassesQuery(courseId, {});
  const classes: Class[] = useMemo(
    () => classesData?.data.items ?? [],
    [classesData],
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card
            key={i}
            className="animate-pulse flex flex-col justify-between min-h-[240px] border-none shadow-none"
          >
            <CardHeader>
              <div className="h-4 w-1/2 rounded bg-muted" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-3 w-full rounded bg-muted" />
                <div className="h-3 w-3/4 rounded bg-muted" />
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

  if (!classes || classes.length === 0) {
    return (
      <EmptyState
        icon={
          <Icons.logo className="size-10 p-1.5 bg-primary/10 rounded-md text-primary" />
        }
        title="No classes available"
        description={"Switch courses with the tabs above to view classes."}
        className="bg-background"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 py-6 md:grid-cols-2 lg:grid-cols-3">
      {classes.map((item) => {
        const startDateStr = item.startDate
          ? new Date(item.startDate).toLocaleDateString()
          : "TBD";
        const studentCount = item.students?.length ?? 0;

        return (
          <Card
            key={item.id}
            className={cn("group overflow-hidden border-none")}
          >
            <CardHeader className="flex-row items-start justify-between">
              <div className="flex items-start gap-3">
                <Avatar className="size-10 bg-secondary/5">
                  {item.course?.id ? (
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                      {item.course?.title?.[0] ?? item.title?.[0]}
                    </AvatarFallback>
                  ) : (
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                      {item.title?.[0]}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                  <Badge
                    variant="secondaryOutline"
                    className="text-[10px] tracking-widest"
                  >
                    {item.type ?? "General"}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
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
                    <DropdownMenuItem onClick={() => onEdit(item.id)}>
                      <Icons.edit />
                      Edit Class
                    </DropdownMenuItem>
                    <Separator />
                    <DropdownMenuItem
                      onClick={() => onDelete(item.id)}
                      className="text-destructive"
                    >
                      <Icons.trash className="text-destructive" />
                      Delete Class
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-xs leading-5 mb-6 text-muted-foreground line-clamp-4 mb-4">
                {item.description || "No class description provided."}
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="p-2 bg-primary/10 rounded-md">
                    <Icons.calendar className="size-4" />
                  </span>
                  <div>
                    <p className="text-xs">Starts</p>
                    <p className="text-sm font-semibold text-primary">
                      {startDateStr}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="p-2 bg-primary/10 rounded-md">
                    <Icons.user2 className="size-4" />
                  </span>
                  <div>
                    <p className="text-xs">Students</p>
                    <p className="text-sm font-semibold text-primary">
                      {studentCount}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="p-2 bg-primary/10 rounded-md">
                    <Icons.money className="size-4" />
                  </span>
                  <div>
                    <p className="text-xs">Fee</p>
                    <p className="text-sm font-semibold text-primary">
                      {item.fee}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="p-2 bg-primary/10 rounded-md">
                    <Icons.duration className="size-4" />
                  </span>
                  <div>
                    <p className="text-xs">Duration</p>
                    <p className="text-sm font-semibold text-primary">
                      {item.duration} Week(s)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>

            {/* <CardFooter className='flex items-center justify-between'>
              <CustomButton
                variant='ghost'
                onClick={() => router.push(`/classes/edit?classId=${item.id}`)}
              >
                Manage
              </CustomButton>
              <CustomButton
                variant='primary'
                onClick={() => router.push(`/classes/${item.id}`)}
              >
                View details
              </CustomButton>
            </CardFooter> */}
          </Card>
        );
      })}
    </div>
  );
};

const ClassCards = () => {
  const [warningModalOpen, setWarningModalOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);

  const router = useRouter();

  const { data: coursesData } = useCoursesQuery({});
  const courses = useMemo(() => coursesData?.data.items ?? [], [coursesData]);
  const initialCourseId = courses[0]?.id ?? null;

  // Ensure active course is set once courses load
  useEffect(() => {
    console.log(courses);

    if (!activeCourseId && initialCourseId) {
      setActiveCourseId(initialCourseId);
    }
  }, [initialCourseId, activeCourseId, courses]);

  const courseIdToUse = activeCourseId ?? initialCourseId ?? "";
  // Per-tab content handles fetching classes; we only track active course id here

  const { mutateAsync: deleteClass, isPending: isDeleting } =
    useDeleteClassMutation();

  // Opens confirmation modal for given class id
  const openWarningModal = (id: string) => {
    setSelectedClassId(id);
    setWarningModalOpen(true);
  };

  // Confirm delete handler - uses selectedClassId state
  const confirmDelete = async () => {
    if (!selectedClassId) return;
    try {
      await deleteClass(selectedClassId);
      setWarningModalOpen(false);
      setShowSuccessModal(true);
    } catch (error) {
      // TODO: Show error feedback
      console.error(error);
      setWarningModalOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={warningModalOpen}
        onClose={() => setWarningModalOpen(false)}
        onConfirm={confirmDelete}
        type={"warning"}
        title={`Delete Class`}
        description={
          "Are you sure you want to delete this class? This action cannot be undone."
        }
      />

      <Tabs
        value={courseIdToUse}
        onValueChange={(val) => setActiveCourseId(val)}
      >
        <TabsList className="flex items-center justify-between h-fit max-w-[1150px] 2xl:max-w-full mx-auto bg-primary/10 gap-2 overflow-x-auto hide-scrollbar">
          {courses.map((course: Course) => (
            <TabsTrigger
              key={course.id}
              value={course.id}
              className={cn(
                "border-b-2 min-w-fit rounded-md border-transparent hover:bg-primary/20 capitalize",
                course.id === courseIdToUse && " font-medium !bg-mid-warning",
              )}
            >
              {course.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {courses.map((course: Course) => (
          <TabsContent key={course.id} value={course.id} className="mt-4">
            <CourseClassesTabContent
              courseId={course.id}
              isDeleting={isDeleting}
              onEdit={(id) => router.push(`/classes/edit?classId=${id}`)}
              onDelete={(id) => openWarningModal(id)}
            />
          </TabsContent>
        ))}
      </Tabs>

      <AlertModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Class Deleted Successfully"
        description="Selected Class has been deleted"
        onConfirm={() => setShowSuccessModal(false)}
        type={"success"}
      />
    </>
  );
};

export default ClassCards;
