"use client";

import React, { useState, useEffect } from 'react';
import ComplaintsHeader from './ComplaintsHeader';
import ComplaintsTabs from './ComplaintsTabs';
import SubmitTab from './SubmitTab';
import TrackTab from './TrackTab';
import { Complaint } from '@/app/[locale]/dashboard/types';
import { useAppSelector } from '@/redux/store';

export default function ComplaintsContainer() {
  const [activeTab, setActiveTab] = useState<'submit' | 'track'>('submit');
  const { complaints, loading } = useAppSelector((state) => state.complaints);
  
  // Last submitted complaint for PDF generation (in-memory for current session)
  const [lastSubmitted, setLastSubmitted] = useState<Complaint | null>(null);

  return (
    <div className="flex flex-col h-full bg-background">
      <ComplaintsHeader />
      <ComplaintsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 relative">
        {activeTab === 'submit' && (
          <SubmitTab 
            lastSubmitted={lastSubmitted}
            onNewComplaint={() => setLastSubmitted(null)}
          />
        )}
        {activeTab === 'track' && (
          <TrackTab complaints={complaints} loading={loading} />
        )}
      </div>
    </div>
  );
}
