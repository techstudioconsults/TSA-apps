"use client";

import { FC } from "react";
import { CourseCarousel, CourseCarouselProps } from "./course-carousel";
import { FacilityCarousel, FacilityCarouselProps } from "./facility-carousel";
import { GalleryCarousel, GalleryCarouselProps } from "./gallery-carousel";

type TsaCarouselProperties =
  | ({
      variant: "course";
      showIndicator?: boolean;
    } & CourseCarouselProps)
  | ({
      variant: "facility";
      stopZoom?: boolean;
      itemsPerView?: number;
      facilityCaroselFlatMaxWidth?: string;
    } & FacilityCarouselProps)
  | ({
      variant: "gallery";
    } & GalleryCarouselProps);

export const TsaCarousel: FC<TsaCarouselProperties> = (props) => {
  if (props.variant === "facility") {
    return (
      <FacilityCarousel
        facilityContent={props.facilityContent}
        stopZoom={props.stopZoom}
        itemsPerView={props.itemsPerView}
        facilityCaroselFlatMaxWidth={props.facilityCaroselFlatMaxWidth}
      />
    );
  }

  if (props.variant === "gallery") {
    return <GalleryCarousel galleryContent={props.galleryContent} />;
  }

  return (
    <CourseCarousel
      courseContent={props.courseContent}
      showIndicator={props.showIndicator}
    />
  );
};

// Export individual components for direct use
export { CourseCarousel } from "./course-carousel";
export { FacilityCarousel } from "./facility-carousel";
export { GalleryCarousel } from "./gallery-carousel";
export { Thumb } from "./embla-thumbs";

// Export types
export type { CourseCarouselProps, CourseContent } from "./course-carousel";
export type { FacilityCarouselProps } from "./facility-carousel";
export type { GalleryCarouselProps } from "./gallery-carousel";
