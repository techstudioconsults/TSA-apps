import { HttpAdapter } from "@/lib/http/http-adapter";
import { tokenManager } from "@/lib/http/token-manager";

export interface CourseDuration {
  online: number;
  weekday: number;
  weekend: number;
}

export interface CourseData {
  id: string;
  title: string;
  about: string;
  duration: CourseDuration;
  curriculum?: File | string | null;
}

interface ListResponse {
  data?: { items?: CourseData[] };
  results?: CourseData[];
}

interface SingleResponse {
  data: CourseData;
}

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/courses`;

export class CoursesService {
  private http = new HttpAdapter();

  private async authHeaders() {
    const token = await tokenManager.getAccessToken();
    return token ? { Authorization: `Bearer ${token}` } : undefined;
  }

  async list(): Promise<CourseData[]> {
    const headers = await this.authHeaders();
    const res = await this.http.get<ListResponse>(`${BASE_URL}`, {}, headers);
    const items = res?.data?.data?.items ?? res?.data?.results ?? [];
    return items.map((course) => ({
      id: course.id,
      title: course.title,
      about: course.about,
      duration: {
        online: course.duration?.online ?? 0,
        weekday: course.duration?.weekday ?? 0,
        weekend: course.duration?.weekend ?? 0,
      },
      curriculum: course.curriculum ?? null,
    }));
  }

  async getById(id: string): Promise<CourseData> {
    const headers = await this.authHeaders();
    const res = await this.http.get<SingleResponse>(
      `${BASE_URL}/${id}`,
      {},
      headers,
    );
    if (!res?.data?.data) throw new Error("Course not found");
    const course = res.data.data;
    return {
      id: course.id,
      title: course.title,
      about: course.about,
      duration: {
        online: course.duration?.online ?? 0,
        weekday: course.duration?.weekday ?? 0,
        weekend: course.duration?.weekend ?? 0,
      },
      curriculum: course.curriculum ?? null,
    };
  }

  async create(formData: FormData): Promise<CourseData> {
    const headers = await this.authHeaders();
    const res = await this.http.post<CourseData>(
      `${BASE_URL}`,
      formData,
      headers,
    );
    if (!res?.data) throw new Error("Failed to create course");
    // Backend returns created course shape compatible with CourseData
    return res.data as CourseData;
  }

  async update(params: { id: string; formData: FormData }): Promise<void> {
    const headers = await this.authHeaders();
    const res = await this.http.patch<void>(
      `${BASE_URL}/${params.id}`,
      params.formData,
      headers,
    );
    if ((res?.status ?? 500) >= 400) throw new Error("Failed to update course");
  }

  async delete(id: string): Promise<void> {
    const headers = await this.authHeaders();
    const res = await this.http.delete<void>(
      `${BASE_URL}/${id}`,
      undefined,
      headers,
    );
    if ((res?.status ?? 500) >= 400) throw new Error("Failed to delete course");
  }

  async total(): Promise<number> {
    const headers = await this.authHeaders();
    const res = await this.http.get<{ data: { totalCourses: number } }>(
      `${BASE_URL}/total`,
      {},
      headers,
    );
    return res?.data?.data?.totalCourses ?? 0;
  }
}

export const coursesService = new CoursesService();
