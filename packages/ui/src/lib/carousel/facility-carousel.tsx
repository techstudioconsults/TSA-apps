"use client";

import Autoplay from "embla-carousel-autoplay";
import { CircleX } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../../components/ui/carousel";
import { Card, CardContent } from "../../components/ui/card";
import { Dialog, DialogClose, DialogContent } from "../../components/ui/dialog";

export interface FacilityCarouselProps {
  facilityContent?: string[];
  stopZoom?: boolean;
  itemsPerView?: number;
  facilityCaroselFlatMaxWidth?: string;
}

export const FacilityCarousel: React.FC<FacilityCarouselProps> = ({
  facilityContent,
  stopZoom = false,
  itemsPerView = 3,
  facilityCaroselFlatMaxWidth = "1240px",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedItem, setSelectedItem] = useState("");
  const [visibleItems, setVisibleItems] = useState(1);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateVisibleItems = () => {
        if (window.innerWidth >= 1024) {
          setVisibleItems(itemsPerView);
        } else if (window.innerWidth >= 768) {
          setVisibleItems(Math.min(2, itemsPerView));
        } else {
          setVisibleItems(Math.min(1, itemsPerView));
        }
      };

      updateVisibleItems();
      window.addEventListener("resize", updateVisibleItems);
      return () => window.removeEventListener("resize", updateVisibleItems);
    }
  }, [itemsPerView]);

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

  const carouselHeight = stopZoom ? "480px" : "350px";
  const carouselWidth = stopZoom ? "372px" : "100%";

  return (
    <>
      <Carousel
        plugins={[plugin.current]}
        className=""
        style={{ maxWidth: facilityCaroselFlatMaxWidth }}
        setApi={setApi}
      >
        <CarouselContent className="">
          {facilityContent?.map((item, index) => {
            const isCenterItem =
              index === Math.floor(activeIndex - (visibleItems / 2 - 0.5)) ||
              index === Math.floor(activeIndex + (visibleItems / 2 - 0.5));

            return (
              <CarouselItem
                key={index}
                className={`md:basis-1/2 ${
                  stopZoom ? "lg:basis-1/4" : "lg:basis-1/3"
                } transition-transform duration-300 ${isCenterItem && !stopZoom ? "scale-100" : "scale-90"}`}
                onClick={() => setSelectedItem(item)}
              >
                <Card style={{ width: carouselWidth, height: carouselHeight }}>
                  <CardContent className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg p-0">
                    <Image
                      priority
                      src={item}
                      alt={`carousel-image-${index}`}
                      fill
                      className="rounded-[8px] object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 372px"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Custom Indicator */}
        <div
          className={`mt-5 flex justify-center ${stopZoom ? "hidden" : "flex"}`}
        >
          {facilityContent?.map((_, index) => (
            <div
              key={index}
              className={`mx-[3px] h-[10px] w-[10px] rounded-full ${
                index === activeIndex ? "scale-125 bg-blue-500" : "bg-blue-200"
              } transition-all duration-300`}
            />
          ))}
        </div>
      </Carousel>

      {/* Modal for displaying the selected item */}
      {selectedItem && (
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem("")}>
          <DialogContent className="bg-transparent sm:max-w-[900px]">
            <DialogClose className="absolute right-2 top-2">
              <CircleX size={24} className="border border-white text-white" />
            </DialogClose>
            {selectedItem && (
              <Image
                src={selectedItem}
                alt="Selected Carousel Item"
                width={500}
                height={350}
                className="h-auto w-full rounded object-contain"
              />
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
