"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components";
import { CustomButton } from "@workspace/ui/lib";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { SheetFormData, SheetsFormSchema } from "@/schemas";
import SuccessModal from "./topnav/response-modal";
import { useSheetStore } from "@/lib/store/sheetStore";

interface CreateSheetModalProperties {
  isOpen: boolean;
  onClose: () => void;
}

interface ApiError {
  status: number;
  message: string;
  details?: {
    message: string;
    success: boolean;
  };
}

const CreateSheetModal: React.FC<CreateSheetModalProperties> = ({
  isOpen,
  onClose,
}) => {
  const { createSheet } = useSheetStore();
  const router = useRouter();

  const [sheetError, setSheetError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SheetFormData>({
    resolver: zodResolver(SheetsFormSchema),
  });

  const onSubmitHandler = async (data: SheetFormData) => {
    try {
      await createSheet(data);
      reset();
      onClose();
      router.push("/sheets");
      setShowSuccessModal(true);
    } catch (error: unknown) {
      const error_ = error as ApiError;
      setSheetError(`An Error occured: ${error_.message}`);
      console.error("Error creating sheet:", error);
    }
  };

  const handleViewSheet = () => {
    if (showSuccessModal) {
      router.push("/sheets");
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="px-10 py-8">
          <DialogHeader>
            <DialogTitle>
              <h5 className="text-xl font-semibold text-gray-800">
                Create Sheet
              </h5>
            </DialogTitle>
          </DialogHeader>

          {sheetError && (
            <div className="mb-4 rounded bg-red-50 p-3 text-red-500">
              {sheetError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmitHandler)}>
            {sheetError && <p>{sheetError}</p>}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium">
                Sheet Name
              </label>
              <input
                {...register("title")}
                className="w-full rounded-md border border-gray-300 p-2 outline-none"
                placeholder="Enter Sheet Name"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <CustomButton
                type="submit"
                variant="primary"
                className="bg-mid-blue py-3"
                isDisabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create"}
              </CustomButton>
              <CustomButton
                type="button"
                onClick={onClose}
                variant="outline"
                className="border-red-500 text-red-500"
              >
                Cancel
              </CustomButton>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Sheet Created Successfully"
        description="Sheet has been created and saved successfully."
        actionLabel="Continue"
        onAction={handleViewSheet}
      />
    </>
  );
};

export default CreateSheetModal;
