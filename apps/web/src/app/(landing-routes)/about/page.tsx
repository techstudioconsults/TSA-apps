import { Hero } from "./_views/hero/Hero";
import { SectionFour } from "./_views/section-four";
import { SectionOne } from "./_views/section-one";
import { SectionThree } from "./_views/section-three";
import { SectionTwo } from "./_views/section-two";

const About = () => {
  return (
    <main>
      <Hero />
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
    </main>
  );
};

export default About;
