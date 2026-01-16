import * as React from "react";
import { cn } from "../../utils";
import {
  ChevronDown,
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
import { usePathname } from "next/navigation";

type NavbarDropdownItem = {
  label: string;
  href?: string;
  description?: string;
  icon?: React.ReactNode;
};

type NavbarDropdownSection = {
  title?: string;
  items: NavbarDropdownItem[];
};

type NavbarDropdownProps = {
  label: string;
  sections: NavbarDropdownSection[];
  className?: string;
  isLoading?: boolean;
};

const CLOSE_DELAY = 120;

const NavbarDropdown: React.FC<NavbarDropdownProps> = ({
  label,
  sections,
  className,
  isLoading = false,
}) => {
  const [open, setOpen] = React.useState(false);
  const closeTimeout = React.useRef<number | null>(null);
  const pathname = usePathname();
  const isActive = pathname?.startsWith("/course");

  const clearCloseTimeout = () => {
    if (closeTimeout.current !== null) {
      window.clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  };

  const openMenu = () => {
    clearCloseTimeout();
    setOpen(true);
  };

  const closeMenuWithDelay = () =>
    (closeTimeout.current = window.setTimeout(
      () => setOpen(false),
      CLOSE_DELAY,
    ));

  React.useEffect(() => {
    return () => {
      clearCloseTimeout();
    };
  }, []);

  const getIconConfig = (item: NavbarDropdownItem) => {
    if (item.icon) {
      return {
        icon: item.icon,
        bgClass: "bg-blue-50",
        iconClass: "text-blue-600",
      };
    }

    const label = item.label.toLowerCase();

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

  const truncateDescription = (description?: string) => {
    if (!description) return;
    const firstPeriodIndex = description.indexOf(".");
    if (firstPeriodIndex === -1) return description;
    return description.slice(0, firstPeriodIndex + 1);
  };

  return (
    <div
      className={`relative h-full ${className ?? ""}`}
      onMouseEnter={openMenu}
    >
      <button
        type="button"
        className={cn(
          "inline-flex hover:text-danger h-10 items-center gap-1 border-b-2 border-transparent px-3 text-sm font-medium transition-colors hover:border-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          isActive && "text-mid-danger",
        )}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => (open ? setOpen(false) : openMenu())}
      >
        <span className="font-semibold">{label}</span>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`mt-0.5 inline-block text-xs transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={cn(
          "fixed -z-10 inset-x-0 translate-y-0 top-18 opacity-100 bg-background/95 backdrop-blur-xl shadow-lg ring-1 ring-foreground/5 transition-all duration-500 ease-out origin-top",
          open
            ? "pointer-events-auto max-h-[70vh] overflow-y-auto"
            : "pointer-events-none max-h-0 overflow-hidden",
        )}
        data-lenis-prevent
        data-lenis-prevent-wheel
        // className={cn(
        //   'fixed -z-10 inset-x-0 top-16 opacity-100 bg-background shadow-lg ring-1 ring-foreground/5 transition-all duration-500 ease-out origin-top',
        //   open
        //     ? 'pointer-events-auto translate-y-0'
        //     : 'pointer-events-none -translate-y-210'
        // )}
        onMouseEnter={openMenu}
        onMouseLeave={closeMenuWithDelay}
      >
        <div className="mx-auto max-w-9xl px-8 py-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="flex items-start gap-4 rounded-xl bg-muted/40 p-4 animate-pulse"
                >
                  <div className="h-10 w-10 rounded-full bg-muted" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="h-3 bg-muted rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            sections.map((section, sectionIndex) => (
              <div
                key={section.title ?? sectionIndex}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {section.items.map((item, itemIndex) => (
                  <span key={`${item.label}-${itemIndex}`}>
                    {(() => {
                      const { icon, bgClass, iconClass } = getIconConfig(item);
                      const truncatedDescription = truncateDescription(
                        item.description,
                      );

                      return (
                        <a
                          href={item.href ?? "#"}
                          className="flex items-start bg-transparent justify-between gap-6 rounded-xl border border-transparent bg-background text-left text-foreground/90 transition-colors hover:border-mid-blue/30 hover:bg-mid-blue/5 p-4"
                        >
                          <div className="flex items-start gap-4">
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
                              <div className="font-semibold text-foreground leading-snug">
                                {item.label}
                              </div>
                              {truncatedDescription && (
                                <p
                                  className="mt-1 text-sm font-medium leading-snug text-muted-foreground"
                                  title={item.description}
                                >
                                  {truncatedDescription}
                                </p>
                              )}
                            </div>
                          </div>
                        </a>
                      );
                    })()}
                  </span>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export type { NavbarDropdownProps, NavbarDropdownSection, NavbarDropdownItem };
export default NavbarDropdown;
