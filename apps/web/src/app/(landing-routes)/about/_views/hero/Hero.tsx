import { BlurImage } from "@workspace/ui/components";
import { Wrapper } from "@workspace/ui/lib";

export const Hero = () => {
  return (
    <Wrapper className="flex mt-[6rem] lg:mt-[10rem] flex-col-reverse items-center gap-[28px] text-center lg:flex-row lg:text-left">
      <section className="flex-1">
        <div className="flex-1">
          <span className="text-sm font-bold uppercase text-mid-blue">
            KNOW US MORE
          </span>
          <h1 className="mb-[22px] mt-[12px]">About TechStudio</h1>
        </div>
        <div className="flex-1">
          <p className="leading-[25px]">
            Tech Studio Academy is a tech training company based in Lagos,
            Nigeria, founded in 2017 with the objective of providing
            cost-effective and high-quality tech education to aspiring young
            people in the country.
          </p>
          <p className="my-[2rem] leading-[25px]">
            Over the past four years, the academy has trained over 1000 students
            through both online and in-person classes, and has helped them
            achieve their career goals in the tech industry. Our instructors are
            carefully selected based on both industry experience and teaching
            ability, ensuring that our students receive the best possible
            education
          </p>
          <p className="leading-[25px]">
            We envision becoming a leading and preferred technology training
            provider in Nigeria, responding to the needs of the industry. Our
            mission is to provide high-quality and affordable technology
            training that meets the needs of our students.
          </p>
        </div>
      </section>
      <section className="flex-1">
        <BlurImage
          priority
          width={585}
          height={585}
          src="/images/dayo.png"
          alt="dayo"
          className="object-contain w-full h-full"
        />
      </section>
    </Wrapper>
  );
};
