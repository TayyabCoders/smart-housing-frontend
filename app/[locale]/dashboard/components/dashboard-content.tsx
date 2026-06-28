"use client";

import { useDashboard } from "@/hooks/use-dashboard";
import { DashboardProps } from "../types";
import { ChartsSection } from "./charts/ChartsSection";
import { DashboardHeader } from "./dashboard-header";
import { MetricsSection } from "./metrics/metrics-section";
import { ComplaintManagementTable } from "./complaints/complaint-management-table";
import { logger } from "@/logger/logger";

export function DashboardContent({ isLoading: externalLoading = false, data }: DashboardProps) {
  const { isLoading, handleRefresh } = useDashboard();

  const combinedLoading = isLoading;

  const handleSettings = () => {
    // Handle settings action
    logger.info("Settings clicked");
  };

  return (
    <div className="space-y-10 p-6">
      {/* Dashboard Header with Actions */}
      <DashboardHeader
        onRefresh={handleRefresh}
        onSettings={handleSettings}
        isLoading={combinedLoading}
      />

      {/* Metrics Cards Section */}
      <MetricsSection data={data?.metrics} isLoading={combinedLoading} />

      {/* Charts Section */}
      <ChartsSection isLoading={combinedLoading} />

      {/* Complaint Management Table */}
      <ComplaintManagementTable data={data?.complaints} isLoading={combinedLoading} />

    </div>
  );
}
