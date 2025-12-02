"use client";

import { create } from "zustand";
import {
  persist,
  createJSONStorage,
  type PersistOptions,
} from "zustand/middleware";

type Theme = "light" | "dark" | "system";

type UIState = {
  theme: Theme;
  showCards: boolean;
  setTheme: (theme: Theme) => void;
  toggleCards: () => void;
};

// Use localStorage on the client; disable persistence on the server
type UIStorage = Pick<UIState, "theme" | "showCards">;

const storage =
  typeof window !== "undefined"
    ? createJSONStorage<UIStorage>(() => localStorage)
    : undefined;

/**
 * Minimal, persisted UI store.
 * - theme: UI theme preference
 * - showCards: demo toggle to show/hide content on the page
 */
const persistOptions: PersistOptions<UIState, UIStorage> = {
  name: "admin-ui",
  storage,
  partialize: (s) => ({ theme: s.theme, showCards: s.showCards }),
  version: 1,
};

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: "system",
      showCards: true,
      setTheme: (theme) => set({ theme }),
      toggleCards: () => set((s) => ({ showCards: !s.showCards })),
    }),
    persistOptions,
  ),
);

// Selectors (recommended to minimize re-renders)
export const selectTheme = (s: UIState) => s.theme;
export const selectShowCards = (s: UIState) => s.showCards;
