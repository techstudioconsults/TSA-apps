"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  Label,
} from "@workspace/ui/components";
import {
  CustomButton,
  FormField,
  Wrapper,
  FileUpload,
} from "@workspace/ui/lib";
import {
  useCourseByIdQuery,
  useUpdateCourseMutation,
} from "@/services/courses/course.queries";
import { CourseFormSchema, courseFormData } from "@/schemas";
import { toast } from "sonner";

export default function EditCoursePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseid") || "";

  const { data: courseData, isLoading } = useCourseByIdQuery(courseId);
  const { mutateAsync: updateCourse, isPending } = useUpdateCourseMutation();

  const formMethods = useForm<courseFormData>({
    // In edit mode, curriculum should be optional
    resolver: zodResolver(CourseFormSchema.omit({ curriculum: true })),
    defaultValues: {
      title: "",
      about: "",
      onlineDuration: 0,
      weekdayDuration: 0,
      weekendDuration: 0,
      curriculum: undefined,
    },
  });

  useEffect(() => {
    if (!courseData) return;
    formMethods.reset({
      title: courseData.title || "",
      about: courseData.about || "",
      onlineDuration: courseData.duration?.online ?? 0,
      weekdayDuration: courseData.duration?.weekday ?? 0,
      weekendDuration: courseData.duration?.weekend ?? 0,
    });
  }, [courseData, formMethods]);

  const onSubmit = async (data: courseFormData) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("about", data.about);
    formData.append("onlineDuration", String(data.onlineDuration));
    formData.append("weekdayDuration", String(data.weekdayDuration));
    formData.append("weekendDuration", String(data.weekendDuration));

    if (typeof File !== "undefined" && data.curriculum instanceof File) {
      formData.append("curriculum", data.curriculum);
    }

    await updateCourse(
      {
        id: courseId,
        payload: formData as unknown as courseFormData,
      },
      {
        onError: (error) => {
          toast.error(
            `Error updating course: ${error.response?.data.message || error}`,
          );
        },
        onSuccess: () => {
          toast.success(`Course updated successfully`, {
            description: `${data.title} has been updated.`,
          });
          router.push("/courses");
        },
      },
    );
  };

  return (
    <Wrapper className="max-w-4xl py-8">
      <FormProvider {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <Card className="border-none">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-semibold tracking-tight">
                Edit Course
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Update details to keep information accurate and helpful.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                name="title"
                label="Title"
                placeholder="Introduction to Programming"
                type="text"
                disabled={isLoading}
              />

              <FormField
                name="about"
                label="About"
                placeholder="Brief course overview"
                type="textarea"
                disabled={isLoading}
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <FormField
                  name="onlineDuration"
                  label="Online Duration (weeks)"
                  type="number"
                  placeholder="12"
                  disabled={isLoading}
                />

                <FormField
                  name="weekdayDuration"
                  label="Weekday Duration (weeks)"
                  type="number"
                  placeholder="12"
                  disabled={isLoading}
                />

                <FormField
                  name="weekendDuration"
                  label="Weekend Duration (weeks)"
                  type="number"
                  placeholder="12"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-base font-medium">
                  Curriculum <span className="text-destructive ml-1">*</span>
                </Label>
                <p className="text-xs text-muted-foreground">
                  Upload a single file (PDF or Word). This will be shared with
                  learners.
                </p>
                <Controller
                  name="curriculum"
                  control={formMethods.control}
                  render={({ field }) => (
                    <FileUpload
                      onFileChange={(files) => {
                        if (files.length > 0) {
                          const file = files[0];
                          field.onChange(file);
                        }
                      }}
                      acceptedFileTypes=".pdf,.doc,.docx"
                      maxFiles={1}
                    />
                  )}
                />
                {typeof courseData?.curriculum === "string" &&
                  courseData.curriculum &&
                  (() => {
                    let name = "";
                    try {
                      const url = new URL(courseData.curriculum as string);
                      name = url.pathname.split("/").pop() || "";
                    } catch {
                      name =
                        (courseData.curriculum as string).split("/").pop() ||
                        "";
                    }
                    name = decodeURIComponent(name);
                    return (
                      <p className="text-xs text-muted-foreground mt-2">
                        Current curriculum:{" "}
                        <span className="font-medium break-all">{name}</span>
                      </p>
                    );
                  })()}
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-end gap-3 border-t px-6 py-4">
              <CustomButton
                type="button"
                variant="secondary"
                onClick={() => router.push("/courses")}
                size="sm"
              >
                Cancel
              </CustomButton>
              <CustomButton
                type="submit"
                variant="primary"
                disabled={isPending}
                size="sm"
              >
                {isPending ? "Updating..." : "Update Course"}
              </CustomButton>
            </CardFooter>
          </Card>
        </form>
      </FormProvider>
    </Wrapper>
  );
}
