import { Wrapper } from "@workspace/ui/lib";
import { TeamCard } from "../../_components/team-card";

export const SectionThree = () => {
  return (
    <section className="min-h-[1149px] bg-accent">
      <Wrapper className="py-[70px] !mb-0">
        <header className="mx-auto mb-[63px] min-h-[129px] max-w-[650px] text-center">
          <h2 className="mb-[22px] text-[24px] lg:text-[35px]">
            Meet the Team
          </h2>
          <p>
            Our team comprises a dynamic group of young and vibrant
            professionals who possess an unwavering commitment to go the extra
            mile in delivering exceptional service.
          </p>
        </header>
        <section className="grid grid-cols-1 gap-[44px] md:grid-cols-2 xl:grid-cols-3">
          <TeamCard
            image="/team/wasiu.png"
            name="Wasiu Yusuf"
            role="Chief Operations Officer"
            linkedIn=""
          />
          <TeamCard
            image="/team/tosin.png"
            name="Tosin Sanya"
            role="Head of Admin"
            linkedIn="https://www.linkedin.com/in/oluwatosin-sanya-acipm-52a039a0"
          />
          <TeamCard
            image="/team/eggyy.png"
            name={"Eguono Imonieroh"}
            role="Head of Products"
            linkedIn="https://www.linkedin.com/in/eguono-imonieroh-87a919158"
          />
          <TeamCard
            image="/team/kemi-o.png"
            name="Oluwakemi Catherine"
            role="Sales & Marketing"
            linkedIn="https://ng.linkedin.com/in/oladapo-oluwakemi-catherine-35743837a"
          />
          <TeamCard
            image="/team/temi-i.png"
            name="Temiloluwa Ige"
            role="Sales & Marketing"
            linkedIn="https://www.linkedin.com/in/temiloluwaige"
          />
        </section>
      </Wrapper>
    </section>
  );
};
