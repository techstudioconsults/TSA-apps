"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { DialogContent, Button } from "@workspace/ui/components";
import { SheetFormData, SheetsFormSchema } from "@/schemas";
import { useCreateSheetMutation } from "@/services/sheets/sheet.queries";
import { toast } from "sonner";
import { DashboardHeader, ReusableDialog, FormField } from "@workspace/ui/lib";

interface CreateSheetModalProperties {
  isOpen: boolean;
  onClose: () => void;
}

const CreateSheetModal: React.FC<CreateSheetModalProperties> = ({
  isOpen,
  onClose,
}) => {
  const { mutateAsync: createSheet, isPending } = useCreateSheetMutation();
  const router = useRouter();

  const formMethods = useForm<SheetFormData>({
    resolver: zodResolver(SheetsFormSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (data: SheetFormData) => {
    await createSheet(data, {
      onError: (error: any) => {
        toast.error("Error creating sheet", {
          description:
            error?.response?.data?.message || "Failed to create sheet.",
        });
      },
      onSuccess: () => {
        toast.success("Sheet created successfully", {
          description: `${data.title} has been created.`,
        });
        formMethods.reset();
        onClose();
        router.push("/sheets");
      },
    });
  };

  return (
    <ReusableDialog open={isOpen} onOpenChange={onClose} trigger={undefined}>
      <DashboardHeader title={"Create Sheet"} />
      <DialogContent className="px-10 py-8">
        <FormProvider {...formMethods}>
          <form
            onSubmit={formMethods.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              name="title"
              label="Sheet Name"
              placeholder="Enter Sheet Name"
              type="text"
              required
            />

            <div className="flex flex-col gap-3">
              <Button
                type="submit"
                variant="primary"
                className="bg-mid-blue py-3"
                disabled={isPending}
              >
                {isPending ? "Creating..." : "Create"}
              </Button>
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="border-red-500 text-red-500"
              >
                Cancel
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </ReusableDialog>
  );
};

export default CreateSheetModal;
