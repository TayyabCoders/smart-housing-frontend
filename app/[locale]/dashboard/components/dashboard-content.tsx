"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDashboard } from "@/hooks/use-dashboard";
import { DashboardProps } from "../types";
import { ChartsSection } from "./charts/ChartsSection";
import { DashboardHeader } from "./dashboard-header";
import { MetricsSection } from "./metrics/metrics-section";
import { ComplaintManagementTable } from "./complaints/complaint-management-table";
import { logger } from "@/logger/logger";
import { fetchResults } from "@/redux/slices/voting-slice";
import { RootState } from "@/redux/store";

export function DashboardContent({
  isLoading: externalLoading = false,
  data,
  onRefresh,
}: DashboardProps & { onRefresh?: () => void }) {
  const { isLoading, handleRefresh } = useDashboard();
  const dispatch = useDispatch();
  const votingResults = useSelector((state: RootState) => state.voting.results);
  const loadingResults = useSelector((state: RootState) => state.voting.loadingResults);

  const combinedLoading = isLoading || loadingResults;

  useEffect(() => {
    dispatch(fetchResults() as any);
  }, [dispatch]);

  const handleSettings = () => {
    // Handle settings action
    logger.info("Settings clicked");
  };

  const handleComplaintRefresh = () => {
    if (onRefresh) {
      onRefresh();
    }
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
      <ChartsSection
        complaintCounts={data?.complaintCounts}
        votingResults={votingResults || undefined}
        isLoading={combinedLoading}
      />

      {/* Complaint Management Table */}
      <ComplaintManagementTable
        data={data?.complaints}
        isLoading={combinedLoading}
        onRefresh={handleComplaintRefresh}
      />
    </div>
  );
}
