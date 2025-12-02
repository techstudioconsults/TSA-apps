import { cn } from "@workspace/ui/lib";
import Image from "next/image";
import { FC } from "react";

interface CardProperties {
  image: string; // Required
  heading?: string; // Optional heading
  text: string; // Required
  className?: string; // Optional className prop
}

export const Card: FC<CardProperties> = ({
  image,
  heading,
  text,
  className,
}) => {
  return (
    <div
      className={cn(
        "mx-auto flex max-w-[349px] flex-col items-center justify-center gap-[20px]",
        className,
      )}
    >
      <div>
        <Image width={72} height={67} src={image} alt="icon" />
      </div>
      <div className="text-center">
        {heading && (
          <h5 className="mb-2 font-[600] text-high-grey-III">{heading}</h5>
        )}
        <p className="font-[400] text-high-grey-III">{text}</p>
      </div>
    </div>
  );
};
