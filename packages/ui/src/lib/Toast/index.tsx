"use client";

import { Toaster } from "../../components/ui/sonner";

const Toast = () => {
  return (
    <Toaster
      richColors
      position="bottom-center"
      // toastOptions={{
      //   classNames: {
      //     toast: "!bg-accent !w-full !absolute",
      //   },
      // }}
    />
  );
};

export { Toast };
export { Toaster } from "../../components/ui/sonner";
export { toast } from "sonner";
