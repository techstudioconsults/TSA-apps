"use client";

import { useDashboardStatsQuery } from "@/services/dashboard/dashboard.queries";
import { DashboardCard } from "@/components/shared/dashboard-card";
import { Icon, Icons } from "@workspace/ui/icons";
import { DashboardCardsLoader } from "../_components/loaders";
import { ErrorEmptyState } from "@workspace/ui/lib";

const Cards = () => {
  const { data, isLoading, error, refetch } = useDashboardStatsQuery();

  if (isLoading) {
    return <DashboardCardsLoader />;
  }

  if (error) {
    return <ErrorEmptyState onRetry={refetch} />;
  }

  const cards = [
    {
      title: "Total Courses",
      value: data?.totalCourses ?? 0,
      icon: Icons.book,
      iconVariant: "primary" as const,
      actionText: "View courses",
      actionHref: "/courses",
    },
    {
      title: "Total Classes",
      value: data?.totalCohorts ?? 0,
      icon: Icons.users,
      iconVariant: "success" as const,
      actionText: "View classes",
      actionHref: "/classes",
    },
    {
      title: "Total Sheets",
      value: data?.totalSheets ?? 0,
      icon: Icons.sheet,
      iconVariant: "warning" as const,
      actionText: "View sheets",
      actionHref: "/sheets",
    },
  ];

  return (
    <div>
      <section className="grid grid-cols-1 gap-4 py-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {cards.map((card) => (
          <DashboardCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon as Icon}
            iconVariant={card.iconVariant}
            actionText={card.actionText}
            actionHref={card.actionHref}
            className=""
          />
        ))}
      </section>
    </div>
  );
};

export default Cards;
