"use client";
import { useTranslations } from "next-intl";
import Heading from "@/components/shared/heading";
import { BaseGrid } from "@/components/shared/base-grid";
import { TrafficChart } from "./TrafficChart";
import { PerformanceChart } from "./PerformanceChart";
import { VotingResultsData } from "@/app/[locale]/voting/types/candidate";

interface ChartsSectionProps {
  complaintCounts?: {
    pending: number;
    in_progress: number;
    resolved: number;
    rejected: number;
  };
  votingResults?: VotingResultsData;
  isLoading?: boolean;
}

export function ChartsSection({
  complaintCounts,
  votingResults,
  isLoading = false,
}: ChartsSectionProps) {
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
          <TrafficChart complaintCounts={complaintCounts} isLoading={isLoading} />
          <PerformanceChart votingResults={votingResults} isLoading={isLoading} />
        </BaseGrid>
      </div>
    </section>
  );
}
