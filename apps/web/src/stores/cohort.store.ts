import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Cohort } from "./store.types";

type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

type CohortState = {
  cohorts: Cohort[];
  upcomingCohorts: Cohort[];
  loading: boolean;
  error: string | null;
  pagination: PaginationMeta; // New pagination state
  setCohorts: (cohorts: Cohort[]) => void;
  setUpcomingCohorts: (cohorts: Cohort[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setPagination: (pagination: PaginationMeta) => void; // New setter
};

const initialPaginationState: PaginationMeta = {
  total: 0,
  page: 1,
  limit: 2,
  totalPages: 1,
  hasNextPage: false,
  hasPreviousPage: false,
};
const useCohortStore = create<CohortState>()(
  devtools((set) => ({
    cohorts: [],
    upcomingCohorts: [],
    loading: true,
    error: null,
    pagination: initialPaginationState, // Initialize pagination

    setCohorts: (cohorts: Cohort[]) => set({ cohorts, loading: false }),

    setUpcomingCohorts: (upcomingCohorts: Cohort[]) =>
      set({ upcomingCohorts, loading: false }),

    setLoading: (loading: boolean) => set({ loading }),

    setError: (error: string | null) => set({ error, loading: false }),

    // New pagination setter
    setPagination: (pagination: PaginationMeta) => set({ pagination }),
  })),
);

export default useCohortStore;
