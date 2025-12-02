export interface CourseTag {
  bgColor: string;
  img: string;
  text: string;
}

export interface Course {
  id: number;
  classname: string;
  caption: string;
  title: string;
  desc: string;
  bgColor: string;
  img: string;
  tags: CourseTag[];
}

export interface ProgramIntro {
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

export interface ProgramSectionOne {
  cards: ProgramCard[];
}

export interface AboutOnlineSection {
  cards: AboutCard[];
}

export interface ProgramDuration {
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

export interface EducationPrograms {
  intro: ProgramIntro;
  sectionOne: ProgramSectionOne;
  courseList: Course[];
  duration: ProgramDuration;
}
