"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, BadgeAlert } from "lucide-react";
import { cn } from "@/lib/tailwindUtils/utils";
import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  fetchCandidates,
  submitVote,
  fetchResults,
  fetchActivityLog,
  fetchElectionStatus,
} from "@/redux/slices/voting-slice";

// Types
import { Candidate, ActivityLogEntry, VotingTabId, ToastState, ModalState } from "../types";

// Components
import { VotingHeader } from "./VotingHeader";
import { VotingStats } from "./VotingStats";
import { VotingTabs } from "./VotingTabs";
import { VoteTab } from "./VoteTab";
import { ResultsTab } from "./ResultsTab";
import { RulesTab } from "./RulesTab";

export default function VotingContainer() {
  const tVote = useTranslations("voting.voteTab");
  const tResults = useTranslations("voting.resultsTab");
  const tFooter = useTranslations("voting.footer");
  const tCommon = useTranslations("voting.common");

  const dispatch = useAppDispatch();
  const {
    candidates,
    results,
    activityLog,
    electionStatus,
    loading,
    loadingResults,
    loadingActivity,
    loadingElectionStatus,
    submitting,
    error,
  } = useAppSelector((state) => state.voting);

  const [activeTab, setActiveTab] = useState<VotingTabId>("vote");
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);

  // Form State
  const [voterName, setVoterName] = useState("");
  const [voterNic, setVoterNic] = useState("");
  const [voterBlock, setVoterBlock] = useState("");
  const [voterPhone, setVoterPhone] = useState("");
  const [nicError, setNicError] = useState(false);
  const [nameError, setNameError] = useState(false);

  // System State
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [usedNICs, setUsedNICs] = useState<string[]>([]);
  const [localActivityLog, setLocalActivityLog] = useState<ActivityLogEntry[]>([]);
  const [todayDate, setTodayDate] = useState("");

  // UI State
  const [toast, setToast] = useState<ToastState>({ show: false, msg: "", type: "success" });
  const [modal, setModal] = useState<ModalState>({ show: false, title: "", text: "", icon: "" });

  useEffect(() => {
    // Fetch candidates and election status from API
    dispatch(fetchCandidates());
    dispatch(fetchElectionStatus());

    // Client-side initialization
    setTodayDate(
      new Date().toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" })
    );

    try {
      const storedVotes = localStorage.getItem("gvs_votes");
      const storedNICs = localStorage.getItem("gvs_nics");
      const storedLog = localStorage.getItem("gvs_log");

      if (storedVotes) setVotes(JSON.parse(storedVotes));
      if (storedNICs) setUsedNICs(JSON.parse(storedNICs));
      if (storedLog) setLocalActivityLog(JSON.parse(storedLog));
    } catch (e) {
      console.error("Could not load local storage data", e);
    }
  }, [dispatch]);

  // Fetch results when switching to results tab
  useEffect(() => {
    if (activeTab === "results") {
      dispatch(fetchResults());
      dispatch(fetchActivityLog());
    }
  }, [activeTab, dispatch]);

  // Derived Stats
  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
  const sortedCandidates = [...candidates].sort((a, b) => (votes[b.id] || 0) - (votes[a.id] || 0));
  let leader = null;
  let leaderPct = 0;
  if (totalVotes > 0 && sortedCandidates.length > 0) {
    leader = sortedCandidates[0];
    leaderPct = Math.round(((votes[leader.id] || 0) / totalVotes) * 100);
  }

  // Toast Helper
  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3500);
  };

  // Modal Helper
  const showModal = (title: string, text: React.ReactNode, icon: string) => {
    setModal({ show: true, title, text, icon });
  };
  const closeModal = () => setModal((prev) => ({ ...prev, show: false }));

  // Format NIC input
  const handleNicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length > 5 && v.length <= 12) v = v.slice(0, 5) + "-" + v.slice(5);
    else if (v.length > 12) v = v.slice(0, 5) + "-" + v.slice(5, 12) + "-" + v.slice(12, 13);
    else if (v.length > 5) v = v.slice(0, 5) + "-" + v.slice(5);
    setVoterNic(v);
    if (nicError) setNicError(false);
  };

  const isValidNIC = (nic: string) => /^\d{5}-\d{7}-\d{1}$/.test(nic);

  const maskName = (name: string) => {
    const parts = name.split(" ");
    if (parts.length === 1) return name[0] + "***";
    return parts[0] + " " + parts[1]?.[0] + "***";
  };

  const handleSubmitVote = async () => {
    const name = voterName.trim();
    const nic = voterNic.trim();

    setNameError(false);
    setNicError(false);

    if (!selectedCandidate) {
      showToast(tVote("errorSelectCandidate"), "error");
      return;
    }
    if (!name || name.length < 3) {
      showToast(tVote("errorName"), "error");
      setNameError(true);
      return;
    }
    if (!isValidNIC(nic)) {
      showToast(tVote("errorNic"), "error");
      setNicError(true);
      return;
    }

    const c = candidates.find((x: Candidate) => x.id === selectedCandidate)!;
    if (!c) {
      showToast("Candidate not found", "error");
      return;
    }

    try {
      const result = await dispatch(
        submitVote({
          candidate_id: selectedCandidate,
          voter_name: name,
          voter_nic: nic,
          voter_block: voterBlock.trim(),
          voter_phone: voterPhone.trim(),
        })
      ).unwrap();

      if (result.success) {
        // Update local state for display purposes
        const newVotes = { ...votes, [selectedCandidate]: (votes[selectedCandidate] || 0) + 1 };
        const newNICs = [...usedNICs, nic];

        const timeStr = new Date().toLocaleTimeString("en-PK", {
          hour: "2-digit",
          minute: "2-digit",
        });
        const newLogEntry = {
          text: tResults("activityLog", { name: maskName(name), candidate: c.name }),
          time: timeStr,
        };
        const newLog = [newLogEntry, ...localActivityLog].slice(0, 15);

        setVotes(newVotes);
        setUsedNICs(newNICs);
        setLocalActivityLog(newLog);

        try {
          localStorage.setItem("gvs_votes", JSON.stringify(newVotes));
          localStorage.setItem("gvs_nics", JSON.stringify(newNICs));
          localStorage.setItem("gvs_log", JSON.stringify(newLog));
        } catch (e) {
          console.error("Failed to save to localStorage", e);
        }

        // Reset Form
        setSelectedCandidate(null);
        setVoterName("");
        setVoterNic("");
        setVoterBlock("");
        setVoterPhone("");

        showModal(
          tVote("successTitle"),
          <div className="flex flex-col items-center gap-2">
            <span className="text-4xl">{c.emoji}</span>
            <p
              dangerouslySetInnerHTML={{
                __html: tVote("successDesc", { name: `<b>${c.name}</b>` }),
              }}
            />
          </div>,
          "🎉"
        );
      } else {
        showToast(result.message || "Failed to submit vote", "error");
      }
    } catch (error: any) {
      showToast(error.message || "Failed to submit vote", "error");
    }
  };

  return (
    <div className="w-full space-y-6 relative">
      {/* Background Decorators */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[20%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 space-y-6">
        <VotingHeader electionStatus={electionStatus} />

        <VotingStats electionStatus={electionStatus} />

        <VotingTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "vote" && (
          <VoteTab
            candidates={candidates}
            selectedCandidate={selectedCandidate}
            setSelectedCandidate={setSelectedCandidate}
            voterName={voterName}
            setVoterName={setVoterName}
            voterNic={voterNic}
            handleNicChange={handleNicChange}
            voterBlock={voterBlock}
            setVoterBlock={setVoterBlock}
            voterPhone={voterPhone}
            setVoterPhone={setVoterPhone}
            nameError={nameError}
            nicError={nicError}
            onSubmit={handleSubmitVote}
          />
        )}

        {activeTab === "results" && (
          <ResultsTab results={results} loading={loadingResults} activityLog={activityLog} />
        )}

        {activeTab === "rules" && <RulesTab />}
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-muted-foreground/60 py-8 relative z-10">
        <p className="mb-1">
          <b>{tFooter("title")}</b> · {tFooter("location")}
        </p>
        <p>{tFooter("notice")}</p>
      </div>

      {/* TOAST */}
      <div
        className={cn(
          "fixed bottom-6 left-1/2 -translate-x-1/2 bg-card border rounded-full px-6 py-3 shadow-xl z-50 flex items-center gap-3 transition-all duration-300",
          toast.show ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none",
          toast.type === "error"
            ? "border-red-500/30 text-red-500"
            : "border-green-500/30 text-green-500"
        )}
      >
        {toast.type === "error" ? (
          <BadgeAlert className="w-5 h-5" />
        ) : (
          <CheckCircle2 className="w-5 h-5" />
        )}
        <span className="text-sm font-medium text-foreground">{toast.msg}</span>
      </div>

      {/* MODAL */}
      {modal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="text-5xl mb-4">{modal.icon}</div>
            <h3 className="text-xl font-bold mb-3">{modal.title}</h3>
            <div className="text-sm text-muted-foreground mb-8">{modal.text}</div>
            <button
              onClick={closeModal}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3.5 rounded-xl transition-all"
            >
              {tCommon("okButton")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
