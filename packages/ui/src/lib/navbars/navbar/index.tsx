/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Menu as MenuIcon, Moon, X } from "lucide-react";
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
  const showDesktopMenu = showFeatures || desktopNav.length > 0;
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

  const pathname = usePathname();
  const isDarkRoute = React.useMemo(
    () =>
      pathname === "/about" ||
      pathname === "/explore" ||
      pathname.includes("/success"),
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

  return (
    <section className={`py-4 fixed w-full !z-[999] top-0  ${className}`}>
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
                {showFeatures && (
                  <NavbarDropdown
                    label={featuresLabel}
                    sections={featureSections}
                  />
                )}

                {desktopNav.map((link) => (
                  <NavigationMenuItem key={link.label}>
                    <Link
                      href={link.href}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        `bg-transparent rounded-none hover:bg-transparent hover:underline font-semibold`,
                        navLinkClassNames,
                      )}
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuItem>
                ))}
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
                    isDarkRoute ? "text-black" : "text-white",
                  )}
                />
              ) : (
                <MenuIcon
                  className={cn(
                    "size-6",
                    isDarkRoute ? "text-black" : "text-white",
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
          "fixed -z-10 inset-x-0 translate-y-0 h-0 overflow-hidden top-18 opacity-100 bg-background shadow-lg ring-1 ring-foreground/5 transition-all duration-500 ease-out origin-top lg:hidden",
          mobileMenuOpen
            ? "pointer-events-auto h-screen"
            : "pointer-events-none h-0",
        )}
      >
        <div className="container px-4 py-6">
          <div className="flex flex-col">
            {showFeatures && (
              <Accordion type="single" collapsible className="mb-2 mt-4">
                <AccordionItem value="features" className="border-none">
                  <AccordionTrigger className="text-base hover:no-underline">
                    {featuresLabel}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {featuresList.map((feature, index) => (
                        <Link
                          href={feature.href || "#"}
                          key={`${feature.title}-${index}`}
                          className="hover:bg-muted/70 rounded-md transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div>
                            <p className="flex items-start gap-2 mb-2">
                              <span className="text-foreground font-semibold">
                                {feature.title}
                              </span>
                            </p>
                            {feature.description ? (
                              <p className="text-muted-foreground text-justify text-sm">
                                {feature.description}
                              </p>
                            ) : null}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            {mobileNav.length > 0 && (
              <div className="flex flex-col gap-6 items-center">
                {mobileNav.map((link) => (
                  <Link
                    href={link.href}
                    key={link.label}
                    className="text-foreground hover:underline !font-bold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
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
