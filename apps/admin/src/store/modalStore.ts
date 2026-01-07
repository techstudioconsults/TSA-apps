import { create } from "zustand";

interface ModalState {
  isCreateSheetModalOpen: boolean;
  openCreateSheetModal: () => void;
  closeCreateSheetModal: () => void;
  isCreateMarketingCycleModalOpen: boolean;
  openCreateMarketingCycleModal: () => void;
  closeCreateMarketingCycleModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isCreateSheetModalOpen: false,
  openCreateSheetModal: () => set({ isCreateSheetModalOpen: true }),
  closeCreateSheetModal: () => set({ isCreateSheetModalOpen: false }),
  isCreateMarketingCycleModalOpen: false,
  openCreateMarketingCycleModal: () =>
    set({ isCreateMarketingCycleModalOpen: true }),
  closeCreateMarketingCycleModal: () =>
    set({ isCreateMarketingCycleModalOpen: false }),
}));
