import React from "react";
import { ActivityLogEntry } from "../types/candidate";
import { VotingResultsData } from "../types/candidate";
import { cn } from "@/lib/tailwindUtils/utils";
import { Award, RefreshCw, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

interface ResultsTabProps {
  results: VotingResultsData | null;
  loading: boolean;
  activityLog: ActivityLogEntry[];
}

export const ResultsTab: React.FC<ResultsTabProps> = ({ results, loading, activityLog }) => {
  const t = useTranslations("voting.resultsTab");

  const handleRefresh = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-card border rounded-2xl p-10 text-center text-muted-foreground">
          <div className="text-4xl mb-3">⏳</div>
          <p>Loading results...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-card border border-dashed rounded-2xl p-10 text-center text-muted-foreground">
          <div className="text-4xl mb-3">📭</div>
          <p>No results available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Award className="w-6 h-6 text-primary" /> {t("title")}
        </h3>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 border rounded-lg hover:bg-muted transition-colors"
        >
          <RefreshCw className="w-3 h-3" /> {t("refresh")}
        </button>
      </div>

      <div className="space-y-4">
        {results.total_votes === 0 ? (
          <div className="bg-card border border-dashed rounded-2xl p-10 text-center text-muted-foreground">
            <div className="text-4xl mb-3">📭</div>
            <p>{t("noVotes")}</p>
          </div>
        ) : (
          results.candidates.map((c, i) => {
            const isLeader = c.rank === 1 && c.votes > 0;

            return (
              <div
                key={c.id}
                className={cn(
                  "bg-card border rounded-2xl p-4 md:p-5 flex items-center gap-4 md:gap-6 relative overflow-hidden transition-all",
                  isLeader && "border-primary/50 bg-primary/5"
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm md:text-base shrink-0",
                    c.rank === 1
                      ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-lg"
                      : c.rank === 2
                        ? "bg-gradient-to-br from-slate-300 to-slate-500 text-white"
                        : c.rank === 3
                          ? "bg-gradient-to-br from-amber-600 to-amber-800 text-white"
                          : "bg-muted text-muted-foreground"
                  )}
                >
                  {c.rank}
                </div>

                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-muted border-2 border-border flex items-center justify-center text-2xl shrink-0">
                  {c.emoji}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-foreground text-sm md:text-base truncate">
                      {c.name}
                    </h4>
                    {isLeader && <span className="animate-bounce">👑</span>}
                  </div>
                  <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider mb-2">
                    {c.party}
                  </p>

                  <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${c.percentage}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[11px] md:text-xs text-muted-foreground mt-1.5 font-medium">
                    <span>
                      🗳️ {c.votes} {t("votesLabel")}
                    </span>
                    <span className="text-primary">{c.percentage}%</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="bg-card border rounded-2xl p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4" /> {t("recentActivity")}
        </h3>

        <div className="space-y-0">
          {activityLog.length === 0 ? (
            <div className="text-center text-sm text-muted-foreground py-4">{t("noActivity")}</div>
          ) : (
            activityLog.map((log, i) => (
              <div
                key={i}
                className="flex gap-4 py-3 border-b last:border-0 border-border/50 text-sm"
              >
                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0" />
                <div>
                  <p className="text-muted-foreground leading-snug">{log.text}</p>
                  <p className="text-xs text-muted-foreground/60 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {log.time}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
