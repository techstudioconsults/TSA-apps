import * as React from "react";
import { cn } from "../../utils";
import { ChevronDown } from "lucide-react";

type NavbarDropdownItem = {
  label: string;
  href?: string;
  description?: string;
};

type NavbarDropdownSection = {
  title?: string;
  items: NavbarDropdownItem[];
};

type NavbarDropdownProps = {
  label: string;
  sections: NavbarDropdownSection[];
  className?: string;
};

const CLOSE_DELAY = 120;

const NavbarDropdown: React.FC<NavbarDropdownProps> = ({
  label,
  sections,
  className,
}) => {
  const [open, setOpen] = React.useState(false);
  const closeTimeout = React.useRef<number | null>(null);

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

  return (
    <div
      className={`relative h-full ${className ?? ""}`}
      onMouseEnter={openMenu}
    >
      <button
        type="button"
        className={cn(
          "inline-flex hover:text-danger  h-10 items-center gap-1 border-b-2 border-transparent px-3 text-sm font-medium transition-colors hover:border-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
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
          "fixed -z-10 inset-x-0 translate-y-0 h-0 overflow-hidden top-18 opacity-100 bg-background shadow-lg ring-1 ring-foreground/5 transition-all duration-500 ease-out origin-top",
          open ? "pointer-events-auto h-150" : "pointer-events-none h-0",
        )}
        // className={cn(
        //   'fixed -z-10 inset-x-0 top-16 opacity-100 bg-background shadow-lg ring-1 ring-foreground/5 transition-all duration-500 ease-out origin-top',
        //   open
        //     ? 'pointer-events-auto translate-y-0'
        //     : 'pointer-events-none -translate-y-210'
        // )}
        onMouseEnter={openMenu}
        onMouseLeave={closeMenuWithDelay}
      >
        <div className="mx-auto max-w-7xl px-8 py-6">
          {sections.map((section, sectionIndex) => (
            <div
              key={section.title ?? sectionIndex}
              className="grid grid-cols-3 gap-4"
            >
              {section.items.map((item, itemIndex) => (
                <span key={`${item.label}-${itemIndex}`}>
                  <a
                    href={item.href ?? "#"}
                    className="block rounded-md h-full text-left text-foreground/90 transition-colors hover:bg-mid-blue/10 p-4 hover:text-foreground"
                  >
                    <div className="font-bold text-primary leading-snug">
                      {item.label}
                    </div>
                    {item.description && (
                      <p className="mt-1 text-sm !font-medium leading-snug text-muted-foreground">
                        {item.description}
                      </p>
                    )}
                  </a>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export type { NavbarDropdownProps, NavbarDropdownSection, NavbarDropdownItem };
export default NavbarDropdown;
