import { CustomButton, DashboardHeader } from "@workspace/ui/lib";
import { BookOpen, FileSpreadsheet } from "lucide-react";

const Hero = () => {
  return (
    <DashboardHeader
      title={"Welcome, Admin"}
      actionComponent={
        <div className="flex gap-4">
          <CustomButton
            href="/sheets"
            variant="primaryOutline"
            isLeftIconVisible
            icon={<FileSpreadsheet />}
          >
            Create Sheet
          </CustomButton>

          <CustomButton
            href="/createcourse"
            variant="primary"
            isLeftIconVisible
            icon={<BookOpen />}
          >
            Create Course
          </CustomButton>
        </div>
      }
    />
  );
};

export default Hero;
