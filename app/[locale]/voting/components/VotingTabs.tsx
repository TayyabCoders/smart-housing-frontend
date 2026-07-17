import React from 'react';
import { VotingTabId } from '../types';
import { cn } from '@/lib/tailwindUtils/utils';
import { CheckCircle2, Award, FileText, Settings2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface VotingTabsProps {
  activeTab: VotingTabId;
  setActiveTab: (tab: VotingTabId) => void;
  isAdmin?: boolean;
}

export const VotingTabs: React.FC<VotingTabsProps> = ({ activeTab, setActiveTab, isAdmin }) => {
  const t = useTranslations("voting.tabs");

  return (
    <div className="flex bg-card border rounded-xl p-1.5 gap-1 shadow-sm">
      <button
        onClick={() => setActiveTab('vote')}
        className={cn(
          "flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all",
          activeTab === 'vote' ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <CheckCircle2 className="w-4 h-4" /> {t("voteNow")}
      </button>
      <button
        onClick={() => setActiveTab('results')}
        className={cn(
          "flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all",
          activeTab === 'results' ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <Award className="w-4 h-4" /> {t("liveResults")}
      </button>
      <button
        onClick={() => setActiveTab('rules')}
        className={cn(
          "flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all",
          activeTab === 'rules' ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <FileText className="w-4 h-4" /> {t("rules")}
      </button>
      {isAdmin && (
        <button
          onClick={() => setActiveTab('manage')}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all",
            activeTab === 'manage' ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <Settings2 className="w-4 h-4" /> Manage
        </button>
      )}
    </div>
  );
};
