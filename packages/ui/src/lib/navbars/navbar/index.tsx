/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Menu as MenuIcon,
  Moon,
  X,
  Code2,
  Database,
  Palette,
  Server,
  ShieldCheck,
  LineChart,
  Cpu,
  Globe2,
  PenTool,
} from "lucide-react";
import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../../../components/ui/navigation-menu";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion";
import { CustomButton } from "../../button";
import { cn } from "../../utils";
import { Logo } from "../../logo";
import NavbarDropdown from "../_components/navbar-dropdown";
import Link from "next/link";
import { usePathname } from "next/navigation";

const defaultFeatures: FeatureItem[] = [
  { title: "Dashboard", description: "Overview of your activity", href: "#" },
  { title: "Analytics", description: "Track your performance", href: "#" },
  { title: "Settings", description: "Configure your preferences", href: "#" },
  { title: "Integrations", description: "Connect with other tools", href: "#" },
  { title: "Storage", description: "Manage your files", href: "#" },
  { title: "Support", description: "Get help when needed", href: "#" },
];

const defaultDesktopLinks: NavLinkItem[] = [
  { label: "Products", href: "#" },
  { label: "Resources", href: "#" },
  { label: "Contact", href: "#" },
];

const defaultMobileLinks: NavLinkItem[] = [
  { label: "Templates", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Pricing", href: "#" },
];

const defaultCTAs: CTAItem[] = [
  { label: "Sign in", variant: "outline", href: "#" },
  { label: "Register", variant: "primary", href: "#" },
];

const Navbar = ({
  brandHref = "https://www.techstudioacademy.com",
  brandLabel = "",
  brandLogoSrc = "https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1760470858/techstudio/tsa-repo/ppsabeafcy5wtzv9ia77.png",
  brandLogoAlt = "Logo",
  navLinkClassNames,
  features,
  featuresLabel = "Courses",
  desktopLinks,
  mobileLinks,
  ctas,
  isLoading = false,

  menuButtonAriaLabel = "Open menu",

  className = "",
  containerClassName = "",
}: NavbarProps) => {
  const featuresList = Array.isArray(features) ? features : defaultFeatures;
  const desktopNav = Array.isArray(desktopLinks)
    ? desktopLinks
    : defaultDesktopLinks;
  const mobileNav = Array.isArray(mobileLinks)
    ? mobileLinks
    : defaultMobileLinks;
  const actions = Array.isArray(ctas) ? ctas : defaultCTAs;

  const showFeatures = featuresList.length > 0;
  const showDesktopMenu = desktopNav.length > 0;
  const showActions = actions.length > 0;

  const featureSections = [
    {
      title: undefined,
      items: featuresList.map((feature) => ({
        label: feature.title,
        href: feature.href,
        description: feature.description,
      })),
    },
  ];

  // Always show the features label even when loading
  const showFeaturesLabel = true;

  const pathname = usePathname();
  const isLightNavbar = React.useMemo(
    () => pathname === "/about" || pathname === "/explore",
    [pathname],
  );

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const closeTimeout = React.useRef<number | null>(null);

  const clearCloseTimeout = () => {
    if (closeTimeout.current !== null) {
      window.clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  };

  const toggleMobileMenu = () => {
    clearCloseTimeout();
    setMobileMenuOpen(!mobileMenuOpen);
  };

  React.useEffect(() => {
    return () => {
      clearCloseTimeout();
    };
  }, []);

  const getMobileIconConfig = (item: FeatureItem) => {
    if (item.icon) {
      return {
        icon: item.icon,
        bgClass: "bg-blue-50",
        iconClass: "text-blue-600",
      };
    }

    const label = item.title.toLowerCase();

    if (
      label.includes("frontend") ||
      label.includes("react") ||
      label.includes("javascript")
    ) {
      return {
        icon: <Code2 className="h-5 w-5" />,
        bgClass: "bg-sky-50",
        iconClass: "text-sky-600",
      };
    }

    if (
      label.includes("backend") ||
      label.includes("node") ||
      label.includes("api")
    ) {
      return {
        icon: <Server className="h-5 w-5" />,
        bgClass: "bg-indigo-50",
        iconClass: "text-indigo-600",
      };
    }

    if (
      label.includes("design") ||
      label.includes("ui") ||
      label.includes("ux")
    ) {
      return {
        icon: <Palette className="h-5 w-5" />,
        bgClass: "bg-pink-50",
        iconClass: "text-pink-600",
      };
    }

    if (
      label.includes("data") ||
      label.includes("analytics") ||
      label.includes("science")
    ) {
      return {
        icon: <Database className="h-5 w-5" />,
        bgClass: "bg-emerald-50",
        iconClass: "text-emerald-600",
      };
    }

    if (label.includes("product") || label.includes("management")) {
      return {
        icon: <LineChart className="h-5 w-5" />,
        bgClass: "bg-amber-50",
        iconClass: "text-amber-600",
      };
    }

    if (label.includes("cyber") || label.includes("security")) {
      return {
        icon: <ShieldCheck className="h-5 w-5" />,
        bgClass: "bg-red-50",
        iconClass: "text-red-600",
      };
    }

    if (label.includes("cloud") || label.includes("devops")) {
      return {
        icon: <Globe2 className="h-5 w-5" />,
        bgClass: "bg-blue-50",
        iconClass: "text-blue-600",
      };
    }

    if (label.includes("writing") || label.includes("copy")) {
      return {
        icon: <PenTool className="h-5 w-5" />,
        bgClass: "bg-violet-50",
        iconClass: "text-violet-600",
      };
    }

    return {
      icon: <Cpu className="h-5 w-5" />,
      bgClass: "bg-slate-50",
      iconClass: "text-slate-600",
    };
  };

  const truncateMobileDescription = (description?: string, maxLength = 110) => {
    if (!description) return;
    if (description.length <= maxLength) return description;
    return description.slice(0, maxLength).trimEnd() + "…";
  };

  return (
    <section
      className={cn(
        "py-4 fixed w-full !z-[999] top-0 transition-colors duration-300",
        isLightNavbar ? "bg-white text-black" : "bg-primary text-white",
        className,
      )}
    >
      <div className={`container px-4 ${containerClassName}`}>
        <nav className="flex items-center justify-between">
          <Logo logo={brandLogoSrc} />
          {showDesktopMenu && (
            <NavigationMenu className="hidden lg:block">
              <NavigationMenuList>
                {/* <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      `bg-transparent rounded-none hover:!bg-transparent hover:underline`,
                      navLinkClassNames
                    )}
                  >
                    {featuresLabel}
                  </NavigationMenuTrigger>
                  {showFeatures && (
                    <NavigationMenuContent className='w-full'>
                      <div className='grid w-[100vw] grid-cols-2 p-3'>
                        {featuresList.map((feature, index) => (
                          <NavigationMenuLink
                            href={feature.href || '#'}
                            key={`${feature.title}-${index}`}
                            className='hover:bg-muted/70 rounded-md p-3 transition-colors'
                          >
                            <div>
                              <p className='flex items-start gap-3 mb-1'>
                                {feature.icon && (
                                  <span className='size-4'>{feature.icon}</span>
                                )}
                                <span className='text-foreground font-semibold'>
                                  {feature.title}
                                </span>
                              </p>
                              {feature.description ? (
                                <p className='text-muted-foreground text-justify text-xs'>
                                  {feature.description}
                                </p>
                              ) : null}
                            </div>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  )}
                </NavigationMenuItem> */}
                {showFeaturesLabel && (
                  <NavbarDropdown
                    label={featuresLabel}
                    sections={featureSections}
                    isLoading={isLoading}
                  />
                )}

                {desktopNav.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <NavigationMenuItem key={link.label}>
                      <Link
                        href={link.href}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          `bg-transparent rounded-md hover:bg-transparent focus:bg-transparent transition-all focus:text-mid-danger hover:underline font-semibold`,
                          navLinkClassNames,
                          isActive &&
                            "text-mid-danger font-bold transition-all",
                        )}
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          )}

          {showActions && (
            <div className="hidden items-center gap-4 lg:flex">
              {actions.map((action, idx) => (
                <CustomButton
                  key={`${action.label}-${idx}`}
                  href={action.href}
                  variant={action.variant}
                  size={action.size}
                  ariaLabel={action.ariaLabel || action.label}
                  icon={action.icon}
                  isIconOnly={action.isIconOnly}
                  isLeftIconVisible={action.isLeftIconVisible}
                  isRightIconVisible={action.isRightIconVisible}
                  isLoading={action.isLoading}
                  isDisabled={action.isDisabled}
                  className={action.className}
                >
                  {!action.isIconOnly && action.label}
                </CustomButton>
              ))}
            </div>
          )}

          <div className="lg:hidden">
            <CustomButton
              variant="default"
              size="icon"
              ariaLabel={menuButtonAriaLabel}
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X
                  className={cn(
                    "size-6",
                    isLightNavbar ? "text-black" : "text-white",
                  )}
                />
              ) : (
                <MenuIcon
                  className={cn(
                    "size-6",
                    isLightNavbar ? "text-black" : "text-white",
                  )}
                />
              )}
            </CustomButton>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={cn(
          "-z-10 translate-y-0 h-0 top-18 opacity-100 shadow-lg ring-1 ring-foreground/5 transition-all duration-500 ease-out origin-top lg:hidden",
          isLightNavbar ? "bg-white text-black" : "bg-primary text-white",
          mobileMenuOpen
            ? "pointer-events-auto h-[calc(100vh-72px)] overflow-y-auto !p-0"
            : "pointer-events-none h-0 overflow-hidden",
        )}
      >
        <div className="px-4 py-6">
          <div className="flex flex-col items-center">
            {showFeaturesLabel && (
              <Accordion type="single" collapsible className="mb-2 mt-4 !p-0">
                <AccordionItem value="features" className="border-none">
                  <AccordionTrigger
                    className={cn(
                      "text-base hover:no-underline font-bold",
                      isLightNavbar ? "text-black" : "text-white",
                    )}
                  >
                    {featuresLabel}
                  </AccordionTrigger>
                  <AccordionContent className="">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {featuresList.map((feature, index) => (
                        <Link
                          href={feature.href || "#"}
                          key={`${feature.title}-${index}`}
                          className="flex items-start gap-4 rounded-xl border border-transparent bg-background text-left text-foreground/90 transition-colors hover:border-mid-blue/30 hover:bg-mid-blue/5 p-4"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {(() => {
                            const { icon, bgClass, iconClass } =
                              getMobileIconConfig(feature);
                            const truncatedDescription =
                              truncateMobileDescription(feature.description);

                            return (
                              <>
                                <div
                                  className={cn(
                                    "mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
                                    bgClass,
                                  )}
                                >
                                  <span
                                    className={cn(
                                      "inline-flex text-[18px] leading-none",
                                      iconClass,
                                    )}
                                  >
                                    {icon}
                                  </span>
                                </div>
                                <div>
                                  <p className="text-foreground font-semibold leading-snug mb-1">
                                    {feature.title}
                                  </p>
                                  {truncatedDescription && (
                                    <p
                                      className="text-muted-foreground text-sm leading-snug"
                                      title={feature.description}
                                    >
                                      {truncatedDescription}
                                    </p>
                                  )}
                                </div>
                              </>
                            );
                          })()}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            {mobileNav.length > 0 && (
              <div className="flex flex-col gap-6 items-center">
                {mobileNav.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      href={link.href}
                      key={link.label}
                      className={cn(
                        "hover:underline !font-bold",
                        isLightNavbar ? "text-black" : "text-white",
                        isActive && "text-red-500",
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            )}

            {showActions && (
              <div className="mt-6 flex flex-col gap-4 items-center">
                {actions.map((action, idx) => (
                  <CustomButton
                    key={`mobile-${action.label}-${idx}`}
                    href={action.href}
                    variant={action.variant}
                    size={action.size}
                    ariaLabel={action.ariaLabel || action.label}
                    icon={action.icon}
                    isIconOnly={action.isIconOnly}
                    isLeftIconVisible={action.isLeftIconVisible}
                    isRightIconVisible={action.isRightIconVisible}
                    isLoading={action.isLoading}
                    isDisabled={action.isDisabled}
                    className={action.className}
                  >
                    {!action.isIconOnly && action.label}
                  </CustomButton>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Navbar };
