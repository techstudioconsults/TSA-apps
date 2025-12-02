import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
} from "@workspace/ui/components";

interface WarningModalProperties {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const WarningModal: React.FC<WarningModalProperties> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="px-10 py-16">
        <DialogHeader>
          <DialogTitle className="mx-auto w-4/5">
            <h5 className="text-center text-2xl font-semibold text-gray-800">
              Are you sure you want to delete this course?
            </h5>
          </DialogTitle>
        </DialogHeader>

        <DialogFooter>
          <div className="mx-auto flex w-52 flex-col justify-center gap-4">
            <Button
              className="bg-mid-blue py-3"
              onClick={onConfirm}
              variant="primary"
            >
              Yes
            </Button>
            <Button
              className="border-red-500 text-red-500"
              onClick={onClose}
              variant="outline"
            >
              No
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WarningModal;
