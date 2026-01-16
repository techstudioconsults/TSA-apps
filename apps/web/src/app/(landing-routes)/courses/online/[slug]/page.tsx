import { notFound } from "next/navigation";
import { getOnlineCourseBySlug } from "../data/online-courses.data";
import { OnlineCourseHero } from "../_components/hero";
// import { WhyStruggleSection } from "../_components/why-struggle";
// import { GuidedPathSection } from "../_components/guided-path";
// import { WhyLearnUIUXSection } from "../_components/why-learn-uiux";
import { WhyChooseSection } from "../_components/why-choose";
// import { CoreSkillsSection } from "../_components/core-skills";
import { LearningJourneySection } from "../_components/learning-journey";
import { WhoShouldJoinSection } from "../_components/who-should-join";
import { OutcomesSection } from "../_components/outcomes";
import { TestimonialsSection } from "../_components/testimonials";
import { BonusesSection } from "../_components/bonuses";
import { PricingSection } from "../_components/pricing";
import { FAQSection } from "../_components/faq";
import { CTASection } from "../_components/cta";

interface OnlineCoursePageProps {
  params: Promise<{ slug: string }>;
}

const OnlineCoursePage = async ({ params }: OnlineCoursePageProps) => {
  const { slug } = await params;
  const course = getOnlineCourseBySlug(slug);

  if (!course) {
    return notFound();
  }

  const isFullStack = slug === "full-stack-development";
  const isUIUX = slug === "ui-ux-design";
  const isCybersecurity = slug === "cybersecurity";
  const isDataAnalytics = slug === "data-analytics";

  return (
    <main className="open-sans">
      <OnlineCourseHero course={course} />
      <WhoShouldJoinSection course={course} />
      {/* {isFullStack && <WhyStruggleSection />} */}
      {/* {isFullStack && <GuidedPathSection />} */}
      {/* {isUIUX && <WhyLearnUIUXSection course={course} />} */}
      <WhyChooseSection course={course} />
      {/* {course.coreSkills && <CoreSkillsSection course={course} />} */}
      {/* {isDataAnalytics && <OutcomesSection course={course} />} */}
      <LearningJourneySection course={course} />
      <TestimonialsSection course={course} />
      <OutcomesSection course={course} />
      <BonusesSection course={course} />
      <PricingSection course={course} />
      {/* {isUIUX  && <TestimonialsSection course={course} />} */}
      {/* {isFullStack && <TestimonialsSection course={course} />} */}
      {/* {isUIUX && <OutcomesSection course={course} />} */}
      {/* {isFullStack && <OutcomesSection course={course} />} */}
      {/* {isUIUX && <BonusesSection course={course} />} */}
      {/* {isUIUX && <PricingSection course={course} />} */}
      {/* {isCybersecurity && <WhoShouldJoinSection course={course} />} */}
      {/* {isUIUX && <WhoShouldJoinSection course={course} />} */}
      {/* {isDataAnalytics && <WhoShouldJoinSection course={course} />} */}
      {/* {!isDataAnalytics || isUIUX && <OutcomesSection course={course} />} */}
      {/* {isCybersecurity && <OutcomesSection course={course} />} */}
      {/* {!isUIUX || isFullStack && <TestimonialsSection course={course} />} */}
      {/* {isDataAnalytics && <TestimonialsSection course={course}/>} */}
      {/* {isCybersecurity && <TestimonialsSection course={course}/>} */}
      {/* {!isUIUX  && <BonusesSection course={course} />} */}
      {/* {!isUIUX  && <PricingSection course={course} />} */}
      <FAQSection course={course} />
      <CTASection course={course} />
      {!isFullStack && !isUIUX && !isCybersecurity && !isDataAnalytics && (
        <WhoShouldJoinSection course={course} />
      )}
    </main>
  );
};

export default OnlineCoursePage;
