"use client";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

import { BarChartIcon } from "@/lib/icons/icons";
import { useTranslations } from "next-intl";
import { ChartCard } from "./ChartCard";
import { VotingResultsData } from "@/app/[locale]/voting/types/candidate";

interface PerformanceChartProps {
  votingResults?: VotingResultsData;
  isLoading?: boolean;
}

export function PerformanceChart({ votingResults, isLoading = false }: PerformanceChartProps) {
  const t = useTranslations("dashboard");

  // Transform voting results data to chart format
  const chartData =
    votingResults?.candidates?.map((candidate) => ({
      candidate: candidate.name,
      votes: candidate.votes,
    })) || [];

  return (
    <ChartCard
      title={t("charts.performanceMetrics.title")}
      description={t("charts.performanceMetrics.description")}
      icon={BarChartIcon}
      isLoading={isLoading}
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ bottom: 60 }}>
          <CartesianGrid strokeDasharray=" 3 3" />
          <XAxis
            dataKey="candidate"
            angle={-45}
            textAnchor="end"
            height={80}
            interval={0}
            tick={{ fontSize: 12 }}
          />
          <YAxis />
          <Tooltip />
          <Bar dataKey="votes" fill="#8b5cf6" name="Votes" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
