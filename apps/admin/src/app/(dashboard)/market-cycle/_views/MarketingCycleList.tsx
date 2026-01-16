"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Calendar, Users } from "lucide-react";

import { Icons } from "@workspace/ui/icons";
import { CustomButton, EmptyState, ErrorEmptyState } from "@workspace/ui/lib";

import { MarketingCycle } from "@/schemas/marketing-cycle.schema";
import {
  useDeleteMarketingCycleMutation,
  useMarketingCyclesQuery,
} from "@/services/marketing-cycle/marketing-cycle.queries";
import { useModalStore } from "@/store/modalStore";
import MarketingCycleForm from "./MarketingCycleForm";
import ConfirmationModal from "@/app/(dashboard)/_components/modals/ConfirmationModal";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@workspace/ui/components";

export default function MarketingCycleList() {
  const router = useRouter();
  const {
    isCreateMarketingCycleModalOpen,
    openCreateMarketingCycleModal,
    closeCreateMarketingCycleModal,
  } = useModalStore();

  const { data, isLoading, error, refetch } = useMarketingCyclesQuery({});
  const { mutateAsync: deleteMarketingCycle, isPending: isDeleting } =
    useDeleteMarketingCycleMutation();

  const cycles = data?.data.items ?? [];

  const [selectedCycle, setSelectedCycle] = useState<MarketingCycle | null>(
    null,
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingCycle, setEditingCycle] = useState<MarketingCycle | null>(null);

  const handleDelete = (cycle: MarketingCycle) => {
    setSelectedCycle(cycle);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedCycle) return;

    try {
      await deleteMarketingCycle(selectedCycle.id);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Failed to delete marketing cycle:", error);
    }
  };

  const handleEdit = (cycle: MarketingCycle) => {
    setEditingCycle(cycle);
    openCreateMarketingCycleModal();
  };

  const handleViewLeads = (cycleId: string) => {
    router.push(`/market-cycle/${cycleId}/leads`);
  };

  const content = (() => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card
              key={i}
              className="animate-pulse flex flex-col w-full justify-between min-h-[274px] border-none shadow-none"
            >
              <CardHeader>
                <div className="h-4 w-1/2 rounded bg-muted" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-muted" />
                  <div className="size-3/4 rounded bg-muted" />
                  <div className="h-3 w-2/4 rounded bg-muted" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-4">
                <div className="h-8 w-24 rounded bg-muted" />
                <div className="h-8 w-24 rounded bg-muted" />
              </CardFooter>
            </Card>
          ))}
        </div>
      );
    }
    if (error) return <ErrorEmptyState onRetry={refetch} />;
    if (!cycles.length) {
      return (
        <EmptyState
          icon={
            <Icons.empty className="size-10 rounded-md bg-primary/10 p-1.5 text-primary" />
          }
          title="Marketing cycles not found"
          description="No marketing cycles available."
          className="bg-background"
        />
      );
    }

    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cycles.map((cycle) => (
          <div
            key={cycle.id}
            className="group relative overflow-hidden rounded-xl p-6 shadow"
          >
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="inline-flex items-center rounded-md bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground/70">
                      {new Date(cycle.startDate).toLocaleDateString()} -{" "}
                      {new Date(cycle.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="line-clamp-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-indigo-900">
                    {cycle.title}
                  </h3>
                </div>
                <div className="flex gap-2">
                  <CustomButton
                    variant="ghost"
                    size="icon"
                    isIconOnly
                    icon={<Users className="h-4 w-4 text-primary" />}
                    onClick={() => handleViewLeads(cycle.id)}
                    ariaLabel="View Leads"
                  />
                  <CustomButton
                    variant="ghost"
                    size="icon"
                    isIconOnly
                    icon={<Icons.edit className="h-4 w-4 text-gray-600" />}
                    onClick={() => handleEdit(cycle)}
                    ariaLabel="Edit Marketing Cycle"
                  />
                  <CustomButton
                    variant="ghost"
                    size="icon"
                    isIconOnly
                    icon={<Icons.trash className="h-4 w-4 text-destructive" />}
                    onClick={() => handleDelete(cycle)}
                    ariaLabel="Delete Marketing Cycle"
                    disabled={isDeleting}
                  />
                </div>
              </div>

              <p className="mb-5 text-sm text-gray-600">{cycle.description}</p>

              <div className="mb-5 space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Calendar className="h-4 w-4 text-indigo-600" />
                  </div>
                  <span className="text-sm font-medium">
                    Created {new Date(cycle.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <Link href={`/market-cycle/${cycle.id}/leads`} className="block">
                <CustomButton
                  isRightIconVisible
                  icon={<Icons.arrowRight className="h-4 w-4" />}
                  className="w-full"
                  variant="primary"
                >
                  View Leads
                </CustomButton>
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  })();

  return (
    <>
      {content}

      <MarketingCycleForm
        isOpen={isCreateMarketingCycleModalOpen}
        onClose={() => {
          closeCreateMarketingCycleModal();
          setEditingCycle(null);
        }}
        initialData={editingCycle as any}
      />

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Marketing Cycle?"
        description="Are you sure you want to delete this marketing cycle? This action cannot be undone."
        isSubmitting={isDeleting}
      />
    </>
  );
}
