import React from "react";
import { Building2, Calendar, ClipboardList, CheckSquare } from "lucide-react";
import { useTranslations } from "next-intl";
import { ElectionStatus } from "../types/candidate";

interface VotingHeaderProps {
  electionStatus: ElectionStatus | null;
}

export const VotingHeader: React.FC<VotingHeaderProps> = ({ electionStatus }) => {
  const t = useTranslations("voting.header");

  const formatDate = (dateString: string) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-PK", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="rounded-2xl border bg-card overflow-hidden shadow-sm">
      <div className="flex flex-col md:flex-row items-center justify-between p-4 md:p-6 border-b border-border/50 bg-gradient-to-r from-background to-card">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center text-primary-foreground shadow-lg">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-xl md:text-2xl text-foreground">
              {electionStatus?.society_name || t("societyName")}
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
              {electionStatus?.society_location || t("societyLocation")}
            </p>
          </div>
        </div>
        {electionStatus?.is_active && (
          <div className="mt-4 md:mt-0 flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            {t("liveBadge")}
          </div>
        )}
      </div>

      <div className="p-6 md:p-8 text-center bg-gradient-to-r from-transparent via-primary/5 to-transparent">
        <h2 className="text-2xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-br from-primary to-primary/60 tracking-tight">
          {electionStatus?.title || t("title")}
        </h2>
        <p className="text-muted-foreground mt-2 font-medium">{t("subtitle")}</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-muted/30 text-xs md:text-sm text-muted-foreground border-t">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" /> {t("electionDate")}:{" "}
          <span className="font-semibold text-foreground">
            {electionStatus ? formatDate(electionStatus.election_date) : "—"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-primary" /> {t("totalVotes")}:{" "}
          <span className="font-semibold text-foreground text-yellow-500">
            {electionStatus?.total_votes_cast || 0}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-primary" /> {t("eligible")}:{" "}
          <span className="font-semibold text-foreground text-yellow-500">
            {electionStatus?.total_eligible_voters || t("registeredMembers")}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs opacity-80">{t("resultsNotice")}</div>
      </div>
    </div>
  );
};
