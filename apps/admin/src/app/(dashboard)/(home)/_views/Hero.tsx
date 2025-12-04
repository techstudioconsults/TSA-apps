"use client";

import { useCurrentUser } from "@/services/auth/auth.mutations";
import { CustomButton, DashboardHeader } from "@workspace/ui/lib";
import { Skeleton } from "@workspace/ui/components";
import { Icons } from "@workspace/ui/icons";

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
            icon={<Icons.sheet />}
          >
            Create Sheet
          </CustomButton>

          <CustomButton
            href="/courses/create"
            variant="primary"
            isLeftIconVisible
            icon={<Icons.book />}
          >
            Create Course
          </CustomButton>
        </div>
      }
    />
  );
};

export default Hero;
