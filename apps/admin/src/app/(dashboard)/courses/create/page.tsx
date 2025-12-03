"use client";

import { useRouter } from "next/navigation";
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
import { useCreateCourseMutation } from "@/services/courses/course.queries";
import { CourseFormSchema, courseFormData } from "@/schemas";
import { toast } from "sonner";

export default function CreateCoursePage() {
  const router = useRouter();
  const { mutateAsync: createCourse, isPending } = useCreateCourseMutation();

  const formMethods = useForm<courseFormData>({
    resolver: zodResolver(CourseFormSchema),
    defaultValues: {
      title: "",
      about: "",
      onlineDuration: 0,
      weekdayDuration: 0,
      weekendDuration: 0,
    },
  });

  const onSubmit = async (data: courseFormData) => {
    await createCourse(data, {
      onError: (error) => {
        toast.error(
          `Error creating course: ${error.response?.data.message || error}`,
        );
      },
      onSuccess: () => {
        toast.success(`Course created successfully`, {
          description: `${data.title} Course created, check the courses list to view it.`,
        });
        router.push("/courses");
      },
    });
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
                Create Course
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Provide clear details so learners understand the value and
                structure.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                name="title"
                label="Title"
                placeholder="Introduction to Programming"
                type="text"
                required
              />

              <FormField
                name="about"
                label="About"
                placeholder="Brief course overview"
                type="textarea"
                required
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <FormField
                  name="onlineDuration"
                  label="Online Duration (weeks)"
                  type="number"
                  placeholder="12"
                  required
                />

                <FormField
                  name="weekdayDuration"
                  label="Weekday Duration (weeks)"
                  type="number"
                  placeholder="12"
                  required
                />

                <FormField
                  name="weekendDuration"
                  label="Weekend Duration (weeks)"
                  type="number"
                  placeholder="12"
                  required
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
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-end gap-3 border-t px-6 py-4">
              <CustomButton
                type="button"
                variant="secondary"
                onClick={() => router.push("/courses")}
              >
                Cancel
              </CustomButton>
              <CustomButton
                type="submit"
                variant="primary"
                disabled={isPending}
              >
                {isPending ? "Creating..." : "Create Course"}
              </CustomButton>
            </CardFooter>
          </Card>
        </form>
      </FormProvider>
    </Wrapper>
  );
}
