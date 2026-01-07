"use client";

import { useCurrentUser } from "@/services/auth/auth.mutations";
import { useModalStore } from "@/store/modalStore";
import { CustomButton, DashboardHeader } from "@workspace/ui/lib";
import { Skeleton } from "@workspace/ui/components";
import { Icons } from "@workspace/ui/icons";
import CreateSheetModal from "../../sheets/_components/CreateSheetModal";

const Hero = () => {
  const { data: currentUser, isLoading } = useCurrentUser();
  const {
    isCreateSheetModalOpen,
    openCreateSheetModal,
    closeCreateSheetModal,
  } = useModalStore();

  return (
    <>
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
              variant="primaryOutline"
              isLeftIconVisible
              icon={<Icons.sheet />}
              onClick={openCreateSheetModal}
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

      <CreateSheetModal
        isOpen={isCreateSheetModalOpen}
        onClose={closeCreateSheetModal}
      />
    </>
  );
};

export default Hero;
