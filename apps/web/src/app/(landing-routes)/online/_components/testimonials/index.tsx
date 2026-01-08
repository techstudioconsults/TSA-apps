"use client";
import Image from "next/image";
import { FC } from "react";
import { Wrapper } from "@workspace/ui/lib";
import type { OnlineCourse } from "../../data";
import { COMPANIES } from "@/lib/constants";
import { TsaMarquee } from "@/app/views/marquee";

interface TestimonialsSectionProps {
  course: OnlineCourse;
}

export const TestimonialsSection: FC<TestimonialsSectionProps> = ({
  course,
}) => {
    const companiesList = COMPANIES.map((company, index) => {
        return (
          <Image
            priority
            width={100}
            height={50}
            key={index}
            src={company}
            alt="company"
          />
        );
      });
  return (
    <section className="py-16 lg:py-20">
      <Wrapper className="max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-[24px] lg:text-[36px] font-bold text-[#1F2666] mb-4 max-w-xl mx-auto">
            Trusted by Over 3,000 Graduates Worldwide
          </h2>
          <p className="text-base md:text-lg leading-[25px] text-[#595959] max-w-5xl mx-auto">
          Our graduates work at leading Nigerian and international companies
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {course.testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 border"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 text-base">{testimonial.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar ? (
                    <Image src={testimonial.avatar} width={50} height={50} alt={testimonial.name} className="rounded-full"/>
                  ) : (
                    <span>{testimonial.name.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-[#162143]">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Partner logos section */}
        <TsaMarquee className="h-[85px] space-x-[30px] lg:space-x-[73px] mt-10">
        {companiesList}
      </TsaMarquee>
      </Wrapper>
    </section>
  );
};

