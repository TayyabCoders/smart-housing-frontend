"use client";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

import { PieChartIcon } from "@/lib/icons/icons";
import { useTranslations } from "next-intl";
import { ChartDataPoint } from "../../types";
import { ChartCard } from "./ChartCard";

interface TrafficChartProps {
  data?: ChartDataPoint[];
  isLoading?: boolean;
}

export function TrafficChart({ data, isLoading = false }: TrafficChartProps) {
  const t = useTranslations("dashboard");

  const defaultData: ChartDataPoint[] = [
    { name: t("charts.data.complaints.pending"), value: 145, color: "#f59e0b" },
    { name: t("charts.data.complaints.inProgress"), value: 230, color: "#3b82f6" },
    { name: t("charts.data.complaints.resolved"), value: 420, color: "#10b981" },
    { name: t("charts.data.complaints.rejected"), value: 37, color: "#ef4444" },
  ];

  const chartData = data || defaultData;

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
