"use client";

import { useModalStore } from "@/store/modalStore";
import SheetCards from "./_views/SheetCards";
import CreateSheetModal from "./_components/CreateSheetModal";

const Sheets = () => {
  const { isCreateSheetModalOpen, closeCreateSheetModal } = useModalStore();

  return (
    <>
      <SheetCards />
      <CreateSheetModal
        isOpen={isCreateSheetModalOpen}
        onClose={closeCreateSheetModal}
      />
    </>
  );
};

export default Sheets;
