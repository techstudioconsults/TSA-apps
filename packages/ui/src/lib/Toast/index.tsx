"use client";

import { Toaster } from "@workspace/ui/components";

export const Toast = () => {
  return (
    <Toaster
      closeButton
      position="bottom-center"
      expand={false}
      duration={5000}
    />
  );
};
