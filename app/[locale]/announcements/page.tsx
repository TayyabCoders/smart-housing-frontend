"use client";

import { useEffect } from "react";
import { DynamicLayout } from "@/components/layout/dynamic-layout";
import AnnouncementsContainer from "./components/AnnouncementsContainer";
import { useAppDispatch } from "@/redux/store";
import { fetchAnnouncements } from "@/redux/slices/announcement-slice";

export default function AnnouncementsPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAnnouncements());
  }, [dispatch]);

  return (
    <DynamicLayout>
      <div className="w-full space-y-6 p-4 sm:p-6">
        <AnnouncementsContainer />
      </div>
    </DynamicLayout>
  );
}
