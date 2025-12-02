import courses from "./data/courses.json";
import useCoursesStore from "../stores/course.store";
import type { Course } from "../stores/store.types";
import type { EducationPrograms } from "../types";

// export async function getCourseData(slug: string): Promise<EducationPrograms> {
//   const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/courses.json`, {
//     cache: "no-store",
//   });

//   if (!response.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   const data = await response.json();

//   const course = data.find((course: object) => Object.keys(course)[0].toLowerCase() === slug.toLowerCase());

//   if (!course) {
//     throw new Error("Course not found");
//   }

//   return course[slug];
// }

const BASE_URL = process.env["NEXT_PUBLIC_API_URL"] || "";

export async function getCourseData(slug: string): Promise<EducationPrograms> {
  const match = courses.find((entry) => {
    const [key] = Object.keys(entry);
    return !!key && key.toLowerCase() === slug.toLowerCase();
  });

  if (!match) {
    throw new Error("Course not found");
  }

  const [matchedKey] = Object.keys(match);
  if (!matchedKey) {
    throw new Error("Course data is undefined");
  }

  const courseData = match[matchedKey as keyof typeof match];

  if (!courseData) {
    throw new Error("Course data is undefined");
  }

  return courseData as EducationPrograms;
}

export const fetchAllCourses = async () => {
  const { setCourses, setLoading, setError } = useCoursesStore.getState();

  setLoading(true);
  setError(null);

  try {
    const response = await fetch(`${BASE_URL}/courses`, {
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
    setCourses(data.data.items);
  } catch (error: unknown) {
    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError("An unknown error occurred");
    }
  } finally {
    setLoading(false); // Ensure this line is present
  }
};

// Function to set the active course
export const setActiveCourse = (course: Course) => {
  const { setActiveCourse } = useCoursesStore.getState();
  setActiveCourse(course);
};
