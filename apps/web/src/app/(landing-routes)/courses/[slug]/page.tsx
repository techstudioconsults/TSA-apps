import { notFound } from "next/navigation";

// import { WeekdayCountdownBanner } from "../_components/countdown-timer";
import { DurationBanner } from "../_components/duration-banner";
import { BonusSection } from "../_views/bonus-section";
import { Hero } from "../_views/hero";
import { OnlineCardSection } from "../_views/online-card-section";
import { SectionOne } from "../_views/section-one";
import { SectionThree } from "../_views/section-three";
import { SectionTwo } from "../_views/section-two";
import { getCourseData } from "@/action/courses.action";

const Courses = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  try {
    const course = await getCourseData(slug);

    return (
      <main>
        <Hero slug={slug} intro={course.intro} />
        {/* {slug.includes(`weekday-online-class`) ? (
          <WeekdayCountdownBanner targetDate={`11th August, 2025`} />
        ) : ( */}
        <DurationBanner slug={slug} />
        {/* )} */}

        {slug.includes(`weekday-online-class`) && <OnlineCardSection />}
        {slug.includes(`weekday-online-class`) && <BonusSection />}
        <SectionOne sectionOne={course.sectionOne} />
        <SectionTwo courseList={course.courseList} />
        <SectionThree slug={slug} />
      </main>
    );
  } catch (error) {
    if ((error as Error).message === "Course not found") {
      return notFound();
    }
    return <div>Error: {(error as Error).message}</div>;
  }
};

export default Courses;
