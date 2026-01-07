"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { toast } from "sonner";
import {
  useCreateMarketingCycleMutation,
  useUpdateMarketingCycleMutation,
} from "@/services/marketing-cycle/marketing-cycle.queries";
import {
  MarketingCycle,
  MarketingCycleFormData,
  marketingCycleSchema,
} from "@/schemas/marketing-cycle.schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components";

interface Properties {
  isOpen: boolean;
  onClose: () => void;
  initialData?: MarketingCycle; // Add this for edit mode
}

export default function MarketingCycleForm({
  isOpen,
  onClose,
  initialData,
}: Properties) {
  const [formError, setFormError] = useState<string | null>(null);

  const { mutateAsync: createMarketingCycle, isPending: isCreating } =
    useCreateMarketingCycleMutation();
  const { mutateAsync: updateMarketingCycle, isPending: isUpdating } =
    useUpdateMarketingCycleMutation();

  const isSubmitting = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<MarketingCycleFormData>({
    resolver: zodResolver(marketingCycleSchema),
  });

  // Add useEffect to set form values when initialData changes
  useEffect(() => {
    if (initialData) {
      console.log("Setting form with initial data:", initialData);
      setValue("title", initialData.title);
      setValue("description", initialData.description);
      // Format dates for datetime-local input
      const startDate = new Date(initialData.startDate)
        .toISOString()
        .slice(0, 16);
      const endDate = new Date(initialData.endDate).toISOString().slice(0, 16);
      setValue("startDate", startDate);
      setValue("endDate", endDate);
    } else {
      reset({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
      });
    }
  }, [initialData, setValue, reset]);

  const onSubmit = async (data: MarketingCycleFormData) => {
    setFormError(null);

    try {
      if (initialData?.id) {
        await updateMarketingCycle(
          { id: initialData.id, payload: data },
          {
            onError: (error: any) => {
              const message =
                error?.response?.data?.message ||
                "Failed to update marketing cycle";
              setFormError(message);
              toast.error("Error updating marketing cycle", {
                description: message,
              });
            },
            onSuccess: () => {
              toast.success("Marketing cycle updated successfully", {
                description: `${data.title} has been updated.`,
              });
            },
          },
        );
      } else {
        await createMarketingCycle(data, {
          onError: (error: any) => {
            const message =
              error?.response?.data?.message ||
              "Failed to create marketing cycle";
            setFormError(message);
            toast.error("Error creating marketing cycle", {
              description: message,
            });
          },
          onSuccess: () => {
            toast.success("Marketing cycle created successfully", {
              description: `${data.title} has been created.`,
            });
          },
        });
      }
      reset();
      onClose();
    } catch (error: any) {
      const message =
        error?.message ||
        `Failed to ${initialData ? "update" : "create"} marketing cycle`;
      setFormError(message);
      toast.error("Error", {
        description: message,
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Marketing Cycle" : "Create Marketing Cycle"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {formError && (
            <div className="rounded border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
              {formError}
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              {...register("title")}
              className="w-full rounded-md border border-gray-300 p-2"
              disabled={isSubmitting}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register("description")}
              className="h-24 w-full rounded-md border border-gray-300 p-2"
              disabled={isSubmitting}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="datetime-local"
                {...register("startDate")}
                className="w-full rounded-md border border-gray-300 p-2"
                disabled={isSubmitting}
              />
              {errors.startDate && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="datetime-local"
                {...register("endDate")}
                className="w-full rounded-md border border-gray-300 p-2"
                disabled={isSubmitting}
              />
              {errors.endDate && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.endDate.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-md bg-mid-blue px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-blue-300"
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader className="h-4 w-4 animate-spin" />}
              {isSubmitting ? "Saving..." : initialData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
