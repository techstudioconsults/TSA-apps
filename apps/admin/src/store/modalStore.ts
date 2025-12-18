import { create } from "zustand";

interface ModalState {
  isCreateSheetModalOpen: boolean;
  openCreateSheetModal: () => void;
  closeCreateSheetModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isCreateSheetModalOpen: false,
  openCreateSheetModal: () => set({ isCreateSheetModalOpen: true }),
  closeCreateSheetModal: () => set({ isCreateSheetModalOpen: false }),
}));
