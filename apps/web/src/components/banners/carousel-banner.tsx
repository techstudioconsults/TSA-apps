import { TsaBanner } from "@/app/views/banner";
import { TESTIMONIALS } from "@/lib/constants";
import { cn } from "@workspace/ui/lib";
import Image from "next/image";

export const CarouselBanner = () => {
  return (
    <TsaBanner
      className={cn(
        `flex min-h-[392px] max-w-full flex-col justify-between rounded-[16px] bg-primary p-4 text-background md:flex-row md:p-[42px]`,
      )}
      topSlot={
        <Image
          className="hidden lg:block"
          width={112}
          height={112}
          src="/icons/box-2.png"
          alt="icon"
        />
      }
      bottomSlot={
        <Image
          className="hidden h-[88px] w-[91px] lg:block"
          src="/icons/box-1(full).png"
          alt="icon"
          width={91}
          height={80}
        />
      }
      testimonials={TESTIMONIALS}
    />
  );
};
