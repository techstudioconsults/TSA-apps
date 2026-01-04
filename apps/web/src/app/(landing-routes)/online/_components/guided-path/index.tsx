"use client";

import { FC } from "react";
import Image from "next/image";
import { Wrapper } from "@workspace/ui/lib";
import { GraduationCap, Wrench, Video, Compass } from "lucide-react";

interface GuidedPathSectionProps {
  title?: string;
  features?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

export const GuidedPathSection: FC<GuidedPathSectionProps> = ({
  title = "A Guided Path to Becoming a Full-Stack Developer in 18 Weeks",
  features = [
    {
      icon: "calendar",
      title: "Live weekend classes",
      description: "Interactive sessions with instructors",
    },
    {
      icon: "folder",
      title: "Hands-on real projects",
      description: "Build portfolio-worthy apps",
    },
    {
      icon: "play",
      title: "Online video resources",
      description: "Learn, even at your own pace",
    },
    {
      icon: "route",
      title: "Structured roadmap",
      description: "Clear path from zero to hero",
    },
  ],
}) => {
  const getIcon = (iconType: string) => {
    const iconClass = "w-6 h-6 text-blue-500";
    switch (iconType) {
      case "calendar":
        return <GraduationCap className={iconClass} />;
      case "folder":
        return <Wrench className={iconClass} />;
      case "play":
        return <Video className={iconClass} />;
      case "route":
        return <Compass className={iconClass} />;
      default:
        return <GraduationCap className={iconClass} />;
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <Wrapper className="max-w-6xl">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1F2666] mb-8 text-center max-w-4xl mx-auto">
              {title}
            </h2>
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-between ">
            <div className=" rounded-2xl p-1  flex items-center justify-center w-full lg:w-[55%] bg-[#EDF5FF]">
              <Image width={300} height={300} src={"/images/code-editor.png"} alt="code-editor" className="w-full h-full object-cover"/>
            </div>
            <div className="space-y-8 w-full lg:w-[40%]">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 border p-2.5 rounded-lg">
                  <div className="mt-1 p-3 bg-[#E8F1FF] rounded-[17.38px]">{getIcon(feature.icon)}</div>
                  <div className="">
                    <h3 className="text-lg font-semibold text-[#303030]">{feature.title}</h3>
                    <p className="text-base text-[#595959]">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
     
        </div>
      </Wrapper>
    </section>
  );
};

