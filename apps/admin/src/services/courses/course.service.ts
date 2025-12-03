import { HttpAdapter } from "@/lib/http/http-adapter";
import { courseFormData } from "@/schemas";

const httpAdapter = new HttpAdapter();

export interface Course {
  id: string;
  title: string;
  about: string;
  curriculum: string;
  duration: {
    online: number;
    weekend: number;
    weekday: number;
  };
  cohorts: {
    totalOnline: number;
    totalWeekday: number;
    totalWeekend: number;
  };
  createdAt: string;
}

export class CourseService {
  async getCourses(filters: Filters) {
    const response = await httpAdapter.get<PaginatedApiResponse<Course>>(
      "/courses",
      {
        ...filters,
      },
    );
    if (response?.status === 200) {
      return response.data;
    }
  }

  async getCourseById(id: string) {
    const response = await httpAdapter.get<ApiResponse<Course>>(
      `/courses/${id}`,
    );
    if (response?.status === 200) {
      return response.data.data;
    }
  }

  async getTotalCourses() {
    const response = await httpAdapter.get("/courses/total");
    if (response?.status === 200) {
      return response.data;
    }
  }

  async createCourse(payload: courseFormData) {
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const response = await httpAdapter.post("/courses", payload, headers);
    if (response?.status === 201) {
      return response.data;
    }
  }

  async updateCourse(id: string, payload: courseFormData) {
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const response = await httpAdapter.patch(
      `/courses/${id}`,
      payload,
      headers,
    );
    if (response?.status === 200) {
      return response.data;
    }
  }

  async deleteCourse(id: string) {
    const response = await httpAdapter.delete(`/courses/${id}`);
    if (response?.status === 200) {
      return response.data;
    }
  }
}

export const courseService = new CourseService();
