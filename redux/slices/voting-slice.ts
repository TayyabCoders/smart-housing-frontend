import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  Candidate,
  VoteRequest,
  VotingResultsData,
  ActivityLogEntry,
  ElectionStatus,
  VotingModuleApiResponse,
} from "@/app/[locale]/voting/types/candidate";
import { axiosInstance } from "@/lib/axios/axios-instance";

interface VotingState {
  candidates: Candidate[];
  results: VotingResultsData | null;
  activityLog: ActivityLogEntry[];
  electionStatus: ElectionStatus | null;
  loading: boolean;
  loadingResults: boolean;
  loadingActivity: boolean;
  loadingElectionStatus: boolean;
  submitting: boolean;
  error: string | null;
}

const initialState: VotingState = {
  candidates: [],
  results: null,
  activityLog: [],
  electionStatus: null,
  loading: false,
  loadingResults: false,
  loadingActivity: false,
  loadingElectionStatus: false,
  submitting: false,
  error: null,
};

/* -------------------------------------------------------------------------- */
/*                                ASYNC THUNKS                                */
/* -------------------------------------------------------------------------- */

// ✅ Fetch all candidates
export const fetchCandidates = createAsyncThunk("voting/fetchCandidates", async () => {
  const response =
    await axiosInstance.get<VotingModuleApiResponse<Candidate[]>>("/voting/candidates");
  return response.data;
});

// ✅ Submit a vote
export const submitVote = createAsyncThunk("voting/submitVote", async (voteData: VoteRequest) => {
  const response = await axiosInstance.post<VotingModuleApiResponse<any>>("/voting/vote", voteData);
  return response.data;
});

// ✅ Fetch voting results
export const fetchResults = createAsyncThunk("voting/fetchResults", async () => {
  const response =
    await axiosInstance.get<VotingModuleApiResponse<VotingResultsData>>("/voting/results");
  return response.data;
});

// ✅ Fetch activity log
export const fetchActivityLog = createAsyncThunk("voting/fetchActivityLog", async () => {
  const response =
    await axiosInstance.get<VotingModuleApiResponse<ActivityLogEntry[]>>("/voting/activity-log");
  return response.data;
});

// ✅ Fetch election status
export const fetchElectionStatus = createAsyncThunk("voting/fetchElectionStatus", async () => {
  const response =
    await axiosInstance.get<VotingModuleApiResponse<ElectionStatus>>("/voting/election/status");
  return response.data;
});

/* -------------------------------------------------------------------------- */
/*                                   SLICE                                    */
/* -------------------------------------------------------------------------- */

const votingSlice = createSlice({
  name: "voting",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ----------------------------- FETCH CANDIDATES ----------------------------- */
      .addCase(fetchCandidates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        state.loading = false;
        state.candidates = action.payload.data || [];
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch candidates";
      })
      /* ------------------------------- SUBMIT VOTE ------------------------------- */
      .addCase(submitVote.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(submitVote.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(submitVote.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.error.message || "Failed to submit vote";
      })
      /* ------------------------------ FETCH RESULTS ------------------------------ */
      .addCase(fetchResults.pending, (state) => {
        state.loadingResults = true;
        state.error = null;
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
        state.loadingResults = false;
        state.results = action.payload.data || null;
      })
      .addCase(fetchResults.rejected, (state, action) => {
        state.loadingResults = false;
        state.error = action.error.message || "Failed to fetch results";
      })
      /* ---------------------------- FETCH ACTIVITY LOG --------------------------- */
      .addCase(fetchActivityLog.pending, (state) => {
        state.loadingActivity = true;
        state.error = null;
      })
      .addCase(fetchActivityLog.fulfilled, (state, action) => {
        state.loadingActivity = false;
        state.activityLog = action.payload.data || [];
      })
      .addCase(fetchActivityLog.rejected, (state, action) => {
        state.loadingActivity = false;
        state.error = action.error.message || "Failed to fetch activity log";
      })
      /* -------------------------- FETCH ELECTION STATUS -------------------------- */
      .addCase(fetchElectionStatus.pending, (state) => {
        state.loadingElectionStatus = true;
        state.error = null;
      })
      .addCase(fetchElectionStatus.fulfilled, (state, action) => {
        state.loadingElectionStatus = false;
        state.electionStatus = action.payload.data || null;
      })
      .addCase(fetchElectionStatus.rejected, (state, action) => {
        state.loadingElectionStatus = false;
        state.error = action.error.message || "Failed to fetch election status";
      });
  },
});

export const { clearError } = votingSlice.actions;
export default votingSlice.reducer;
