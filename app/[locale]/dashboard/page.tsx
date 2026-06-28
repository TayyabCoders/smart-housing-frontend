"use client";

import { useEffect } from "react";
import { useLayout } from "@/contexts/layout-context";
import { DynamicLayout } from "@/components/layout/dynamic-layout";
import { DashboardContent } from "./components/dashboard-content";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchComplaints } from "@/redux/slices/complaint-slice";

export default function DashboardPage() {
  const { setLayoutType } = useLayout();
  const dispatch = useAppDispatch();
  const { complaints, loading } = useAppSelector((state) => state.complaints);

  useEffect(() => {
    setLayoutType("dashboard");
  }, [setLayoutType]);

  useEffect(() => {
    dispatch(fetchComplaints());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchComplaints());
  };

  return (
    <DynamicLayout>
      <DashboardContent data={{ complaints }} isLoading={loading} onRefresh={handleRefresh} />
    </DynamicLayout>
  );
}
