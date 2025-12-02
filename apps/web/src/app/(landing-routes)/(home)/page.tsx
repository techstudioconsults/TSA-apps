import { Hero } from "./_views/hero";
import { SectionFive } from "./_views/section-five";
import { SectionOne } from "./_views/section-one";
import { SectionTwo } from "./_views/section-two";
import { SectionThree } from "./_views/section-three";
import { SectionFour } from "./_views/section-four";

const Home = async () => {
  return (
    <main>
      <Hero />
      <section>
        <SectionOne />
        <SectionTwo />
        <SectionThree />
        <SectionFour />
        <SectionFive />
      </section>
    </main>
  );
};

export default Home;
