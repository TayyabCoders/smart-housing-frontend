import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { HelpCircle, Search } from 'lucide-react';
import { cn } from '@/lib/tailwindUtils/utils';
import { Complaint } from '@/app/[locale]/dashboard/types';
import { ComplaintStatus } from '../types';

interface TrackTabProps {
  complaints: Complaint[];
  loading?: boolean;
}

const STATUS_ORDER: ComplaintStatus[] = ['pending', 'in_progress', 'resolved', 'rejected'];

export default function TrackTab({ complaints, loading }: TrackTabProps) {
  const t = useTranslations("complaints.track");
  
  const [trackId, setTrackId] = useState('');
  const [result, setResult] = useState<Complaint | null | undefined>(undefined);

  const handleTrack = () => {
    if (!trackId.trim()) return;
    const found = complaints.find(c => c.tracking_id === trackId.trim().toUpperCase() || c.id === trackId.trim().toUpperCase());
    setResult(found || null);
  };

  const getStatusBadgeColor = (status: ComplaintStatus) => {
    switch (status) {
      case 'pending': return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'in_progress': return 'bg-purple-50 text-purple-600 border-purple-200';
      case 'resolved': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'rejected': return 'bg-red-50 text-red-600 border-red-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-4 animate-in fade-in duration-500">
      <div className="flex gap-2 mb-8">
        <input 
          type="text" 
          value={trackId}
          onChange={(e) => setTrackId(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
          placeholder={t("placeholder")}
          className="flex-1 bg-background border border-border rounded-xl px-4 py-3 text-sm font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all uppercase"
          maxLength={10}
        />
        <button
          onClick={handleTrack}
          className="flex-none px-6 py-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-primary text-primary-foreground rounded-xl font-semibold shadow-md shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          {t("trackButton")}
        </button>
      </div>

      {result === null && (
        <div className="text-center py-12 animate-in fade-in slide-in-from-bottom-2">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 text-muted-foreground">
            <HelpCircle className="w-8 h-8" />
          </div>
          <p className="text-foreground font-medium mb-1">{t("notFoundTitle")}</p>
          <p className="text-sm text-muted-foreground">{t("notFoundDesc")}</p>
        </div>
      )}

      {result && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Stepper */}
          <div className="bg-muted/30 border rounded-2xl p-6 mb-6 flex items-center justify-between relative overflow-hidden">
            {STATUS_ORDER.map((status, index) => {
              const currentIdx = STATUS_ORDER.indexOf(result.status);
              const isCompleted = index <= currentIdx;
              const isActive = index === currentIdx;
              const isLast = index === STATUS_ORDER.length - 1;

              return (
                <React.Fragment key={status}>
                  <div className="flex flex-col items-center flex-1 relative z-10">
                    <div className={cn(
                      "w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300",
                      isActive ? "bg-background border-primary text-primary shadow-[0_0_0_4px_rgba(var(--primary),0.1)]" :
                      isCompleted ? "bg-emerald-500 border-emerald-500 text-white" :
                      "bg-background border-muted-foreground/30 text-muted-foreground"
                    )}>
                      {isCompleted && !isActive ? '✓' : index + 1}
                    </div>
                    <div className={cn(
                      "text-[10px] sm:text-xs font-medium mt-2 text-center",
                      isActive ? "text-primary" : 
                      isCompleted ? "text-emerald-600" : "text-muted-foreground"
                    )}>
                      {t(`steps.${status === 'in_progress' ? 'inProgress' : status}`)}
                    </div>
                  </div>
                  {!isLast && (
                    <div className="flex-1 h-0.5 bg-muted-foreground/20 absolute top-10 left-0 w-full -z-0">
                      <div 
                        className="h-full bg-emerald-500 transition-all duration-500" 
                        style={{ 
                          width: `${(Math.min(currentIdx, STATUS_ORDER.length - 1) / (STATUS_ORDER.length - 1)) * 100}%` 
                        }}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Details Card */}
          <div className="bg-background border rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-muted/40 border-b px-6 py-4 flex items-center justify-between">
              <span className="font-mono text-primary font-bold tracking-wider">{result.tracking_id}</span>
              <span className={cn(
                "px-2.5 py-0.5 rounded-full text-xs font-bold border",
                getStatusBadgeColor(result.status)
              )}>
                {result.status}
              </span>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-3 gap-4 pb-4 border-b">
                <div className="col-span-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("details.name")}</div>
                <div className="col-span-2 text-sm text-foreground font-medium">{result.fullname}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 pb-4 border-b">
                <div className="col-span-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("details.gender")}</div>
                <div className="col-span-2 text-sm text-foreground font-medium capitalize">{result.gender}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 pb-4 border-b">
                <div className="col-span-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("details.complaint")}</div>
                <div className="col-span-2 text-sm text-foreground">{result.complaint_detail}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 pb-4 border-b">
                <div className="col-span-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("details.submitted")}</div>
                <div className="col-span-2 text-sm text-foreground">{result.created_at}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("details.updated")}</div>
                <div className="col-span-2 text-sm text-foreground">{result.updated_at}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
