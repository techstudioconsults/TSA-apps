"use client";

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
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import {
  useClassByIdQuery,
  useUpdateClassMutation,
} from "@/services/classes/class.queries";
import { classFormData, classFormSchema } from "@/schemas";
import { useCoursesQuery } from "@/services/courses/course.queries";
import { Icons } from "@workspace/ui/icons";
import { toast } from "sonner";

const EditClassForm = () => {
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("classId");

  const formMethods = useForm<classFormData>({
    resolver: zodResolver(classFormSchema),
    defaultValues: {
      title: "",
      fee: "",
      startDate: "",
      courseId: "",
      type: "weekday",
      description: "",
    },
  });

  const { handleSubmit, reset } = formMethods;
  const { data: courses } = useCoursesQuery({});
  const { data: classData } = useClassByIdQuery(id || "");
  const { mutateAsync: updateClass, isPending } = useUpdateClassMutation();

  useEffect(() => {
    if (!classData) return;
    reset({
      title: classData.title || "",
      description: classData.description || "",
      fee: String(classData.fee || ""),
      startDate: classData.startDate?.slice(0, 10) || "",
      type: (classData.type as any) || "weekday",
      courseId: classData.course?.id || "",
    });
  }, [classData, reset]);

  const onSubmit = async (data: classFormData) => {
    if (!id) {
      setFormError("Missing class id");
      return;
    }

    await updateClass(
      {
        id,
        payload: {
          title: data.title,
          description: data.description,
          fee: data.fee,
          startDate: data.startDate,
          type: data.type,
        },
      },
      {
        onSuccess: () => {
          setShowSuccessModal(true);
        },
        onError: (error: any) => {
          toast.error("An error occurred while updating the class.", {
            description:
              error?.response.data.message || "Failed to update class.",
          });
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

  // values for courseId and type are managed by FormField / useFormContext

  return (
    <Wrapper className="max-w-4xl p-0 my-0">
      <FormProvider {...formMethods}>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Card className="border-none space-y-5 p-5">
            <CardHeader className=" gap-2 flex flex-row items-center px-6 py-4">
              <span className="size-14 mb-0 inline-flex items-center justify-center rounded-md bg-success/10 text-success">
                <Icons.users className="stroke-3" size={30} />
              </span>
              <div>
                <CardTitle className="text-xl gap-2 font-bold tracking-tight">
                  Edit Class
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Update the fields below and save your changes.
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {formError && (
                <p className="font-bold text-destructive">{formError}</p>
              )}

              <FormField
                name="title"
                label="Title"
                placeholder="e.g., Cohort Alpha"
                type="text"
                disabled={isPending}
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  name="fee"
                  label="Fee"
                  type="text"
                  placeholder="50000"
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
                {isPending ? "Updating..." : "Update Class"}
              </CustomButton>
            </CardFooter>
          </Card>
        </form>
        <AlertModal
          isOpen={showCancelModal}
          onClose={() => setShowCancelModal(false)}
          onConfirm={handleConfirmCancel}
          title="Cancel Edit?"
          description="You have unsaved changes. Are you sure you want to cancel editing this class?"
          type="warning"
          confirmText="Cancel Edit"
          confirmVariant="destructiveOutline"
          cancelText="Continue Editing"
          cancelVariant="primary"
        />
        <AlertModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          title="Updated Successfully"
          description="Class has been updated successfully."
          onConfirm={handleViewClass}
          type={"success"}
        />
      </FormProvider>
    </Wrapper>
  );
};

export default EditClassForm;
