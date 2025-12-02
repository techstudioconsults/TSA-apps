import { FC } from "react";

import { StepperCard } from "../../_components/stepper-card";
import { Course } from "../../types/index.types";

interface CourseSectionTwoProperty {
  courseList: Course[];
}

export const SectionTwo: FC<CourseSectionTwoProperty> = ({ courseList }) => {
  return (
    <section className="min-h-[591px]">
      {courseList.map((course) => {
        return <StepperCard key={course.id} course={course} />;
      })}
    </section>
  );
};
