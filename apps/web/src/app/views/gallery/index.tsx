"use client";

import { TsaCarousel } from "@workspace/ui/lib";
import Image from "next/image";

export const GALLARY_CONTENT = [
  <Image
    priority
    className="w-full !object-bottom"
    key={0}
    width={500}
    height={50}
    src={
      "https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1699879364/techstudio/images/IMG_9419_w7p2l6_phistp.heic"
    }
    alt={"img"}
  />,
  <Image
    priority
    className="w-full !object-bottom"
    key={1}
    width={500}
    height={50}
    src={
      "https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1699879355/techstudio/images/IMG_9415_vfk3rg_vjummr.heic"
    }
    alt={"img"}
  />,
];

export const Gallery = () => {
  return (
    <section className="relative p-4 lg:p-0 flex flex-col lg:flex-row max-w-[1240px] mx-auto lg:items-center">
      <div className="lg:w-[130%]">
        <TsaCarousel variant="gallery" galleryContent={GALLARY_CONTENT} />
      </div>
      <div className="lg:w-[15%] p-4">
        <div className="lg:w-[450px] z-[999] relative lg:translate-x-[-263px] translate-y-[-5rem] lg:translate-y-0  shadow-lg rounded-2xl !bg-white p-8 lg:p-10">
          <h6 className="font-bold">A World-Class Learning Facility</h6>
          <p className="my-[25px] text-xs lg:text-base leading-[26px]">
            At Tech Studio Academy, we have created a conducive environment for
            learning, combining exceptional school structures, inspiring
            classrooms, and dedicated tutors. We understand that the physical
            surroundings greatly impact the educational experience, and we
            strive to provide a nurturing setting that fosters academic growth,
            creativity, and personal development.
          </p>
          <p className="leading-[26px] text-xs lg:text-base">
            Our classrooms are carefully designed to facilitate effective
            teaching and learning to enable tutors to deliver dynamic and
            engaging lessons that captivate students attention and spark their
            curiosity.
          </p>
        </div>
      </div>
    </section>
  );
};
