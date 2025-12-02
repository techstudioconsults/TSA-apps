"use client";

import HelpBanner from "@/components/banners/help-banner";
import { BlurImage, Dialog, DialogContent } from "@workspace/ui/components";
import { Wrapper } from "@workspace/ui/lib";
import { useState } from "react";

export const SectionFour = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const handleImageClick = (imageSource: string) => {
    setCurrentImage(imageSource);
    setIsDialogOpen(true);
  };

  const images = [
    "/images/facility1.png",
    "/images/facility2.png",
    "/images/facility3.png",
    "/images/facility4.png",
  ];

  return (
    <section>
      <div className="h-fit w-full lg:min-h-[706px]">
        <BlurImage
          priority
          width={1440}
          height={706}
          src="/team/employees.svg"
          alt="employees"
          className="object-contain object-top lg:object-cover mx-auto w-full"
        />
      </div>
      <div className=" py-[70px]">
        <Wrapper className="grid grid-cols-1 justify-center gap-[28px] gap-y-0 text-center lg:grid-cols-3 lg:text-left">
          <div>
            <span className="text-sm font-bold uppercase text-mid-blue">
              What To Expect
            </span>
            <h3>Our Facility</h3>
          </div>
          <div className="col-span-2">
            <p>
              We have put in place a very comfortable, and conducive learning
              facilities where you have access to resources. We have also
              invested in unlimited internet to ensure our students don’t have
              hinderance in their learning process.
            </p>
          </div>
        </Wrapper>
      </div>
      <section className="grid min-h-[408px] grid-cols-1 gap-[5px] md:grid-cols-2 xl:grid-cols-4">
        {images.map((source, index) => (
          <div key={index} onClick={() => handleImageClick(source)}>
            <BlurImage
              priority
              width={372}
              height={408}
              src={source}
              alt={`facility ${index + 1}`}
              className="cursor-pointer rounded-[6px] object-contain object-top grayscale w-full h-full filter hover:grayscale-0 lg:object-cover"
            />
          </div>
        ))}
      </section>
      <Wrapper className="min-h-[335px] lg:!mt-32">
        <HelpBanner />
      </Wrapper>
      {/* Dialog for showing the hovered image */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl bg-transparent">
          <BlurImage
            width={500}
            height={408}
            src={currentImage}
            alt="Enlarged facility"
            className="h-auto w-full rounded-lg"
          />
        </DialogContent>
      </Dialog>
    </section>
  );
};
