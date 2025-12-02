import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  TsaButton,
} from "@strategic-dot/components";
import { Check, X } from "lucide-react";

interface SuccessModalProperties {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const SuccessModal: React.FC<SuccessModalProperties> = ({
  isOpen,
  onClose,
  title = "Created Successfully",
  description = "Your item has been created and saved successfully.",
  actionLabel = "Continue",
  onAction,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>

        <DialogHeader className="flex flex-col items-center gap-3">
          <div className="rounded-full bg-emerald-100 p-6">
            <div className="rounded-full bg-emerald-500">
              <Check className="h-12 w-12 p-4 text-white" />
            </div>
          </div>
          <DialogTitle>
            <h2 className="text-center text-xl font-semibold text-gray-900">
              {title}
            </h2>
          </DialogTitle>
        </DialogHeader>

        <div className="text-center text-sm text-gray-600">{description}</div>

        {onAction && (
          <div className="mt-6">
            <TsaButton
              onClick={onAction}
              variant="primary"
              className="w-full bg-blue-600"
            >
              {actionLabel}
            </TsaButton>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
