import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components";
import Image from "next/image";
import React from "react";

interface ResponseModalProperties {
  isOpen: boolean;
  onClose: () => void;
  responseMessage: string;
  title?: string;
  isError: boolean;
  image?: string;
}

const ResponseModal: React.FC<ResponseModalProperties> = ({
  isOpen,
  onClose,
  responseMessage,
  isError,
  image,
  title,
}) => {
  const img = isError ? `/gifs/scream.gif` : image || `/images/yes.png`;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Image
              className="mx-auto"
              width={138}
              height={85}
              src={img}
              alt={"image"}
            />
          </DialogTitle>
        </DialogHeader>
        <div className="text-center">
          <h5 className="mb-4 text-xl font-bold">
            {isError ? `Something went wrong` : title}
          </h5>
          <p className={isError ? "text-red-600" : ""}>
            {isError
              ? responseMessage
              : `Thank you for contacting us! Our team is reviewing your message and will respond promptly. Feel free to explore our website for more information in the meantime. We appreciate your patience!`}
          </p>
        </div>
        <DialogFooter>
          <button
            className={`mt-4 w-full rounded px-4 py-2 text-white ${isError ? "bg-red-600" : "bg-mid-blue"}`}
            onClick={onClose}
          >
            Close this window
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResponseModal;
