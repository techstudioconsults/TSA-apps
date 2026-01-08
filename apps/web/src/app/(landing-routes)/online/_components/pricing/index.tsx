"use client";

import { FC, useState } from "react";
import { Wrapper } from "@workspace/ui/lib";
import { CustomButton } from "@workspace/ui/lib";
import type { OnlineCourse } from "../../data";
import { ApplicationFormModal } from "../application-form-modal";

interface PricingSectionProps {
  course: OnlineCourse;
}

export const PricingSection: FC<PricingSectionProps> = ({ course }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Check if this is full-stack course to show comparison table
  // const isFullStack = course.slug === "full-stack-development";

  // if (isFullStack) {
  //   return (
  //     <>
  //       <section className="py-16 lg:py-24 bg-white">
  //       <Wrapper className="max-w-6xl">
  //         <div className="text-center mb-12">
  //           <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1F2666] mb-4">
  //             Become a Full-Stack Developer Without Breaking the Bank
  //           </h2>
  //           <p className="text-lg md:text-xl lg:text-2xl text-[#595959] max-w-3xl mx-auto">
  //           Compare the value and make the smart choice for your future
  //           </p>
  //         </div>
  //         <div className="flex flex-col lg:flex-row justify-center gap-11">
  //           <div className="rounded-lg p-10 relative border border-[#EBEBEB]">
  //             <span className="absolute -top-3 left-1/3 transform -translate-x-1/3 w-[255px]  text-[#7B7B7B] border border-[#7B7B7B] px-4 py-1 rounded-full text-lg font-semibold bg-white">
  //             Expensive Alternative
  //             </span>
  //             {/* Bootcamps Abroad */}
  //           <div className="mb-10 mt-4">
  //             <h3 className="text-xl font-bold text-[#263238] mb-4">Bootcamps Abroad</h3>
  //             <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#8B8B8B] mb-2">₦4.5M – ₦18M</h1>
  //             <p className="text-[#595959]">Plus relocation and living costs</p>
  //           </div>
  //           {/* Local Premium Bootcamps */}
  //           <div className="">
  //             <h3 className="text-xl font-bold text-[#263238] mb-4">Local Premium Bootcamps</h3>
  //             <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#8B8B8B] mb-2">₦800k – ₦2M</h1>
  //             <p>Often requires full-time commitment</p>
  //           </div>
  //           </div>
        
  //           <div className=" rounded-lg p-6  relative border border-[#1F2666] bg-[url('/images/pricebg.png')] ">
  //             <span className="absolute -top-3 left-1/3 transform -translate-x-1/2 bg-[#E0ECFF] text-[#0266F4] border border-[#0266F4] px-4 py-1 rounded-full text-sm font-semibold">
  //               Best Value
  //             </span>
  //             <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 mt-4 text-white">Tech Studio Academy</h3>
  //             <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-white">{course.pricing.price}</h1>
  //             <p className="text-white mb-10">One-time payment. No hidden fees</p>
  //             <ul className="space-y-3 mb-6 text-left text-white">
  //               {course.pricing.features.map((feature, index) => (
  //                 <li key={index} className="flex items-start gap-2">
  //                   <svg
  //                     className="w-5 h-5 text-green-300 mt-0.5 flex-shrink-0"
  //                     fill="none"
  //                     stroke="currentColor"
  //                     viewBox="0 0 24 24"
  //                   >
  //                     <path
  //                       strokeLinecap="round"
  //                       strokeLinejoin="round"
  //                       strokeWidth={2}
  //                       d="M5 13l4 4L19 7"
  //                     />
  //                   </svg>
  //                   <span className="text-sm">{feature}</span>
  //                 </li>
  //               ))}
  //             </ul>
  //             <CustomButton
  //               onClick={() => setIsModalOpen(true)}
  //               variant="primary"
  //               size="xl"
  //               className="bg-[#0266F4] text-white px-6 py-5 rounded font-bold w-full"
  //             >
  //               {course.pricing.buttonText}
  //             </CustomButton>
  //           </div>
  //         </div>
  //       </Wrapper>
  //     </section>
  //     <ApplicationFormModal
  //       isOpen={isModalOpen}
  //       onClose={() => setIsModalOpen(false)}
  //       course={course}
  //     />
  //   </>
  //   );
  // }

  // Default pricing card for other courses
  return (
    <>
      <section className="py-16 lg:py-20 bg-white">
        <Wrapper className="max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-[24px] lg:text-[36px] font-bold text-[#1F2666] mb-4">
              Program Investment
            </h2>
            <p className="text-base md:text-lg leading-[25px] text-[#595959] max-w-3xl mx-auto">
            One-time payment for complete access to everything you need.
            </p>
          </div>
          <div className="rounded-lg px-5 md:px-10 pt-5 md:pt-10 pb-10 md:pb-14  relative border border-[#1F2666] max-w-xl mx-auto  bg-[url('/images/pricebg.png')] bg-cover bg-center">
            <div className="mb-8">
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 text-white">{course.pricing.title}</h3>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-white">{course.pricing.price}</h1>
              <p className="text-blue-100">{course.pricing.paymentOption}</p>
            </div>
            <ul className="space-y-4 mb-8 text-white">
              {course.pricing.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-white mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-lg">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="text-center">
              <CustomButton
                onClick={() => setIsModalOpen(true)}
                variant="primary"
                size="lg"
                className="bg-[#0266F4] text-white  px-6 py-5 rounded font-bold w-full"
              >
                {course.pricing.buttonText}
              </CustomButton>
            </div>
          </div>
        </Wrapper>
      </section>
      <ApplicationFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        course={course}
      />
    </>
  );
};

