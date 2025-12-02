"use client";

import { useCurrentUser } from "@/lib/services/auth/auth.mutations";
import { CustomButton, DashboardHeader } from "@workspace/ui/lib";
import { Skeleton } from "@workspace/ui/components";
import { BookOpen, FileSpreadsheet } from "lucide-react";

const Hero = () => {
  const { data: currentUser, isLoading } = useCurrentUser();
  return (
    <DashboardHeader
      title={
        isLoading ? (
          <Skeleton className="h-7 w-48 rounded-sm" />
        ) : (
          `Welcome back, ${currentUser?.data.firstName}!`
        )
      }
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
