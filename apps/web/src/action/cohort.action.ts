// import { Cohort } from "./services.type";

import useCohortStore from "../stores/cohort.store";

const BASE_URL = process.env["NEXT_PUBLIC_API_URL"] || "";

// Format date as DD-MM-YYYY
const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const fetchCohortsByCourseId = async (courseId: string) => {
  const { setCohorts, setLoading, setError } = useCohortStore.getState();

  setLoading(true);
  setError(null);
  try {
    const response = await fetch(`${BASE_URL}/cohorts?courseId=${courseId}`, {
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
    setCohorts(data.data.items);
  } catch (error: unknown) {
    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError("An unknown error occurred");
    }
  } finally {
    setLoading(false);
  }
};

export const fetchUpcomingCohorts = async (
  page: number = 1,
  limit: number = 1,
) => {
  const { setUpcomingCohorts, setLoading, setError, setPagination } =
    useCohortStore.getState();

  setLoading(true);
  setError(null);
  try {
    const today = new Date();
    const startDate = formatDate(today);
    const response = await fetch(
      `${BASE_URL}/courses?startDate=${startDate}&endDate=&page=${page}&limit=${limit}`,
    );

    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const { data } = await response.json();

    // Validate metadata exists
    if (!data?.metadata) {
      throw new Error("Invalid pagination data");
    }

    // Safe conversion with fallbacks
    const pagination = {
      total: Number(data.metadata.total) || 0,
      page: Number(data.metadata.page) || 1,
      limit: Number(data.metadata.limit) || limit,
      totalPages: Number(data.metadata.totalPages) || 1,
      hasNextPage: Boolean(data.metadata.hasNextPage),
      hasPreviousPage: Boolean(data.metadata.hasPreviousPage),
    };

    // Validate items array
    const items = Array.isArray(data?.items) ? data.items : [];

    setUpcomingCohorts(items);
    setPagination(pagination);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invalid pagination data";
    setError(message); // This will now set the expected error
  } finally {
    setLoading(false);
  }
};
