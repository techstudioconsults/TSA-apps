import type { Metadata } from "next";
import { CourseDetails } from "./_views/course-details";
import { Hero } from "./_views/hero";

export const metadata: Metadata = { title: "Explore Programs" };

const page = () => {
  return (
    <main>
      <Hero />
      <CourseDetails />
    </main>
  );
};

export default page;
