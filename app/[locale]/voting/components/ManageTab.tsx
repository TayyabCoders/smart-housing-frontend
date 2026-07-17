"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  fetchElections,
  createElection,
  updateElection,
  deleteElection,
  fetchElectionCandidates,
  createCandidate,
  deleteCandidate,
  fetchCandidates,
  fetchElectionStatus,
} from "@/redux/slices/voting-slice";
import { ElectionListItem, ElectionCreateRequest, CandidateCreateRequest } from "../types/candidate";
import { cn } from "@/lib/tailwindUtils/utils";
import { toast } from "sonner";
import {
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
  Calendar,
  Users,
  Vote,
  CheckCircle2,
  Clock,
  XCircle,
  Loader2,
  UserPlus,
  ToggleLeft,
  ToggleRight,
  X,
} from "lucide-react";

const STATUS_CONFIG = {
  active:   { label: "Active",    bg: "bg-green-500/10",  text: "text-green-600",  border: "border-green-500/20",  icon: CheckCircle2 },
  upcoming: { label: "Upcoming",  bg: "bg-blue-500/10",   text: "text-blue-600",   border: "border-blue-500/20",   icon: Clock },
  closed:   { label: "Closed",    bg: "bg-zinc-500/10",   text: "text-zinc-500",   border: "border-zinc-500/20",   icon: XCircle },
};

const EMOJI_OPTIONS = ["👤", "🧑", "👩", "🧔", "👨‍💼", "👩‍💼", "🌟", "🏆", "⭐", "🎯", "🔥", "💎"];

const COLOR_OPTIONS = [
  { label: "Blue",   value: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  { label: "Green",  value: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  { label: "Purple", value: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" },
  { label: "Orange", value: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" },
  { label: "Red",    value: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
  { label: "Teal",   value: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400" },
];

const DEFAULT_ELECTION_FORM: ElectionCreateRequest = {
  title: "",
  society_name: "",
  society_location: "",
  election_date: "",
  total_eligible_voters: 0,
};

type PendingCandidate = Omit<CandidateCreateRequest, "election_id">;

const DEFAULT_CANDIDATE_FORM: PendingCandidate = {
  name: "",
  role: "",
  party: "",
  emoji: "👤",
  p_class: COLOR_OPTIONS[0].value,
};

export default function ManageTab() {
  const dispatch = useAppDispatch();
  const { elections, electionCandidates, loadingElections, loadingAdminAction } = useAppSelector(
    (s) => s.voting
  );

  const [expandedElection, setExpandedElection] = useState<string | null>(null);
  const [showElectionForm, setShowElectionForm] = useState(false);
  const [showCandidateForm, setShowCandidateForm] = useState<string | null>(null);
  const [electionForm, setElectionForm] = useState(DEFAULT_ELECTION_FORM);

  // Inline candidates added during election creation
  const [pendingCandidates, setPendingCandidates] = useState<PendingCandidate[]>([]);
  const [newCandidateForm, setNewCandidateForm] = useState<PendingCandidate>(DEFAULT_CANDIDATE_FORM);
  const [showNewCandidateRow, setShowNewCandidateRow] = useState(false);

  // Per-election candidate form (for adding to existing elections)
  const [candidateForm, setCandidateForm] = useState(DEFAULT_CANDIDATE_FORM);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [creatingElection, setCreatingElection] = useState(false);

  useEffect(() => {
    dispatch(fetchElections());
  }, [dispatch]);

  const handleExpand = (electionId: string) => {
    if (expandedElection === electionId) {
      setExpandedElection(null);
    } else {
      setExpandedElection(electionId);
      if (!electionCandidates[electionId]) {
        dispatch(fetchElectionCandidates(electionId));
      }
    }
  };

  const handleAddPendingCandidate = () => {
    if (!newCandidateForm.name.trim() || !newCandidateForm.role.trim() || !newCandidateForm.party.trim()) {
      toast.error("Name, role, and party are required");
      return;
    }
    setPendingCandidates((prev) => [...prev, { ...newCandidateForm }]);
    setNewCandidateForm(DEFAULT_CANDIDATE_FORM);
    setShowNewCandidateRow(false);
  };

  const handleRemovePendingCandidate = (index: number) => {
    setPendingCandidates((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreateElection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!electionForm.title || !electionForm.election_date) {
      toast.error("Title and election date are required");
      return;
    }
    setCreatingElection(true);
    try {
      const result = await dispatch(createElection(electionForm)).unwrap();
      const electionId: string = result.data?.id;

      // Create all pending candidates for this election
      if (electionId && pendingCandidates.length > 0) {
        for (const candidate of pendingCandidates) {
          await dispatch(createCandidate({ ...candidate, election_id: electionId })).unwrap();
        }
      }

      toast.success(
        pendingCandidates.length > 0
          ? `Election created with ${pendingCandidates.length} candidate(s)`
          : "Election created successfully"
      );
      setShowElectionForm(false);
      setElectionForm(DEFAULT_ELECTION_FORM);
      setPendingCandidates([]);
      setShowNewCandidateRow(false);
      dispatch(fetchElections());
      dispatch(fetchCandidates());
      dispatch(fetchElectionStatus());
    } catch (err: any) {
      toast.error(err?.message || "Failed to create election");
    } finally {
      setCreatingElection(false);
    }
  };

  const handleToggleActive = async (election: ElectionListItem) => {
    setTogglingId(election.id);
    try {
      await dispatch(
        updateElection({ id: election.id, data: { is_active: !election.is_active } })
      ).unwrap();
      toast.success(election.is_active ? "Election deactivated" : "Election activated");
      dispatch(fetchElections());
    } catch (err: any) {
      toast.error(err?.message || "Failed to update election");
    } finally {
      setTogglingId(null);
    }
  };

  const handleDeleteElection = async (election: ElectionListItem) => {
    if (!window.confirm(`Delete "${election.title}"? This cannot be undone.`)) return;
    setDeletingId(election.id);
    try {
      await dispatch(deleteElection(election.id)).unwrap();
      toast.success("Election deleted");
      if (expandedElection === election.id) setExpandedElection(null);
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete election");
    } finally {
      setDeletingId(null);
    }
  };

  const handleCreateCandidate = async (e: React.FormEvent, electionId: string) => {
    e.preventDefault();
    if (!candidateForm.name || !candidateForm.role || !candidateForm.party) {
      toast.error("Name, role, and party are required");
      return;
    }
    try {
      await dispatch(createCandidate({ ...candidateForm, election_id: electionId })).unwrap();
      toast.success("Candidate added");
      setShowCandidateForm(null);
      setCandidateForm(DEFAULT_CANDIDATE_FORM);
      dispatch(fetchElections());
      dispatch(fetchElectionCandidates(electionId));
      dispatch(fetchCandidates());
      dispatch(fetchElectionStatus());
    } catch (err: any) {
      toast.error(err?.message || "Failed to add candidate");
    }
  };

  const handleDeleteCandidate = async (candidateId: string, electionId: string) => {
    if (!window.confirm("Remove this candidate?")) return;
    try {
      await dispatch(deleteCandidate({ candidateId, electionId })).unwrap();
      toast.success("Candidate removed");
      dispatch(fetchElections());
    } catch (err: any) {
      toast.error(err?.message || "Failed to remove candidate");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Election Management</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Create elections, add candidates, and manage voting periods
          </p>
        </div>
        <button
          onClick={() => { setShowElectionForm(true); setShowCandidateForm(null); }}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> New Election
        </button>
      </div>

      {/* Create Election Form */}
      {showElectionForm && (
        <div className="bg-card border rounded-xl p-6 space-y-5 animate-in slide-in-from-top-2 duration-200">
          <h3 className="font-semibold text-base flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" /> Create New Election
          </h3>

          <form onSubmit={handleCreateElection} className="space-y-5">
            {/* Election Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-muted-foreground">Election Title *</label>
                <input
                  className="mt-1 w-full border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="e.g. Green Valley Society Election 2026"
                  value={electionForm.title}
                  onChange={(e) => setElectionForm((f) => ({ ...f, title: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Society Name</label>
                <input
                  className="mt-1 w-full border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Green Valley Society"
                  value={electionForm.society_name}
                  onChange={(e) => setElectionForm((f) => ({ ...f, society_name: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Location</label>
                <input
                  className="mt-1 w-full border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Lahore, Pakistan"
                  value={electionForm.society_location}
                  onChange={(e) => setElectionForm((f) => ({ ...f, society_location: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Election Date *</label>
                <input
                  type="date"
                  className="mt-1 w-full border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={electionForm.election_date}
                  onChange={(e) => setElectionForm((f) => ({ ...f, election_date: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Total Eligible Voters</label>
                <input
                  type="number"
                  min={0}
                  className="mt-1 w-full border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={electionForm.total_eligible_voters || ""}
                  onChange={(e) => setElectionForm((f) => ({ ...f, total_eligible_voters: Number(e.target.value) }))}
                />
              </div>
            </div>

            {/* Inline Candidates Section */}
            <div className="border rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-muted/40 border-b">
                <span className="text-sm font-semibold flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  Candidates
                  {pendingCandidates.length > 0 && (
                    <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                      {pendingCandidates.length}
                    </span>
                  )}
                </span>
                <button
                  type="button"
                  onClick={() => setShowNewCandidateRow(true)}
                  className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  <UserPlus className="w-3.5 h-3.5" /> Add Candidate
                </button>
              </div>

              {/* Added candidates preview */}
              {pendingCandidates.length > 0 && (
                <div className="divide-y">
                  {pendingCandidates.map((c, idx) => (
                    <div key={idx} className="flex items-center gap-3 px-4 py-2.5">
                      <span className="text-xl">{c.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.role}</p>
                      </div>
                      <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase", c.p_class)}>
                        {c.party}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemovePendingCandidate(idx)}
                        className="p-1 rounded hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* New candidate row */}
              {showNewCandidateRow && (
                <div className="p-4 border-t bg-muted/20 space-y-3 animate-in slide-in-from-top-1 duration-150">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs text-muted-foreground">Full Name *</label>
                      <input
                        className="mt-1 w-full border rounded-lg px-3 py-1.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Ahmed Khan"
                        value={newCandidateForm.name}
                        onChange={(e) => setNewCandidateForm((f) => ({ ...f, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Role / Position *</label>
                      <input
                        className="mt-1 w-full border rounded-lg px-3 py-1.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Chairman"
                        value={newCandidateForm.role}
                        onChange={(e) => setNewCandidateForm((f) => ({ ...f, role: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Party / Alliance *</label>
                      <input
                        className="mt-1 w-full border rounded-lg px-3 py-1.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Progressive Alliance"
                        value={newCandidateForm.party}
                        onChange={(e) => setNewCandidateForm((f) => ({ ...f, party: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="flex items-end gap-4 flex-wrap">
                    <div className="flex-1 min-w-[140px]">
                      <label className="text-xs text-muted-foreground">Card Color</label>
                      <select
                        className="mt-1 w-full border rounded-lg px-3 py-1.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                        value={newCandidateForm.p_class}
                        onChange={(e) => setNewCandidateForm((f) => ({ ...f, p_class: e.target.value }))}
                      >
                        {COLOR_OPTIONS.map((c) => (
                          <option key={c.label} value={c.value}>{c.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Emoji</label>
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        {EMOJI_OPTIONS.map((em) => (
                          <button
                            key={em}
                            type="button"
                            onClick={() => setNewCandidateForm((f) => ({ ...f, emoji: em }))}
                            className={cn(
                              "w-8 h-8 rounded-lg border text-base flex items-center justify-center transition-all",
                              newCandidateForm.emoji === em
                                ? "border-primary bg-primary/10 ring-2 ring-primary/30"
                                : "border-border hover:border-primary/50 hover:bg-muted"
                            )}
                          >
                            {em}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => { setShowNewCandidateRow(false); setNewCandidateForm(DEFAULT_CANDIDATE_FORM); }}
                      className="px-3 py-1.5 text-xs rounded-lg border hover:bg-muted transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleAddPendingCandidate}
                      className="px-3 py-1.5 text-xs rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-1.5"
                    >
                      <Plus className="w-3 h-3" /> Add
                    </button>
                  </div>
                </div>
              )}

              {pendingCandidates.length === 0 && !showNewCandidateRow && (
                <p className="text-xs text-muted-foreground text-center py-5">
                  No candidates added yet — click "Add Candidate" above
                </p>
              )}
            </div>

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowElectionForm(false);
                  setElectionForm(DEFAULT_ELECTION_FORM);
                  setPendingCandidates([]);
                  setShowNewCandidateRow(false);
                }}
                className="px-4 py-2 text-sm rounded-lg border hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={creatingElection}
                className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {creatingElection && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {creatingElection
                  ? "Creating..."
                  : pendingCandidates.length > 0
                  ? `Create Election + ${pendingCandidates.length} Candidate${pendingCandidates.length > 1 ? "s" : ""}`
                  : "Create Election"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Elections List */}
      {loadingElections ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground gap-2">
          <Loader2 className="w-5 h-5 animate-spin" /> Loading elections...
        </div>
      ) : elections.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No elections yet</p>
          <p className="text-sm mt-1">Create your first election to get started</p>
        </div>
      ) : (
        <div className="space-y-3">
          {elections.map((election) => {
            const cfg = STATUS_CONFIG[election.status];
            const StatusIcon = cfg.icon;
            const isExpanded = expandedElection === election.id;
            const candidates = electionCandidates[election.id] || [];
            const isDeleting = deletingId === election.id;
            const isToggling = togglingId === election.id;

            return (
              <div key={election.id} className="bg-card border rounded-xl overflow-hidden transition-all">
                {/* Election Header Row */}
                <div className="p-4 flex items-center gap-3">
                  <button
                    onClick={() => handleExpand(election.id)}
                    className="flex items-center gap-3 flex-1 text-left min-w-0"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm truncate">{election.title}</span>
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border",
                            cfg.bg, cfg.text, cfg.border
                          )}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {cfg.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(election.election_date).toLocaleDateString("en-PK", {
                            year: "numeric", month: "short", day: "numeric"
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {election.total_candidates} candidates
                        </span>
                        <span className="flex items-center gap-1">
                          <Vote className="w-3 h-3" />
                          {election.total_votes} votes
                        </span>
                      </div>
                    </div>
                  </button>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      title={election.is_active ? "Deactivate" : "Activate"}
                      disabled={isToggling}
                      onClick={() => handleToggleActive(election)}
                      className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
                    >
                      {isToggling ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : election.is_active ? (
                        <ToggleRight className="w-4 h-4 text-green-500" />
                      ) : (
                        <ToggleLeft className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      title="Delete election"
                      disabled={isDeleting || election.total_votes > 0}
                      onClick={() => handleDeleteElection(election)}
                      className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded: Candidates */}
                {isExpanded && (
                  <div className="border-t bg-muted/30 p-4 space-y-3 animate-in slide-in-from-top-1 duration-150">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Candidates</span>
                      <button
                        onClick={() => {
                          setShowCandidateForm(showCandidateForm === election.id ? null : election.id);
                          setCandidateForm(DEFAULT_CANDIDATE_FORM);
                        }}
                        className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        <UserPlus className="w-3.5 h-3.5" /> Add Candidate
                      </button>
                    </div>

                    {showCandidateForm === election.id && (
                      <form
                        onSubmit={(e) => handleCreateCandidate(e, election.id)}
                        className="bg-card border rounded-lg p-4 space-y-3 animate-in slide-in-from-top-1 duration-150"
                      >
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">New Candidate</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs text-muted-foreground">Full Name *</label>
                            <input
                              className="mt-1 w-full border rounded-lg px-3 py-1.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                              placeholder="Ahmed Khan"
                              value={candidateForm.name}
                              onChange={(e) => setCandidateForm((f) => ({ ...f, name: e.target.value }))}
                            />
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground">Role / Position *</label>
                            <input
                              className="mt-1 w-full border rounded-lg px-3 py-1.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                              placeholder="Chairman"
                              value={candidateForm.role}
                              onChange={(e) => setCandidateForm((f) => ({ ...f, role: e.target.value }))}
                            />
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground">Party / Alliance *</label>
                            <input
                              className="mt-1 w-full border rounded-lg px-3 py-1.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                              placeholder="Progressive Alliance"
                              value={candidateForm.party}
                              onChange={(e) => setCandidateForm((f) => ({ ...f, party: e.target.value }))}
                            />
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground">Card Color</label>
                            <select
                              className="mt-1 w-full border rounded-lg px-3 py-1.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                              value={candidateForm.p_class}
                              onChange={(e) => setCandidateForm((f) => ({ ...f, p_class: e.target.value }))}
                            >
                              {COLOR_OPTIONS.map((c) => (
                                <option key={c.label} value={c.value}>{c.label}</option>
                              ))}
                            </select>
                          </div>
                          <div className="sm:col-span-2">
                            <label className="text-xs text-muted-foreground">Emoji Avatar</label>
                            <div className="mt-1 flex flex-wrap gap-2">
                              {EMOJI_OPTIONS.map((em) => (
                                <button
                                  key={em}
                                  type="button"
                                  onClick={() => setCandidateForm((f) => ({ ...f, emoji: em }))}
                                  className={cn(
                                    "w-9 h-9 rounded-lg border text-lg flex items-center justify-center transition-all",
                                    candidateForm.emoji === em
                                      ? "border-primary bg-primary/10 ring-2 ring-primary/30"
                                      : "border-border hover:border-primary/50 hover:bg-muted"
                                  )}
                                >
                                  {em}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 justify-end">
                          <button
                            type="button"
                            onClick={() => { setShowCandidateForm(null); setCandidateForm(DEFAULT_CANDIDATE_FORM); }}
                            className="px-3 py-1.5 text-xs rounded-lg border hover:bg-muted transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={loadingAdminAction}
                            className="px-3 py-1.5 text-xs rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-1.5"
                          >
                            {loadingAdminAction && <Loader2 className="w-3 h-3 animate-spin" />}
                            Add Candidate
                          </button>
                        </div>
                      </form>
                    )}

                    {candidates.length === 0 ? (
                      <p className="text-xs text-muted-foreground text-center py-4">
                        No candidates yet. Click "Add Candidate" above.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {candidates.map((c) => (
                          <div key={c.id} className="flex items-center gap-3 bg-card border rounded-lg px-3 py-2.5">
                            <span className="text-2xl flex-shrink-0">{c.emoji}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{c.name}</p>
                              <p className="text-xs text-muted-foreground truncate">{c.role} · {c.party}</p>
                            </div>
                            <button
                              onClick={() => handleDeleteCandidate(c.id, election.id)}
                              disabled={loadingAdminAction || election.total_votes > 0}
                              title={election.total_votes > 0 ? "Cannot delete after votes are cast" : "Remove candidate"}
                              className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors flex-shrink-0 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
