"use client";

import { MetricData } from "../../types";
import {
  Users,
  DollarSign,
  ShoppingCart,
  Activity,
  Eye,
  Percent,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { MetricCard } from "./metrics-card";
import { BaseGrid } from "@/components/shared/base-grid";
import { useTranslations } from "next-intl";
import { MetricCardSkeleton } from "../loading/dashboard-loading";

interface MetricsSectionProps {
  data?: MetricData;
  isLoading?: boolean;
}

export function MetricsSection({ data, isLoading = false }: MetricsSectionProps) {
  const t = useTranslations("dashboard");
  // Default mock data if none provided
  const defaultData: MetricData = {
    totalUsers: 12543,
    totalComplaints: 832,
    pendingComplaints: 145,
    totalVoters: 5421,
  };

  const metricsData = data || defaultData;

  const metrics = [
    {
      title: t("metrics.totalUsers"),
      value: metricsData.totalUsers,
      // change: 12.5,
      // changeType: "increase" as const,
      icon: Users,
      color: "info" as const,
      description: t("metrics.descriptions.totalUsers"),
    },
    {
      title: t("metrics.totalComplaints"),
      value: metricsData.totalComplaints,
      // change: 8.2,
      // changeType: "increase" as const,
      icon: Activity,
      color: "success" as const,
      description: t("metrics.descriptions.totalComplaints"),
    },
    {
      title: t("metrics.pendingComplaints"),
      value: metricsData.pendingComplaints,
      // change: 15.3,
      // changeType: "increase" as const,
      icon: DollarSign,
      // prefix: "$",
      color: "success" as const,
      description: t("metrics.descriptions.pendingComplaints"),
    },
    {
      title: t("metrics.totalVoters"),
      value: metricsData.totalVoters,
      // change: -2.1,
      // changeType: "decrease" as const,
      icon: Percent,
      // suffix: "%",
      color: "warning" as const,
      description: t("metrics.descriptions.totalVoters"),
    },
  ];

  return (
    <section className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">{t("sections.metrics")}</h2>
        <p className="text-muted-foreground">{t("sections.metricsDescription")}</p>
      </div>
      <BaseGrid columns={{ sm: 1, md: 2, lg: 4 }}>
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => <MetricCardSkeleton key={index} />)
          : metrics.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric.title}
                value={metric.value}
                icon={metric.icon}
                description={metric.description}
                color={metric.color}
                fromLastMonthText={t("metrics.fromLastMonth")}
              />
            ))}
      </BaseGrid>
    </section>
  );
}
