import { LucideLoader, LucidePlus, LucidePlusCircle } from "lucide-react";
import {
  cloneElement,
  forwardRef,
  MouseEventHandler,
  ReactElement,
  ReactNode,
} from "react";
import { Button } from "../../components/ui/button";
import Link from "next/link";

type Variant =
  | "default"
  | "primary"
  | "destructive"
  | "subtle"
  | "loading"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";
type Size = "default" | "sm" | "lg" | "xl" | "link" | "icon" | "circle";

interface ButtonProperties {
  type?: "submit" | "button" | "reset";
  /** Specifies the button style variant */
  variant?: Variant;
  /** Specifies the size of the button */
  size?: Size;
  /** Icon to be displayed inside the button */
  icon?: ReactNode;
  /** Text or elements to be displayed inside the button */
  children?: ReactNode;
  /** Indicates if the button is in a loading state */
  isLoading?: boolean;
  /** Indicates if the button is icon only */
  isIconOnly?: boolean;
  /** Indicates if the left icon is visible */
  isLeftIconVisible?: boolean;
  /** Indicates if the right icon is visible */
  isRightIconVisible?: boolean;
  /** Disables the button if true */
  isDisabled?: boolean;
  /** Accessibility label for the button */
  ariaLabel?: string;
  /** Href to link button to a URL or route */
  href?: string;
  /** Class for custom styling */
  className?: string;
  /** Click event handler for the button */
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

/**
 * CustomButton component to render a button with various styles and states.
 *
 * @param {ButtonProps} props - Properties to configure the button.
 * @returns {JSX.Element} The rendered button component.
 */
const CustomButton = forwardRef<HTMLButtonElement, ButtonProperties>(
  (
    {
      type = "button",
      variant,
      size,
      children,
      isLoading = false,
      isLeftIconVisible = false,
      isRightIconVisible = false,
      icon,
      isDisabled = false,
      isIconOnly = false,
      ariaLabel,
      href,
      className,
      onClick,
    },
    reference,
  ) => {
    const modifiedIcon = icon ? (
      cloneElement(icon as ReactElement, {
        className: "w-[1rem] h-[1rem] dark:invert dark:filter",
        "data-testid": "icon",
      })
    ) : (
      <LucidePlusCircle className="h-4 w-4" data-testid="icon" />
    );

    const buttonContent = (
      <>
        {isLeftIconVisible && !isLoading && modifiedIcon}
        {isLoading && (
          <LucideLoader
            className="h-4 w-4 animate-spin"
            data-testid="loading-spinner"
          />
        )}
        {isIconOnly && !isLoading && modifiedIcon}
        {!isIconOnly && children}
        {!isIconOnly && !children && isLoading && "Loading"}
        {isRightIconVisible && !isLoading && modifiedIcon}
      </>
    );

    const buttonClasses = `transition-all duration-300 ease-in-out ${
      isDisabled
        ? "opacity-50 cursor-not-allowed"
        : "hover:shadow-sneob dark:hover:shadow-sneobw focus:shadow-none"
    } ${className}`;

    if (href) {
      const isExternal = /^https?:\/\//.test(href);

      if (isExternal) {
        return (
          <Button
            asChild
            type={type}
            variant={variant}
            size={size}
            disabled={isDisabled}
            aria-label={ariaLabel}
            className={buttonClasses}
            onClick={onClick}
            role="button"
            ref={reference}
          >
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={ariaLabel}
            >
              {buttonContent}
            </a>
          </Button>
        );
      }

      return (
        <Button
          asChild
          variant={variant}
          size={size}
          disabled={isDisabled}
          aria-label={ariaLabel}
          className={buttonClasses}
          onClick={onClick}
          role="button"
          ref={reference}
        >
          <Link href={isDisabled ? "" : href} aria-label={ariaLabel}>
            {buttonContent}
          </Link>
        </Button>
      );
    }

    return (
      <Button
        variant={variant}
        size={size}
        disabled={isDisabled}
        aria-label={ariaLabel}
        className={buttonClasses}
        onClick={onClick}
        role="button"
        ref={reference}
      >
        {buttonContent}
      </Button>
    );
  },
);

export { CustomButton };
