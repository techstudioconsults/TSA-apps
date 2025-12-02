"use client";

import { Wrapper } from "@workspace/ui/lib";
import Card from "../../_components/card/card";

export const SectionOne = () => {
  return (
    <Wrapper>
      <section className="mx-auto w-fit text-center">
        <p className="text-sm font-[700] uppercase text-mid-blue">
          Why techstudio?
        </p>
        <h2 className="mt-[33px]">We Are Customer-Centric</h2>
      </section>
      <section className="grid min-h-[403px] grid-cols-1 gap-[44px] md:grid-cols-2 lg:grid-cols-3">
        <Card
          image={
            "https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1760527429/techstudio/GIFS/oozwfq4pd0x7afdxpxak.gif"
          }
          title={"Great learning Environment"}
          description={
            "We provide exceptional learning facilities with comfortable, en-suite classrooms and high-speed internet."
          }
        />
        <Card
          image={
            "https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1760527428/techstudio/GIFS/a629k0y5znrr8dc6iu87.gif"
          }
          title={"Experienced Tutor"}
          description={
            "Our tutors are experienced professionals chosen for their exceptional teaching abilities. They are dedicated to providing top-notch education to our students."
          }
        />
        <Card
          image={
            "https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1760527395/techstudio/GIFS/owytmvtxtk96tuwfsjjb.gif"
          }
          title={"Career Support"}
          description={
            "We provide unparalleled support both during your learning journey and after graduation. Our commitment to your success extends beyond the classroom."
          }
        />
      </section>
    </Wrapper>
  );
};
