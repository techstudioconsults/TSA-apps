import { HtmlHTMLAttributes } from "react";

declare global {
  interface CourseTag {
    bgColor: string;
    img: string;
    text: string;
  }

  interface Course {
    id: number;
    classname: string;
    caption: string;
    title: string;
    desc: string;
    bgColor: string;
    img: string;
    tags: CourseTag[];
  }

  interface ProgramIntro {
    title: string;
    subTitle: string;
    img?: string;
  }

  interface ProgramCard {
    image: string;
    text: string;
  }

  interface AboutCard {
    image: string;
    heading: string;
    text: string;
  }

  interface ProgramSectionOne {
    cards: ProgramCard[];
  }

  interface AboutOnlineSection {
    cards: AboutCard[];
  }

  interface ProgramDuration {
    online: {
      time: string;
      date: string;
      price: string;
    };
    weekday: {
      time: string;
      date: string;
      price: string;
    };
    weekend: {
      time: string;
      date: string;
      price: string;
    };
    span: {
      weekday: string;
      weekend: string;
    };
  }

  interface EducationPrograms {
    intro: ProgramIntro;
    sectionOne: ProgramSectionOne;
    courseList: Course[];
    duration: ProgramDuration;
  }

  interface LogoProperties {
    logo: string;
  }

  interface courseContentProperties {
    name: string;
    image: string;
    link: string;
  }

  interface TeamProperties {
    image: string;
    name: string;
    role: string;
    linkedIn: string;
  }

  interface TsaBannerProperties extends HtmlHTMLAttributes<HTMLDivElement> {
    testimonials: {
      message: string;
      image: string;
      name: string;
      job: string;
    }[];
    topSlot?: ReactNode;
    bottomSlot?: ReactNode;
    classNames?: string;
  }

  interface slideContentProperties {
    name: string;
    image: string;
    link: string;
    _image?: ReactNode;
  }

  interface TsaMarqueeProperties extends HtmlHTMLAttributes<HTMLDivElement> {
    children: ReactNode;
  }

  interface TsaBannerProperties extends HtmlHTMLAttributes<HTMLDivElement> {
    testimonials: {
      message: string;
      image: string;
      name: string;
      job: string;
    }[];
    topSlot?: ReactNode;
    bottomSlot?: ReactNode;
  }

  interface TsaCarouselProperties {
    courseContent?: slideContentProperties[];
    galleryContent?: ReactNode[];
    facilityContent?: string[];
    bgColor?: string;
    showIndicator?: boolean;
    variant?: "course" | "gallery" | "facility";
    stopZoom?: boolean;
    itemsPerView?: number;
    facilityCaroselFlatMaxWidth?: string;
  }

  interface TsaNavbarProperties {
    navLinks: NavLink[];
    logopath: string;
    children?: ReactNode;
    bgScrollColor?: string;
    linkClassName?: string;
    className?: string;
    showBanner?: boolean;
    bannerDuration?: string;
  }

  interface TsaFooterProperties
    extends TsaNavbarProperties, HtmlHTMLAttributes<HTMLDivElement> {
    subscribeComponent: ReactNode;
  }
}

export {};
