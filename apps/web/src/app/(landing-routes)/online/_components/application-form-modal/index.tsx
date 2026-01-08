"use client";

import {
  Dialog,
  DialogContent,
} from "@workspace/ui/components";
import LeadForm from "../../../courses/_components/register-form/lead-form";
import type { OnlineCourse } from "../../data";

interface ApplicationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: OnlineCourse;
}

export const ApplicationFormModal: React.FC<ApplicationFormModalProps> = ({
  isOpen,
  onClose,
  course,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-2xl max-h-[90vh]"
        onPointerDownOutside={onClose}
        onEscapeKeyDown={onClose}
      >
        <div className="pr-4">
          <LeadForm slug={course.slug} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
