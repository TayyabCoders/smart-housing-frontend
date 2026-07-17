"use client";

import { useEffect } from "react";
import { useLayout } from "@/contexts/layout-context";
import { DynamicLayout } from "@/components/layout/dynamic-layout";
import { DashboardContent } from "./components/dashboard-content";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchComplaints } from "@/redux/slices/complaint-slice";
import { fetchDashboardMetrics } from "@/redux/slices/dashboard-slice";
import { RoleGuard } from "@/lib/auth/role-guard";

export default function DashboardPage() {
  const { setLayoutType } = useLayout();
  const dispatch = useAppDispatch();
  const { complaints, loading: complaintsLoading, pending, in_progress, resolved, rejected } = useAppSelector((state) => state.complaints);
  const { metrics, loading: metricsLoading } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    setLayoutType("dashboard");
  }, [setLayoutType]);

  useEffect(() => {
    dispatch(fetchComplaints());
    dispatch(fetchDashboardMetrics());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchComplaints());
    dispatch(fetchDashboardMetrics());
  };

  const isLoading = complaintsLoading || metricsLoading;

  const complaintCounts = {
    pending,
    in_progress,
    resolved,
    rejected,
  };

  return (
    <RoleGuard allowedRoles={["admin"]}>
      <DynamicLayout>
        <DashboardContent data={{ complaints, metrics: metrics || undefined, complaintCounts }} isLoading={isLoading} onRefresh={handleRefresh} />
      </DynamicLayout>
    </RoleGuard>
  );
}
