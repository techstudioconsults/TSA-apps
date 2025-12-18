"use client";

import { useActivitiesQuery } from "@/services/dashboard/dashboard.queries";
import { Icons } from "@workspace/ui/icons";
import { cn, EmptyState, ErrorEmptyState } from "@workspace/ui/lib";
import {
  AdvancedDataTable,
  IColumnDefinition,
  TableSkeleton,
} from "@workspace/ui/lib/dashboard-table";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";

interface Activity extends Record<string, string> {
  id: string;
  activity: string;
  description: string;
  createdAt: string;
}

const formatDateTime = (dateString: string): string => {
  try {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  } catch {
    return dateString;
  }
};

// const getRowTextColor = (activity: string): string => {
//   const a = activity.toLowerCase()
//   if (a.includes('sheet')) return 'text-blue-800'
//   if (a.includes('class') || a.includes('cohort')) return 'text-green-800'
//   if (a.includes('course')) return 'text-purple-800'
//   return 'text-gray-800'
// }

const RecentTable = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, error, refetch } = useActivitiesQuery({
    page,
    limit: 6,
  });

  const activities = (data?.activities || []) as Activity[];
  const totalPages = data?.totalPages || 1;
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  const columns: IColumnDefinition<Activity>[] = [
    {
      header: "Activity",
      accessorKey: "activity",
      render: (value) => (
        <span
          className={cn(
            "text-sm font-medium",
            // getRowTextColor(row.activity)
          )}
        >
          {value as string}
        </span>
      ),
    },
    {
      header: "Description",
      accessorKey: "description",
      render: (value) => (
        <span className={cn("text-sm text-gray-600")}>{value as string}</span>
      ),
    },
    {
      header: "Date & Time",
      accessorKey: "createdAt",
      render: (value) => (
        <span className={cn("text-sm capitalize")}>
          {formatDateTime(value as string)}
        </span>
      ),
    },
  ];

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (error) {
    return <ErrorEmptyState onRetry={refetch} />;
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          Recent Activities
        </h2>
      </div>

      <AdvancedDataTable
        data={activities}
        columns={columns}
        enablePagination
        currentPage={page}
        showColumnCustomization={false}
        onPageChange={setPage}
        totalPages={totalPages}
        itemsPerPage={10}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        showPagination
        emptyState={
          <EmptyState
            icon={<Icons.user />}
            title="Table Activity"
            description={`No recent activities found.`}
          />
        }
      />
    </div>
  );
};

export default RecentTable;
