"use client";

import { cn } from "@workspace/ui/lib";
import dynamic from "next/dynamic";
import { ReactNode, useEffect, useMemo } from "react";
import useCoursesStore from "../../stores/course.store";
import { fetchAllCourses } from "../../action/courses.action";
import { usePathname } from "next/navigation";
import { TsaFooter } from "../views/footer";
import { useScrolled } from "@workspace/ui/hooks";
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
  const pathname = usePathname();

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const featuresList: FeatureItem[] = useMemo(() => {
    if (loading) {
      return [
        {
          title: "Loading course data...please wait",
          href: "",
          description: "",
        },
      ];
    }

    const backendCourses: FeatureItem[] = allCourses.map((course) => {
      const courseSlug = course.title
        .toLowerCase()
        .trim()
        .replaceAll(/[\s/]+/g, "-");
      return {
        title: course.title,
        href: course.slug
          ? `/courses/online/${course.slug}`
          : `/courses/${courseSlug}`,
        description: course.about,
      };
    });

    return [...backendCourses];
  }, [allCourses, loading]);

  const isDarkMode = useMemo(
    () =>
      pathname === "/about" ||
      pathname === "/explore" ||
      pathname.includes("/success"),
    [pathname],
  );

  const logoPath = useMemo(
    () =>
      isDarkMode
        ? "https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1760470858/techstudio/tsa-repo/ppsabeafcy5wtzv9ia77.png"
        : "https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1760470861/techstudio/tsa-repo/rcgdvnlkc2tnwkxtxbgh.png",
    [isDarkMode],
  );

  const linkClassName = cn(`hover:!text-red-500`);

  const bgScrollColor = useMemo(
    () =>
      cn(
        isDarkMode ? "backdrop-blur-3xl" : "text-background",
        !isDarkMode && scrolled ? "bg-primary" : ``,
      ),
    [isDarkMode, scrolled],
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
        containerClassName="max-w-[1240px] mx-auto lg:p-0"
      />
      {children}
      {(() => {
        // Combine backend courses and online courses for footer
        // Create objects with title and href for online courses
        // const onlineCoursesForFooter = onlineCourses.map((course) => ({
        //   title: course.title,
        //   href: `/courses/online/${course.slug}`,
        // }))
        // Map backend courses to include href
        const backendCoursesForFooter = allCourses.map((course) => ({
          ...course,
          href: course.slug
            ? `/courses/online/${course.slug}`
            : `/courses/${course.title
                .toLowerCase()
                .trim()
                .replaceAll(/[\s/]+/g, "-")}`,
        }));
        const combinedFooterCourses = [
          // ...onlineCoursesForFooter,
          ...backendCoursesForFooter,
        ];
        return (
          <TsaFooter
            navLinks={combinedFooterCourses as any}
            subscribeComponent={<EmailForm buttonTitle={"Subscribe"} />}
            logopath={"logoPath"}
          />
        );
      })()}
    </main>
  );
};

export default ExternalLayout;
