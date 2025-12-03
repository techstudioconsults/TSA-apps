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
import { toast } from "sonner";
import { useCreateCourseMutation } from "@/services/courses/course.queries";
import { CourseFormSchema, courseFormData } from "@/schemas";

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
    await createCourse(data);
    toast.success("Course created successfully");
    router.push("/courses");
  };

  return (
    <Wrapper className="max-w-3xl py-6">
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Create Course</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                <Label>Curriculum (optional)</Label>
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
            <CardFooter className="flex justify-end gap-2">
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
