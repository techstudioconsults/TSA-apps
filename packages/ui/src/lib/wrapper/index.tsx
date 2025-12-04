import { cn } from "@workspace/ui/lib/utils";
// import { usePathname } from 'next/navigation'
import { FC, HtmlHTMLAttributes, ReactNode } from "react";

interface WrapperProperties extends HtmlHTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
  children?: ReactNode;
}

export const Wrapper: FC<WrapperProperties> = ({
  width = "w-full",
  height,
  children,
  className,
  ...rest
}) => {
  // const pathname = usePathname()

  return (
    <section
      {...rest}
      className={cn(
        `mx-auto ${width} ${height} px-4 max-w-[1240px]`,
        // pathname.includes('dashboard') && 'pt-6 pb-10',
        className,
      )}
    >
      {children}
    </section>
  );
};
