import React, { HTMLAttributes, useRef } from "react";

interface ThumbProperties extends HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  index: string;
  title: string;
  onClick?: () => void;
}

export const Thumb: React.FC<ThumbProperties> = ({
  selected,
  index,
  title,
  onClick,
  ...rest
}) => {
  const thumbReference = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (selected && thumbReference.current) {
  //     // Scroll the selected thumbnail into view if not visible
  //     thumbReference.current.scrollIntoView({
  //       behavior: "smooth",
  //       block: "nearest",
  //       inline: "center",
  //     });
  //   }
  // }, [selected]);

  return (
    <section ref={thumbReference} {...rest}>
      <div className="w-[300px] p-4" onClick={onClick}>
        <p className="text-center text-xs font-semibold">{title}</p>
      </div>
    </section>
  );
};
