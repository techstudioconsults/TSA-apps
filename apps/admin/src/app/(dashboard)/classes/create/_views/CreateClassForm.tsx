"use client";

import { classFormData, classFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@workspace/ui/components";
import {
  AlertModal,
  CustomButton,
  FormField,
  Wrapper,
} from "@workspace/ui/lib";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useCreateClassMutation } from "@/services/classes/class.queries";
import { useCoursesQuery } from "@/services/courses/course.queries";
import { toast } from "sonner";
import { Icons } from "@workspace/ui/icons";

// interface ApiError {
//   status: number;
//   message: string;
//   details?: {
//     message: string;
//     success: boolean;
//   };
// }
const CreateClassForm = () => {
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const router = useRouter();

  const formMethods = useForm<classFormData>({
    resolver: zodResolver(classFormSchema),
    defaultValues: {
      title: "",
      fee: "",
      startDate: "",
      // endDate: "",
      courseId: "",
      type: "weekday",
      description: "",
    },
  });

  const { handleSubmit, reset } = formMethods;
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  // form errors are handled by FormField components via useFormContext
  const { data: courses, isLoading, isError } = useCoursesQuery({});
  // optional local form-level error state

  const { mutateAsync: createClass, isPending } = useCreateClassMutation();

  const onSubmit = async (data: classFormData) => {
    await createClass(
      {
        title: data.title,
        description: data.description,
        fee: data.fee,
        startDate: data.startDate,
        type: data.type,
        courseId: data.courseId,
      },
      {
        onError: (error: any) => {
          toast.error("Something's wrong!", {
            description:
              error?.response.data.message || "Failed to create class.",
          });
        },
        onSuccess: () => {
          toast.success("Class created successfully!", {
            description: "The new class has been created.",
          });
          reset();
          setShowSuccessModal(true);
        },
      },
    );
  };

  const handleCancelClick = () => {
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    reset();
    router.back();
  };

  const handleViewClass = () => {
    if (showSuccessModal) {
      router.push(`/classes`);
    }
    setShowSuccessModal(false);
  };

  if (isError) {
    return <p className="text-center text-red-500">{"error"}</p>;
  }

  if (isLoading) {
    return <p className="animate-zoom-in">Fetching course...</p>;
  }

  // select values are controlled via FormField's Controller

  return (
    <Wrapper className="max-w-4xl p-0 my-0">
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Card className="border-none space-y-5 p-5">
            <CardHeader className=" gap-2 flex flex-row items-center px-6 py-4">
              <span className="size-14 mb-0 inline-flex items-center justify-center rounded-md bg-success/10 text-success">
                <Icons.users className="stroke-3" size={30} />
              </span>
              <div>
                <CardTitle className="text-xl gap-2 font-bold tracking-tight">
                  Create Class
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Fill the details below to create a new class.
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                name="title"
                label="Title"
                placeholder="e.g., Cohort Alpha"
                type="text"
                required
                disabled={isPending}
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  name="fee"
                  label="Fee"
                  type="text"
                  placeholder="50000"
                  required
                  disabled={isPending}
                />

                <FormField
                  name="startDate"
                  label="Start Date"
                  type="date"
                  placeholder="YYYY-MM-DD"
                  disabled={isPending}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  name="courseId"
                  label="Course"
                  type="select"
                  placeholder="Choose a course"
                  required
                  disabled={isPending}
                  options={
                    courses?.data.items.map((c: any) => ({
                      value: c.id,
                      label: c.title,
                    })) ?? []
                  }
                />

                <FormField
                  name="type"
                  label="Preference"
                  type="select"
                  placeholder="Choose a preference"
                  required
                  disabled={isPending}
                  options={[
                    { value: "online", label: "Online" },
                    { value: "weekday", label: "Weekday" },
                    { value: "weekend", label: "Weekend" },
                  ]}
                />
              </div>

              <FormField
                name="description"
                label="Description"
                placeholder="Brief details about this class"
                type="textarea"
                required
                disabled={isPending}
              />
            </CardContent>
            <CardFooter className="flex items-center justify-end gap-3 border-t px-6 py-4">
              <CustomButton
                type="button"
                variant="secondary"
                onClick={handleCancelClick}
              >
                Cancel
              </CustomButton>
              <CustomButton
                type="submit"
                variant="primary"
                disabled={isPending}
              >
                {isPending ? "Creating..." : "Create Class"}
              </CustomButton>
            </CardFooter>
          </Card>
        </form>
        <AlertModal
          isOpen={showCancelModal}
          onClose={() => setShowCancelModal(false)}
          onConfirm={handleConfirmCancel}
          title="Cancel Class Creation?"
          description="You have unsaved changes. Are you sure you want to cancel creating this class?"
          type={"warning"}
        />
        <AlertModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          title="Created Successfully"
          description="Class has been created and saved successfully."
          onConfirm={handleViewClass}
          type={"success"}
        />
      </FormProvider>
    </Wrapper>
  );
};

export default CreateClassForm;
