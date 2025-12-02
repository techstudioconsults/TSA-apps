"use client";

import { cn, useScrolled } from "@workspace/ui/lib";
import dynamic from "next/dynamic";
import { ReactNode, useEffect } from "react";
import useCoursesStore from "../../stores/course.store";
import { fetchAllCourses } from "../../action/courses.action";
import { usePathname } from "next/navigation";
import { TsaFooter } from "../views/footer";
import { EmailForm } from "./(home)/_components/email-form/email-form";

const DynamicNavbar = dynamic(
  () => import("@workspace/ui/lib").then((m) => m.Navbar),
  {
    ssr: false,
  },
);

const STATIC_LINK: NavLinkItem[] = [
  { label: "About Us", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

const CTAs: CTAItem[] = [
  {
    label: "Register",
    variant: `primary`,
    href: "/register",
    size: `lg`,
    className: `bg-mid-blue`,
  },
];

const ExternalLayout = ({ children }: { children: ReactNode }) => {
  const { allCourses, loading } = useCoursesStore();
  const { scrolled } = useScrolled({ threshold: 10 });

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const featuresList: FeatureItem[] = loading
    ? [
        {
          title: "Loading course data...please wait",
          href: "",
          description: "",
        },
      ]
    : allCourses.map((course) => {
        const courseSlug = course.title
          .toLowerCase()
          .trim()
          .replaceAll(/[\s/]+/g, "-");
        return {
          title: course.title,
          href: `/courses/${courseSlug}`,
          description: course.about,
        };
      });

  const pathname = usePathname();
  const isDarkMode =
    pathname === "/about" ||
    pathname === "/explore" ||
    pathname.includes("/success");
  const logoPath = isDarkMode
    ? "https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1760470858/techstudio/tsa-repo/ppsabeafcy5wtzv9ia77.png"
    : "https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1760470861/techstudio/tsa-repo/rcgdvnlkc2tnwkxtxbgh.png";
  const linkClassName = cn(`hover:!text-red-500`);
  const bgScrollColor = cn(
    isDarkMode ? "backdrop-blur-3xl" : "text-background",
    !isDarkMode && scrolled ? "bg-primary" : ``,
  );

  return (
    <main>
      <DynamicNavbar
        ctas={CTAs}
        navLinkClassNames={linkClassName}
        className={cn(bgScrollColor)}
        brandLogoSrc={logoPath}
        features={featuresList}
        featuresLabel="Courses"
        desktopLinks={STATIC_LINK}
        mobileLinks={STATIC_LINK}
        containerClassName="max-w-[1240px] lg:p-0"
      />
      {children}
      <TsaFooter
        navLinks={allCourses}
        subscribeComponent={<EmailForm buttonTitle={"Subscribe"} />}
        logopath={"logoPath"}
      />
    </main>
  );
};

export default ExternalLayout;
