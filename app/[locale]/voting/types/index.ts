export interface Candidate {
  election_id: string;
  name: string;
  role: string;
  party: string;
  p_class: string;
  emoji: string;
  id: string;
  created_at: string;
}

export interface ActivityLogEntry {
  text: string;
  time: string;
}

export type VotingTabId = "vote" | "results" | "rules" | "manage";

export interface ToastState {
  show: boolean;
  msg: string;
  type: "success" | "error";
}

export interface ModalState {
  show: boolean;
  title: string;
  text: React.ReactNode;
  icon: string;
}
