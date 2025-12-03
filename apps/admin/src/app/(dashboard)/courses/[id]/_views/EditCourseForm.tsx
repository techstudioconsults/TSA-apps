"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  useCourseByIdQuery,
  useUpdateCourseMutation,
} from "@/lib/react-query/courses";
import { courseFormData, CourseFormSchema } from "@/schemas";
import ConfirmationModal from "@/app/(dashboard)/_components/modals/ConfirmationModal";
import { ErrorEmptyState } from "@workspace/ui/lib";
import SuccessModal from "@/app/(dashboard)/_components/modals/response-modal";

interface ApiError {
  status: number;
  message: string;
  details?: {
    message: string;
    success: boolean;
  };
}

const EditCourseForm = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [course, setCourse] = useState<courseFormData | null>(null);
  const [curriculumFileName, setCurriculumFileName] = useState<string | null>(
    null,
  );

  const router = useRouter();
  const parameters = useParams();
  const id = (parameters as { id?: string | string[] })?.id;

  const formMethods = useForm<courseFormData>({
    resolver: zodResolver(CourseFormSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
      about: "",
      onlineDuration: 0,
      weekdayDuration: 0,
      weekendDuration: 0,
      curriculum: undefined,
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors },
  } = formMethods;

  const handleCancelClick = () => {
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    router.back();
    formMethods.reset();
  };

  const courseId = useMemo(
    () => (Array.isArray(id) ? id[0] : id) as string | undefined,
    [id],
  );
  const {
    data: courseData,
    isLoading,
    isError,
    refetch,
  } = useCourseByIdQuery(courseId ?? "");

  useEffect(() => {
    if (!courseData) return;

    reset({
      title: courseData.title,
      about: courseData.about,
      onlineDuration: courseData.duration?.online ?? 0,
      weekdayDuration: courseData.duration?.weekday ?? 0,
      weekendDuration: courseData.duration?.weekend ?? 0,
    });

    if (courseData.curriculum) {
      let filename = "Current curriculum file";
      if (typeof courseData.curriculum === "string") {
        filename = courseData.curriculum.split("/").pop() || filename;
      } else if (
        typeof File !== "undefined" &&
        courseData.curriculum instanceof File
      ) {
        filename = courseData.curriculum.name;
      }
      setCurriculumFileName(filename);
    }
  }, [courseData, reset]);

  const { mutateAsync: updateCourse } = useUpdateCourseMutation();

  const onSubmit = async (data: courseFormData) => {
    if (!courseId) return;
    setIsSubmitting(true);
    setFormError(null);
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("about", data.about);
      formData.append("onlineDuration", String(data.onlineDuration));
      formData.append("weekdayDuration", String(data.weekdayDuration));
      formData.append("weekendDuration", String(data.weekendDuration));

      if (typeof File !== "undefined" && data.curriculum instanceof File) {
        formData.append("curriculum", data.curriculum);
      }

      await updateCourse({ id: courseId, formData });
      reset();
      setShowSuccessModal(true);
    } catch (error: unknown) {
      const error_ = error as ApiError;
      setFormError(
        `An error occurred while updating: ${error_?.message ?? "Unknown error"}`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewCourse = () => {
    if (showSuccessModal) {
      router.push(`/courses`);
    }
    setShowSuccessModal(false);
  };

  if (isLoading) {
    return (
      <>
        <Loader className="mx-auto h-8 w-8 animate-spin text-blue-500" />
        <p className="text-center">Fetching course details...</p>
      </>
    );
  }

  if (isError) {
    return <ErrorEmptyState onRetry={refetch} />;
  }

  const weekOptions = Array.from({ length: 53 }, (_v, index) => index);

  return (
    <>
      <ConfirmationModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleConfirmCancel}
        title="Cancel Course Edit?"
        description="You have unsaved changes. Are you sure you want to cancel editing this course?"
      />

      <div className="max-w-full">
        <div className="mb-6 flex flex-col gap-3 border-b pb-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => router.back()}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-blue-900 hover:bg-blue-50"
                aria-label="Go back"
                title="Go back"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-semibold text-blue-950">
                Edit Course
              </h1>
            </div>
            <p className="text-sm text-gray-500">
              Modify the fields below to update the course details.
            </p>
            {formError && (
              <p className="rounded-md border border-red-200 bg-red-50 p-2 text-sm text-red-600">
                {formError}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleCancelClick}
              className="inline-flex items-center gap-2 rounded-md border border-red-500 px-4 py-2 text-red-600 transition-colors hover:bg-red-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader className="h-4 w-4 animate-spin text-white" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-8"
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Title Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="title" className="font-semibold text-blue-950">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Course Title"
                  aria-invalid={!!errors.title}
                  className={`w-full rounded-md border px-3 py-2 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 ${
                    errors.title ? "border-red-400" : "border-gray-300"
                  }`}
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              {/* Durations */}
              <div>
                <label className="mb-2 block font-semibold text-blue-950">
                  Duration
                </label>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {/* Online Duration */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="onlineDuration"
                      className="text-sm text-gray-600"
                    >
                      Online
                    </label>
                    <Controller
                      control={control}
                      name="onlineDuration"
                      render={({ field }) => (
                        <select
                          id="onlineDuration"
                          aria-invalid={!!errors.onlineDuration}
                          className={`w-full rounded-md border px-3 py-2 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 ${
                            errors.onlineDuration
                              ? "border-red-400"
                              : "border-gray-300"
                          }`}
                          value={String(field.value ?? 0)}
                          onChange={(event_) =>
                            field.onChange(Number(event_.target.value))
                          }
                        >
                          {weekOptions.map((w) => (
                            <option key={w} value={w}>
                              {w} {w === 1 ? "Week" : "Weeks"}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                    {errors.onlineDuration && (
                      <p className="text-sm text-red-600">
                        {errors.onlineDuration.message}
                      </p>
                    )}
                  </div>

                  {/* Weekend Duration */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="weekendDuration"
                      className="text-sm text-gray-600"
                    >
                      Weekend
                    </label>
                    <Controller
                      control={control}
                      name="weekendDuration"
                      render={({ field }) => (
                        <select
                          id="weekendDuration"
                          aria-invalid={!!errors.weekendDuration}
                          className={`w-full rounded-md border px-3 py-2 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 ${
                            errors.weekendDuration
                              ? "border-red-400"
                              : "border-gray-300"
                          }`}
                          value={String(field.value ?? 0)}
                          onChange={(event_) =>
                            field.onChange(Number(event_.target.value))
                          }
                        >
                          {weekOptions.map((w) => (
                            <option key={w} value={w}>
                              {w} {w === 1 ? "Week" : "Weeks"}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                    {errors.weekendDuration && (
                      <p className="text-sm text-red-600">
                        {errors.weekendDuration.message}
                      </p>
                    )}
                  </div>

                  {/* Weekday Duration */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="weekdayDuration"
                      className="text-sm text-gray-600"
                    >
                      Weekday
                    </label>
                    <Controller
                      control={control}
                      name="weekdayDuration"
                      render={({ field }) => (
                        <select
                          id="weekdayDuration"
                          aria-invalid={!!errors.weekdayDuration}
                          className={`w-full rounded-md border px-3 py-2 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 ${
                            errors.weekdayDuration
                              ? "border-red-400"
                              : "border-gray-300"
                          }`}
                          value={String(field.value ?? 0)}
                          onChange={(event_) =>
                            field.onChange(Number(event_.target.value))
                          }
                        >
                          {weekOptions.map((w) => (
                            <option key={w} value={w}>
                              {w} {w === 1 ? "Week" : "Weeks"}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                    {errors.weekdayDuration && (
                      <p className="text-sm text-red-600">
                        {errors.weekdayDuration.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="flex flex-col gap-2">
              <label htmlFor="about" className="font-semibold text-blue-950">
                About Course
              </label>
              <textarea
                id="about"
                placeholder="Course description"
                rows={6}
                aria-invalid={!!errors.about}
                className={`w-full rounded-md border px-3 py-2 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 ${
                  errors.about ? "border-red-400" : "border-gray-300"
                }`}
                {...register("about")}
              />
              {errors.about && (
                <p className="text-sm text-red-600">{errors.about.message}</p>
              )}
            </div>

            {/* Curriculum */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="curriculum"
                className="font-semibold text-blue-950"
              >
                Curriculum
              </label>
              <Controller
                control={control}
                name="curriculum"
                render={({ field }) => (
                  <input
                    id="curriculum"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    aria-invalid={!!errors.curriculum}
                    onChange={(event_) => {
                      const file = event_.target.files?.[0];
                      field.onChange(file || undefined);
                    }}
                    className={`w-full cursor-pointer rounded-md border px-3 py-2 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-blue-700 hover:file:bg-blue-100 ${
                      errors.curriculum ? "border-red-400" : "border-gray-300"
                    }`}
                  />
                )}
              />

              {!formMethods.getValues("curriculum") && curriculumFileName && (
                <p className="mt-1 text-sm text-gray-600">
                  Current file: {curriculumFileName}
                  <span className="ml-2 text-blue-500">(unchanged)</span>
                </p>
              )}

              {formMethods.getValues("curriculum") instanceof File && (
                <p className="mt-1 text-sm text-gray-600">
                  Selected file:{" "}
                  {(formMethods.getValues("curriculum") as File).name}
                  <span className="ml-2 text-green-600">(new)</span>
                </p>
              )}

              {errors.curriculum && (
                <p className="text-sm text-red-600">
                  {errors.curriculum.message}
                </p>
              )}
            </div>

            {/* Footer actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleCancelClick}
                className="inline-flex items-center gap-2 rounded-md border border-red-500 px-4 py-2 text-red-600 transition-colors hover:bg-red-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin text-white" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Course Updated Successfully"
        description="Course has been updated and saved successfully."
        actionLabel="Continue"
        onAction={handleViewCourse}
      />
    </>
  );
};

export default EditCourseForm;
