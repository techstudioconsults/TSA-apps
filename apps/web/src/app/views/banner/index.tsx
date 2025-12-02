"use client";

import { TESTIMONIALS } from "@/lib/constants";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@workspace/ui/components";
import { cn } from "@workspace/ui/lib";
import Image from "next/image";
import * as React from "react";

export const TsaBanner: React.FC<TsaBannerProperties> = ({
  testimonials = TESTIMONIALS,
  topSlot = <Image width={112} height={112} src="/icons/box-2.png" alt="box" />,
  bottomSlot = (
    <Image width={91} height={88} src="/icons/box-1(full).png" alt="box" />
  ),
  className,
  ...rest
}) => {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    if (api) {
      api.on("select", () => setActiveIndex(api.selectedScrollSnap()));
    }
  }, [api]);

  const handleDotClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  return (
    <section className={cn(className)} {...rest}>
      <div className="mb-4 self-start md:mb-0">{topSlot}</div>
      <div className="flex-1 text-center">
        <h3 className="text-xl font-semibold text-background md:text-2xl">
          What Our Graduate Say
        </h3>
        <Carousel className="mx-auto w-full md:max-w-[597px]" setApi={setApi}>
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                className="flex items-center justify-center"
                key={index}
              >
                <div>
                  <p className="my-[16px] text-sm leading-[24px] tracking-[0.2px] md:my-[27px] md:text-[1rem] md:leading-[32px]">
                    {testimonial.message}
                  </p>
                  <div className="flex items-center justify-center gap-[12px] md:gap-[20px]">
                    <Avatar className="h-[72px] w-[72px] border-[2px] border-mid-grey-II md:h-[96px] md:w-[96px] md:border-[3px]">
                      <AvatarImage
                        src={testimonial.image}
                        alt={testimonial.name}
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="mb-[4px] text-base font-semibold tracking-[0.5px] text-accent md:mb-[8px] md:text-xl">
                        {testimonial.name}
                      </p>
                      <p className="text-sm tracking-[0.2px]">
                        {testimonial.job}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {/* Custom Dot Indicators */}
        <div className="mt-4 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-[8px] cursor-pointer rounded-full transition-all duration-300 md:h-[10px]",
                activeIndex === index
                  ? "w-[20px] bg-white md:w-[30px]"
                  : "w-[8px] bg-gray-400 md:w-[10px]",
              )}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
      <div className="mt-4 self-end md:mt-0">{bottomSlot}</div>
    </section>
  );
};
