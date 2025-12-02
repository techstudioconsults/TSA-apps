import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components";
import { Pencil, Trash } from "lucide-react";

interface CourseModalProperties {
  open: boolean;
  setOpen: (open: boolean) => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function CourseModal({
  open,
  setOpen,
  onEdit,
  onDelete,
}: CourseModalProperties) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold"></DialogTitle>
      </DialogHeader>
      <DialogContent className="sm:max-w-60">
        <div className="p-2">
          <button
            className="flex w-full items-center gap-2 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => {
              onEdit();
              setOpen(false);
            }}
          >
            <Pencil className="h-5 w-5 text-gray-700" />
            <span>Edit Course</span>
          </button>
          <button
            className="flex w-full items-center gap-2 rounded-md px-4 py-2 text-red-600 hover:bg-gray-100"
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
          >
            <Trash className="h-5 w-5 text-red-600" />
            <span>Delete Course</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
