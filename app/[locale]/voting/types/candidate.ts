export type Candidate = {
  election_id: string;
  name: string;
  role: string;
  party: string;
  p_class: string;
  emoji: string;
  id: string;
  created_at: string;
};

export type VoteRequest = {
  candidate_id: string;
  voter_name: string;
  voter_nic: string;
  voter_block: string;
  voter_phone: string;
};

export type CandidateResult = {
  id: string;
  name: string;
  party: string;
  emoji: string;
  votes: number;
  percentage: number;
  rank: number;
};

export type VotingResultsData = {
  total_votes: number;
  candidates: CandidateResult[];
};

export type ActivityLogEntry = {
  text: string;
  time: string;
  timestamp: string;
};

export type ElectionStatus = {
  id: string;
  title: string;
  society_name: string;
  society_location: string;
  election_date: string;
  is_active: boolean;
  total_eligible_voters: number;
  total_votes_cast: number;
  participation_rate: number;
  total_candidates: number;
  leading: string | null;
  top_candidate: number | null;
};

// Generic API response for Voting module
export type VotingModuleApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  total?: number;
  page?: number;
  pages?: number;
};

export type VotingModuleErrorResponse = {
  success: false;
  message: string;
};
