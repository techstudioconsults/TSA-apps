import { CustomButton, DashboardHeader } from "@workspace/ui/lib";

const Hero = () => {
  return (
    <DashboardHeader
      title={"Welcome, Admin"}
      actionComponent={
        <div className="flex gap-4">
          <CustomButton
            href="/sheets"
            variant="outline"
            className="outline-blue-600"
          >
            Create Sheet
          </CustomButton>

          <CustomButton
            href="/createcourse"
            variant="outline"
            className="bg-mid-blue text-white"
          >
            Create Course
          </CustomButton>
        </div>
      }
    />
  );
};

export default Hero;
