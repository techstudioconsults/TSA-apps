import { HttpAdapter } from "@/lib/http/http-adapter";
import { classSubmitFormData } from "@/schemas";

export type Class = {
  id: string;
  title: string;
  description: string;
  type: string;
  startDate: string;
  fee: number;
  duration: number;
  students: [];
  course: {
    id: string;
    title: string;
  };
  createdAt: string;
};

const httpAdapter = new HttpAdapter();

export class ClassService {
  async createClass(
    payload: classSubmitFormData & {
      courseId: string;
    },
  ) {
    const response = await httpAdapter.post<ApiResponse<Class>>(
      `/cohorts`,
      payload,
    );
    if (response?.status === 201 || response?.status === 200) {
      return response.data.data;
    }
  }

  async getClasses(courseId: string, filters: Filters) {
    const response = await httpAdapter.get<PaginatedApiResponse<Class>>(
      `/cohorts?courseId=${courseId}`,
      {
        ...filters,
      },
    );
    if (response?.status === 200) {
      return response.data;
    }
  }

  async getClassById(id: string) {
    const response = await httpAdapter.get<ApiResponse<Class>>(
      `/cohorts/${id}`,
    );
    if (response?.status === 200) {
      return response.data.data;
    }
  }

  async updateClass(id: string, payload: classSubmitFormData) {
    const response = await httpAdapter.patch<ApiResponse<Class>>(
      `/cohorts/${id}`,
      payload,
    );
    if (response?.status === 200) {
      return response.data.data;
    }
  }

  async deleteClass(id: string) {
    const response = await httpAdapter.delete(`/cohorts/${id}`);
    if (response?.status === 200) {
      return response.data;
    }
  }
}

export const classService = new ClassService();
