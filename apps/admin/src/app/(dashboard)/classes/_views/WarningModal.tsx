import { CustomButton, ReusableDialog } from "@workspace/ui/lib";

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
    <ReusableDialog trigger={undefined} open={isOpen} onOpenChange={onClose}>
      <div className="mx-auto flex w-52 flex-col justify-center gap-4">
        <CustomButton
          onClick={onConfirm}
          className="bg-mid-blue py-3"
          variant="primary"
        >
          Yes
        </CustomButton>
        <CustomButton
          onClick={onClose}
          className="border-red-500 text-red-500"
          variant="outline"
        >
          No
        </CustomButton>
      </div>
    </ReusableDialog>
  );
};

export default WarningModal;
