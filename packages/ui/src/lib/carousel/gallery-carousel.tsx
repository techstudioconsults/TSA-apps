"use client";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../components/ui/carousel";
import { Card, CardContent } from "../../components/ui/card";

export interface GalleryCarouselProps {
  galleryContent?: React.ReactNode[];
}

export const GalleryCarousel: React.FC<GalleryCarouselProps> = ({
  galleryContent,
}) => {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  return (
    <div>
      <Carousel plugins={[plugin.current]} className="relative flex-1">
        <CarouselContent>
          {galleryContent?.map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="overflow-hidden rounded-[30px]">
                  <CardContent className="max-w-[1300px] objec p-0 lg:h-[664px]">
                    {_}
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <Image
          className="absolute left-[12rem] top-[10rem] z-10 hidden scale-[200%] lg:block"
          width={525}
          height={100}
          src="/images/Polygon.png"
          alt="line"
        />
      </Carousel>
    </div>
  );
};
