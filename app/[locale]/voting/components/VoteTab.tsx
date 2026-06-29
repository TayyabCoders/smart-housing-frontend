import React from "react";
import { Candidate } from "../types";
import { cn } from "@/lib/tailwindUtils/utils";
import { Check, CircleCheckBig, ShieldCheck, Info, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface VoteTabProps {
  candidates: Candidate[];
  selectedCandidate: string | null;
  setSelectedCandidate: (id: string) => void;
  voterName: string;
  setVoterName: (v: string) => void;
  voterNic: string;
  handleNicChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  voterBlock: string;
  setVoterBlock: (v: string) => void;
  voterPhone: string;
  setVoterPhone: (v: string) => void;
  nameError: boolean;
  nicError: boolean;
  onSubmit: () => void;
}

export const VoteTab: React.FC<VoteTabProps> = ({
  candidates,
  selectedCandidate,
  setSelectedCandidate,
  voterName,
  setVoterName,
  voterNic,
  handleNicChange,
  voterBlock,
  setVoterBlock,
  voterPhone,
  setVoterPhone,
  nameError,
  nicError,
  onSubmit,
}) => {
  const t = useTranslations("voting.voteTab");

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
        <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
          {t("chooseCandidate")}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {candidates.map((c) => (
          <div
            key={c.id}
            onClick={() => setSelectedCandidate(c.id)}
            className={cn(
              "relative cursor-pointer rounded-2xl border-2 p-5 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg",
              selectedCandidate === c.id
                ? "border-primary bg-primary/5 shadow-primary/20"
                : "border-border bg-card hover:border-primary/40"
            )}
          >
            {selectedCandidate === c.id && (
              <div className="absolute top-3 right-3 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-sm">
                <Check className="w-4 h-4" />
              </div>
            )}
            <div
              className={cn(
                "w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl mb-4 border-2 transition-colors",
                selectedCandidate === c.id
                  ? "border-primary bg-primary/10"
                  : "border-border bg-muted/30"
              )}
            >
              {c.emoji}
            </div>
            <h3 className="font-bold text-foreground text-sm leading-tight mb-1">{c.name}</h3>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">{c.role}</p>
            <span
              className={cn(
                "inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                c.p_class
              )}
            >
              {c.party}
            </span>
          </div>
        ))}
      </div>

      {selectedCandidate && (
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center gap-4 animate-in zoom-in-95 duration-300">
          <CircleCheckBig className="w-8 h-8 text-primary" />
          <div>
            <div className="text-sm text-muted-foreground">{t("youChose")}</div>
            <div className="font-bold text-foreground text-lg">
              {candidates.find((c) => c.id === selectedCandidate)?.name}
            </div>
          </div>
        </div>
      )}

      <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm">
        <h3 className="text-lg font-bold flex items-center gap-2 mb-6 text-foreground">
          <ShieldCheck className="w-5 h-5 text-primary" /> {t("verificationTitle")}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("fullNameLabel")}
            </label>
            <input
              type="text"
              value={voterName}
              onChange={(e) => setVoterName(e.target.value)}
              placeholder={t("fullNamePlaceholder")}
              className={cn(
                "w-full bg-background border rounded-xl px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20",
                nameError && "border-red-500"
              )}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("cnicLabel")}
            </label>
            <input
              type="tel"
              value={voterNic}
              onChange={handleNicChange}
              maxLength={15}
              placeholder={t("cnicPlaceholder")}
              className={cn(
                "w-full bg-background border rounded-xl px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20",
                nicError && "border-red-500"
              )}
            />
            <p className="text-[11px] text-muted-foreground flex items-center gap-1.5 mt-1.5">
              <Info className="w-3 h-3 text-primary" /> {t("cnicHint")}
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("blockLabel")}
            </label>
            <input
              type="text"
              value={voterBlock}
              onChange={(e) => setVoterBlock(e.target.value)}
              placeholder={t("blockPlaceholder")}
              className="w-full bg-background border rounded-xl px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("phoneLabel")}
            </label>
            <input
              type="tel"
              value={voterPhone}
              onChange={(e) => setVoterPhone(e.target.value)}
              placeholder={t("phonePlaceholder")}
              className="w-full bg-background border rounded-xl px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <button
          onClick={onSubmit}
          className="w-full mt-8 bg-primary hover:bg-primary/90 text-primary-foreground py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all hover:shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-5 h-5" /> {t("submitBtn")}
        </button>
      </div>
    </div>
  );
};
