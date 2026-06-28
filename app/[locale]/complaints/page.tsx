"use client";

import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { DynamicLayout } from '@/components/layout/dynamic-layout';
import ComplaintsContainer from './components/ComplaintsContainer';
import { useAppDispatch } from '@/redux/store';
import { fetchComplaints } from '@/redux/slices/complaint-slice';

export default function ComplaintsPage() {
  const t = useTranslations("layout.sidebar");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchComplaints());
  }, [dispatch]);

  return (
    <DynamicLayout>
      <div className="flex-1 w-full flex flex-col h-full bg-background rounded-xl overflow-hidden border">
        <ComplaintsContainer />
      </div>
    </DynamicLayout>
  );
}
