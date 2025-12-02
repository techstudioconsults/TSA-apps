"use client";

import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useRef, useState } from "react";
import { Thumb } from "./embla-thumbs";
import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import { Card } from "../../components/ui/card";
import { CustomButton } from "../button";

export interface CourseContent {
  name: string;
  image: string;
  link: string;
}

export interface CourseCarouselProps {
  courseContent?: CourseContent[];
  showIndicator?: boolean;
}

export const CourseCarousel: React.FC<CourseCarouselProps> = ({
  courseContent,
  showIndicator = false,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const thumbsContainerReference = useRef<HTMLDivElement>(null);

  const handleThumbClick = useCallback(
    (index: number) => {
      if (api) {
        api.scrollTo(index);
        setActiveIndex(index);
      }
    },
    [api],
  );

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);
    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  return (
    <Carousel
      plugins={[plugin.current]}
      className="mx-auto w-full max-w-[655px]"
      setApi={setApi}
    >
      <CarouselContent className="h-[270px]">
        {courseContent?.map((content, index) => (
          <CarouselItem className="h-full" key={index}>
            <div className="h-full overflow-hidden rounded-t-[1rem] p-1">
              <Card className="relative overflow-hidden rounded-t-[1rem]">
                <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-[23px] bg-gray-900 bg-opacity-70 p-2">
                  <p className="text-center text-4xl font-[700] text-white">
                    {content.name}
                  </p>
                  <CustomButton
                    href={content.link}
                    className="w-[160px] border-mid-blue bg-background text-mid-blue"
                  >
                    View Course
                  </CustomButton>
                </div>
                <Image
                  width={500}
                  height={270}
                  src={content.image}
                  alt="logo"
                  className="object-cover w-full h-[270px]"
                />
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {showIndicator && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}

      <section
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        className={`mx-[4px] overflow-x-auto rounded-b-[1rem] border`}
        ref={thumbsContainerReference}
      >
        <div className="flex gap-2 mt-2">
          {courseContent?.map((content, index) => (
            <Thumb
              key={index}
              index={content.image}
              title={content.name}
              selected={index === activeIndex}
              onClick={() => handleThumbClick(index)}
              className="text-background bg-foreground"
            />
          ))}
        </div>
      </section>
    </Carousel>
  );
};
