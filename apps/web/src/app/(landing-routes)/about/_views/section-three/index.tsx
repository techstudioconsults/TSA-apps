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
            image="/team/adeleye-stephen.jpeg"
            name="Adeleye Stephen"
            role="Head of Admin"
            linkedIn="http://linkedin.com/in/stephen-adeleye-36148a3b1"
          />
          <TeamCard
            image="/team/eggyy.png"
            name={"Eguono Imonieroh"}
            role="Head of Products"
            linkedIn="https://www.linkedin.com/in/eguono-imonieroh-87a919158"
          />
          <TeamCard
            image="/team/janet-adeyemi.jpeg"
            name="Adeyemi Janet"
            role="Sales & Marketing"
            linkedIn="https://www.linkedin.com/in/adeyemi-janet-a46167282"
          />
          <TeamCard
            image="/team/gbemisola-akinleye.jpeg"
            name="Gbemisola Akinleye"
            role="Sales & Marketing"
            linkedIn="https://www.linkedin.com/in/gbemisola-akinleye-a47a57244"
          />
        </section>
      </Wrapper>
    </section>
  );
};
