import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components";
import { CustomButton } from "@workspace/ui/lib";
import React from "react";

interface ConfirmationModalProperties {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProperties> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "Any unsaved changes will be lost. Do you want to continue?",
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <h5 className="text-center text-xl font-bold">{title}</h5>
          </DialogTitle>
        </DialogHeader>

        <div className="text-center">
          {description && <p className="text-gray-600">{description}</p>}
        </div>

        <DialogFooter>
          <div className="mx-auto flex w-52 flex-col justify-center gap-4">
            <CustomButton
              className="bg-mid-blue py-3"
              onClick={onConfirm}
              variant="primary"
            >
              Confirm
            </CustomButton>
            <CustomButton
              className="border-red-500 text-red-500"
              onClick={onClose}
              variant="outline"
            >
              Go Back
            </CustomButton>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;
