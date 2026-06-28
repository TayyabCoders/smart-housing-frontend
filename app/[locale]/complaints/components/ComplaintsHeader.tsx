import React from 'react';
import { useTranslations } from 'next-intl';
import { ClipboardList, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useAppSelector } from '@/redux/store';

export default function ComplaintsHeader() {
  const t = useTranslations("complaints.header");

  const { total, pending, resolved } = useAppSelector((state) => state.complaints);

  return (
    <div className="flex-none bg-background rounded-t-xl overflow-hidden border-b">
      {/* Decorative gradient top bar */}
      <div className="h-2 w-full bg-gradient-to-r from-primary to-primary/60" />
      
      {/* Main header content */}
      <div className="p-4 md:p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
        <div className="flex items-start gap-4">
          <div className="flex-none w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <ClipboardList className="w-7 h-7 text-primary relative z-10" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              {t("title")}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">{t("subtitle")}</p>
          </div>
        </div>
      </div>

      {/* Info bar at the bottom of header */}
      <div className="flex flex-wrap items-center gap-6 p-4 bg-muted/30 text-xs md:text-sm text-muted-foreground border-t">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-primary" /> Total: <span className="font-semibold text-foreground">{total}</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-primary" /> Pending: <span className="font-semibold text-foreground text-yellow-500">{pending}</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-primary" /> Resolved: <span className="font-semibold text-foreground text-emerald-500">{resolved}</span>
        </div>
      </div>
    </div>
  );
}
