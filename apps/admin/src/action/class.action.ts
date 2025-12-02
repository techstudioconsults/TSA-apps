import { classFormData } from "~/schemas";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export interface ClassData {
  id: string;
  course: { id: string };
  courseTitle: string;
  title: string;
  description: string;
  fee: string;
  startDate: string;
  duration: string;
  courseId: string;
  type: "online" | "weekday" | "weekend";
}

interface APIError {
  status?: number;
  message: string;
  details?: Record<string, unknown>;
}

interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, unknown>;
}

interface getClassResponse {
  success: boolean;
  data: { items: ClassData[] };
  message?: string;
  errors?: Record<string, unknown>;
}

export interface SingleClassData {
  id: string;
  courseId: string;
  title: string;
  courseTitle: string;
  description: string;
  fee: number;
  startDate: string;
  // endDate: string;
  type: "online" | "weekday" | "weekend";
}

export const createClassAction = async (
  data: classFormData,
  token: string,
  // courseId: string,
): Promise<ClassData> => {
  // Now returns ClassData
  try {
    const response = await fetch(`${BASE_URL}/cohorts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData: APIResponse<ClassData> = await response.json(); // Expecting ClassData

    if (!response.ok) {
      throw {
        status: response.status,
        message: responseData.message || "Failed to create class",
        details: responseData.errors || {},
      } as APIError;
    }

    return responseData.data; // Return the created class
  } catch (error) {
    const apiError = error as APIError;
    console.error("Error in createClassAction:", apiError);
    throw {
      message: apiError.message || "An unexpected error occurred.",
      details: apiError.details || {},
    } as APIError;
  }
};

export const fetchClassesByCourseIdAction = async (
  courseId: string,
  token: string,
): Promise<ClassData[]> => {
  try {
    const response = await fetch(`${BASE_URL}/cohorts?courseId=${courseId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData: getClassResponse = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        message: "Failed to fetch classes",
      } as APIError;
    }

    return responseData.data?.items;
  } catch (error) {
    const apiError = error as APIError;
    console.error("Error in fetchClassesByCourseIdAction:", apiError);
    throw {
      message: apiError.message || "An unexpected error occurred.",
    } as APIError;
  }
};

// Delete class action
export const deleteClassAction = async (
  id: string,
  token: string,
): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/cohorts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete course: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error in deleteCourseAction:", error);
    throw error;
  }
};

export const getSingleClassAction = async (
  id: string,
  token: string,
): Promise<SingleClassData> => {
  try {
    const response = await fetch(`${BASE_URL}/cohorts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch details for this class: ${response.statusText}`,
      );
    }

    const singleClass = (await response.json()) as {
      data: SingleClassData & { course: { id: string } };
    };

    return {
      id: singleClass.data.id,
      courseId: singleClass.data.course.id,
      courseTitle: singleClass.data.courseTitle,
      title: singleClass.data.title,
      description: singleClass.data.description,
      type: singleClass.data.type,
      startDate: singleClass.data.startDate,
      // endDate: singleClass.data.endDate,
      fee: singleClass.data.fee,
    };
  } catch (error) {
    console.error("Error in getSingleClassAction:", error);
    throw error;
  }
};

// Update class action
export const updateClassAction = async (
  id: string,
  data: Partial<classFormData>,
  token: string,
): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/cohorts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData: APIResponse<ClassData> = await response.json();
    console.log(responseData);

    if (!response.ok) {
      const errorBody = await response.json();
      throw {
        status: response.status,
        message: errorBody.message || "Failed to update course",
        details: errorBody,
      };
    }
  } catch (error) {
    console.error("Error in updateCourseAction:", error);
    throw error;
  }
};

export const getTotalCohortsAction = async (token: string): Promise<number> => {
  try {
    const response = await fetch(`${BASE_URL}/cohorts/total`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch total cohorts: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data.totalCohorts;
  } catch (error) {
    console.error("Error in getTotalCohortsAction:", error);
    throw error;
  }
};
