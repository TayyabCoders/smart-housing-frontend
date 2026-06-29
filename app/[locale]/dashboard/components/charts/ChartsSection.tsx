"use client";
import { useTranslations } from "next-intl";
import { ChartDataPoint } from "../../types";
import Heading from "@/components/shared/heading";
import { BaseGrid } from "@/components/shared/base-grid";
import { RevenueChart } from "./RevenueChart";
import { SalesChart } from "./SalesChart";
import { TrafficChart } from "./TrafficChart";
import { ActivityChart } from "./ActivityChart";
import { PerformanceChart } from "./PerformanceChart";

interface ChartsSectionProps {
  data?: {
    revenue?: ChartDataPoint[];
    sales?: ChartDataPoint[];
    traffic?: ChartDataPoint[];
    activity?: ChartDataPoint[];
    performance?: ChartDataPoint[];
  };
  complaintCounts?: {
    pending: number;
    in_progress: number;
    resolved: number;
    rejected: number;
  };
  isLoading?: boolean;
}

export function ChartsSection({ data, complaintCounts, isLoading = false }: ChartsSectionProps) {
  const t = useTranslations("dashboard");

  return (
    <section className="space-y-6">
      <Heading
        title={t("sections.charts")}
        description={t("sections.chartsDescription")}
        className="mb-8"
      />

      <div className="space-y-6">
        {/* Two Column Charts */}
        <BaseGrid columns={{ sm: 1, md: 2 }}>
          <TrafficChart data={data?.traffic} complaintCounts={complaintCounts} isLoading={isLoading} />
          <PerformanceChart data={data?.performance} isLoading={isLoading} />
        </BaseGrid>
      </div>
    </section>
  );
}
