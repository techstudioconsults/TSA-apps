import { BlurImage } from "@workspace/ui/components";
import { FC, HTMLAttributes } from "react";

interface CardProperties extends HTMLAttributes<HTMLDivElement> {
  image: string;
  title: string;
  description: string;
}

const Card: FC<CardProperties> = ({ image, title, description, ...rest }) => {
  return (
    <section className="mx-auto w-full max-w-[376px]" {...rest}>
      <BlurImage
        priority
        className="mx-auto"
        width={337}
        height={190}
        src={image}
        alt={"card-img"}
      />
      <div className="mt-[1rem] p-[1rem] text-center">
        <h4 className="mb-[1rem] text-lg font-[700] text-high-grey-III">
          {title}
        </h4>
        <p className="text-sm leading-[25px] text-high-grey-II">
          {description}
        </p>
      </div>
    </section>
  );
};

export default Card;
