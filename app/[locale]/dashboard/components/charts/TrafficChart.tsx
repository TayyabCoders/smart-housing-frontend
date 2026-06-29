"use client";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

import { PieChartIcon } from "@/lib/icons/icons";
import { useTranslations } from "next-intl";
import { ChartDataPoint } from "../../types";
import { ChartCard } from "./ChartCard";

interface TrafficChartProps {
  data?: ChartDataPoint[];
  complaintCounts?: {
    pending: number;
    in_progress: number;
    resolved: number;
    rejected: number;
  };
  isLoading?: boolean;
}

export function TrafficChart({ data, complaintCounts, isLoading = false }: TrafficChartProps) {
  const t = useTranslations("dashboard");

  const defaultData: ChartDataPoint[] = [
    { name: t("charts.data.complaints.pending"), value: 145, color: "#f59e0b" },
    { name: t("charts.data.complaints.inProgress"), value: 230, color: "#3b82f6" },
    { name: t("charts.data.complaints.resolved"), value: 420, color: "#10b981" },
    { name: t("charts.data.complaints.rejected"), value: 37, color: "#ef4444" },
  ];

  // Use complaint counts from API if available, otherwise use default data
  const chartData = complaintCounts
    ? [
        { name: t("charts.data.complaints.pending"), value: complaintCounts.pending, color: "#f59e0b" },
        { name: t("charts.data.complaints.inProgress"), value: complaintCounts.in_progress, color: "#3b82f6" },
        { name: t("charts.data.complaints.resolved"), value: complaintCounts.resolved, color: "#10b981" },
        { name: t("charts.data.complaints.rejected"), value: complaintCounts.rejected, color: "#ef4444" },
      ]
    : data || defaultData;

  return (
    <ChartCard
      title={t("charts.complaintRequests.title")}
      description={t("charts.complaintRequests.description")}
      icon={PieChartIcon}
      isLoading={isLoading}
    >
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value}`, "Complaints"]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
