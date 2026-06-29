import React from "react";
import { ElectionStatus } from "../types/candidate";
import { useTranslations } from "next-intl";

interface VotingStatsProps {
  electionStatus: ElectionStatus | null;
}

export const VotingStats: React.FC<VotingStatsProps> = ({ electionStatus }) => {
  const t = useTranslations("voting.stats");
  const tCommon = useTranslations("voting.common");

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-card border rounded-xl p-5 text-center hover:shadow-md transition-all">
        <div className="text-3xl font-black text-primary">
          {electionStatus?.total_votes_cast || 0}
        </div>
        <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
          {t("totalVotes")}
        </div>
      </div>
      <div className="bg-card border rounded-xl p-5 text-center hover:shadow-md transition-all">
        <div className="text-3xl font-black text-primary">
          {electionStatus?.total_candidates || 0}
        </div>
        <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
          {t("candidates")}
        </div>
      </div>
      <div className="bg-card border rounded-xl p-5 text-center hover:shadow-md transition-all">
        <div className="text-xl md:text-2xl font-black text-primary truncate px-2">
          {electionStatus?.leading ? electionStatus.leading.split(" ")[0] : tCommon("emptyDash")}
        </div>
        <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
          {t("leading")}
        </div>
      </div>
      <div className="bg-card border rounded-xl p-5 text-center hover:shadow-md transition-all">
        <div className="text-3xl font-black text-primary">
          {electionStatus?.top_candidate || 0}%
        </div>
        <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
          {t("topPct")}
        </div>
      </div>
    </div>
  );
};
