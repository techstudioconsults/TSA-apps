import { ReactNode } from "react";
import { CustomButton } from "../button";

declare global {
  type ButtonVariant = React.ComponentProps<typeof CustomButton>["variant"];
  type ButtonSize = React.ComponentProps<typeof CustomButton>["size"];

  type FeatureItem = {
    title: string;
    description?: string;
    href?: string;
    icon?: ReactNode;
  };

  type NavLinkItem = {
    label: string;
    href: string;
  };

  type CTAItem = {
    label: string;
    href?: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    ariaLabel?: string;
    icon?: ReactNode;
    isIconOnly?: boolean;
    isLeftIconVisible?: boolean;
    isRightIconVisible?: boolean;
    isLoading?: boolean;
    isDisabled?: boolean;
    className?: string;
  };

  interface NavbarProps {
    // Branding
    brandHref?: string;
    brandLabel?: string;
    brandLogoSrc?: string;
    brandLogoAlt?: string;

    // Menus
    features?: FeatureItem[];
    featuresLabel?: string;
    desktopLinks?: NavLinkItem[];
    mobileLinks?: NavLinkItem[];

    // Actions
    ctas?: CTAItem[];

    // State
    isLoading?: boolean;

    // Accessibility
    menuButtonAriaLabel?: string;

    // Styling
    className?: string; // applied to section wrapper
    containerClassName?: string; // applied to inner container
    navLinkClassNames?: string;
  }
}

export {};
