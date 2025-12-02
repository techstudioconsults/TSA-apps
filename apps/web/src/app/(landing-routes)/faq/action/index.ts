import { create } from "zustand";
import { devtools } from "zustand/middleware";

type FAQData = {
  id: number;
  question: string;
  answer: string;
  bullets?: string[];
};

type FAQState = {
  faq: FAQData[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  getFAQ: (page?: number) => Promise<string | null>;
};

const BASE_URL = process.env["NEXT_PUBLIC_API_URL"] || "http://localhost:3000";

const useFAQStore = create<FAQState>()(
  devtools((set) => ({
    faq: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,

    getFAQ: async (page = 1) => {
      set({ loading: true, error: null });

      try {
        const response = await fetch(`${BASE_URL}/faq?page=${page}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        set({
          faq: data.data.data,
          currentPage: data.data.pageNumber,
          totalPages: data.data.pages,
          loading: false,
        });

        return null;
      } catch (error: unknown) {
        let errorMessage = "An unknown error occurred";
        if (error instanceof Error) {
          errorMessage = error.message;
        }

        set({ error: errorMessage, loading: false });
        return errorMessage;
      }
    },
  })),
);

export default useFAQStore;
