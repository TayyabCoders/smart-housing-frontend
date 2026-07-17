import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  Candidate,
  VoteRequest,
  VotingResultsData,
  ActivityLogEntry,
  ElectionStatus,
  ElectionListItem,
  ElectionCreateRequest,
  ElectionUpdateRequest,
  CandidateCreateRequest,
  VotingModuleApiResponse,
} from "@/app/[locale]/voting/types/candidate";
import { axiosInstance } from "@/lib/axios/axios-instance";

interface VotingState {
  // Public voting state
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

  // Admin state
  elections: ElectionListItem[];
  electionCandidates: Record<string, Candidate[]>;
  loadingElections: boolean;
  loadingAdminAction: boolean;
  adminError: string | null;
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

  elections: [],
  electionCandidates: {},
  loadingElections: false,
  loadingAdminAction: false,
  adminError: null,
};

/* -------------------------------------------------------------------------- */
/*                           PUBLIC ASYNC THUNKS                               */
/* -------------------------------------------------------------------------- */

export const fetchCandidates = createAsyncThunk("voting/fetchCandidates", async () => {
  const response = await axiosInstance.get<VotingModuleApiResponse<Candidate[]>>("/voting/candidates");
  return response.data;
});

export const submitVote = createAsyncThunk(
  "voting/submitVote",
  async (voteData: VoteRequest, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<VotingModuleApiResponse<any>>("/voting/vote", voteData);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.detail ?? { message: "Failed to submit vote" });
    }
  }
);

export const fetchResults = createAsyncThunk("voting/fetchResults", async () => {
  const response = await axiosInstance.get<VotingModuleApiResponse<VotingResultsData>>("/voting/results");
  return response.data;
});

export const fetchActivityLog = createAsyncThunk("voting/fetchActivityLog", async () => {
  const response = await axiosInstance.get<VotingModuleApiResponse<ActivityLogEntry[]>>("/voting/activity-log");
  return response.data;
});

export const fetchElectionStatus = createAsyncThunk("voting/fetchElectionStatus", async () => {
  const response = await axiosInstance.get<VotingModuleApiResponse<ElectionStatus>>("/voting/election/status");
  return response.data;
});

/* -------------------------------------------------------------------------- */
/*                           ADMIN ASYNC THUNKS                                */
/* -------------------------------------------------------------------------- */

export const fetchElections = createAsyncThunk("voting/fetchElections", async () => {
  const response = await axiosInstance.get<VotingModuleApiResponse<ElectionListItem[]>>("/voting/admin/elections");
  return response.data;
});

export const createElection = createAsyncThunk(
  "voting/createElection",
  async (data: ElectionCreateRequest) => {
    const response = await axiosInstance.post<VotingModuleApiResponse<any>>("/voting/admin/elections", data);
    return response.data;
  }
);

export const updateElection = createAsyncThunk(
  "voting/updateElection",
  async ({ id, data }: { id: string; data: ElectionUpdateRequest }) => {
    const response = await axiosInstance.put<VotingModuleApiResponse<any>>(`/voting/admin/elections/${id}`, data);
    return response.data;
  }
);

export const deleteElection = createAsyncThunk(
  "voting/deleteElection",
  async (id: string) => {
    await axiosInstance.delete(`/voting/admin/elections/${id}`);
    return id;
  }
);

export const fetchElectionCandidates = createAsyncThunk(
  "voting/fetchElectionCandidates",
  async (electionId: string) => {
    const response = await axiosInstance.get<VotingModuleApiResponse<Candidate[]>>(
      `/voting/admin/elections/${electionId}/candidates`
    );
    return { electionId, data: response.data };
  }
);

export const createCandidate = createAsyncThunk(
  "voting/createCandidate",
  async (data: CandidateCreateRequest) => {
    const response = await axiosInstance.post<VotingModuleApiResponse<Candidate>>("/voting/admin/candidates", data);
    return { electionId: data.election_id, data: response.data };
  }
);

export const deleteCandidate = createAsyncThunk(
  "voting/deleteCandidate",
  async ({ candidateId, electionId }: { candidateId: string; electionId: string }) => {
    await axiosInstance.delete(`/voting/admin/candidates/${candidateId}`);
    return { candidateId, electionId };
  }
);

/* -------------------------------------------------------------------------- */
/*                                   SLICE                                    */
/* -------------------------------------------------------------------------- */

const votingSlice = createSlice({
  name: "voting",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.adminError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ─── FETCH CANDIDATES ─── */
      .addCase(fetchCandidates.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        state.loading = false;
        state.candidates = action.payload.data || [];
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch candidates";
      })
      /* ─── SUBMIT VOTE ─── */
      .addCase(submitVote.pending, (state) => { state.submitting = true; state.error = null; })
      .addCase(submitVote.fulfilled, (state) => { state.submitting = false; })
      .addCase(submitVote.rejected, (state, action) => {
        state.submitting = false;
        const payload = action.payload as any;
        state.error = payload?.message || action.error.message || "Failed to submit vote";
      })
      /* ─── FETCH RESULTS ─── */
      .addCase(fetchResults.pending, (state) => { state.loadingResults = true; state.error = null; })
      .addCase(fetchResults.fulfilled, (state, action) => {
        state.loadingResults = false;
        state.results = action.payload.data || null;
      })
      .addCase(fetchResults.rejected, (state, action) => {
        state.loadingResults = false;
        state.error = action.error.message || "Failed to fetch results";
      })
      /* ─── FETCH ACTIVITY LOG ─── */
      .addCase(fetchActivityLog.pending, (state) => { state.loadingActivity = true; state.error = null; })
      .addCase(fetchActivityLog.fulfilled, (state, action) => {
        state.loadingActivity = false;
        state.activityLog = action.payload.data || [];
      })
      .addCase(fetchActivityLog.rejected, (state, action) => {
        state.loadingActivity = false;
        state.error = action.error.message || "Failed to fetch activity log";
      })
      /* ─── FETCH ELECTION STATUS ─── */
      .addCase(fetchElectionStatus.pending, (state) => { state.loadingElectionStatus = true; state.error = null; })
      .addCase(fetchElectionStatus.fulfilled, (state, action) => {
        state.loadingElectionStatus = false;
        state.electionStatus = action.payload.data || null;
      })
      .addCase(fetchElectionStatus.rejected, (state, action) => {
        state.loadingElectionStatus = false;
        state.error = action.error.message || "Failed to fetch election status";
      })
      /* ─── ADMIN: FETCH ELECTIONS ─── */
      .addCase(fetchElections.pending, (state) => { state.loadingElections = true; state.adminError = null; })
      .addCase(fetchElections.fulfilled, (state, action) => {
        state.loadingElections = false;
        state.elections = action.payload.data || [];
      })
      .addCase(fetchElections.rejected, (state, action) => {
        state.loadingElections = false;
        state.adminError = action.error.message || "Failed to fetch elections";
      })
      /* ─── ADMIN: CREATE ELECTION ─── */
      .addCase(createElection.pending, (state) => { state.loadingAdminAction = true; state.adminError = null; })
      .addCase(createElection.fulfilled, (state) => { state.loadingAdminAction = false; })
      .addCase(createElection.rejected, (state, action) => {
        state.loadingAdminAction = false;
        state.adminError = action.error.message || "Failed to create election";
      })
      /* ─── ADMIN: UPDATE ELECTION ─── */
      .addCase(updateElection.pending, (state) => { state.loadingAdminAction = true; state.adminError = null; })
      .addCase(updateElection.fulfilled, (state) => { state.loadingAdminAction = false; })
      .addCase(updateElection.rejected, (state, action) => {
        state.loadingAdminAction = false;
        state.adminError = action.error.message || "Failed to update election";
      })
      /* ─── ADMIN: DELETE ELECTION ─── */
      .addCase(deleteElection.pending, (state) => { state.loadingAdminAction = true; state.adminError = null; })
      .addCase(deleteElection.fulfilled, (state, action) => {
        state.loadingAdminAction = false;
        state.elections = state.elections.filter((e) => e.id !== action.payload);
      })
      .addCase(deleteElection.rejected, (state, action) => {
        state.loadingAdminAction = false;
        state.adminError = action.error.message || "Failed to delete election";
      })
      /* ─── ADMIN: FETCH ELECTION CANDIDATES ─── */
      .addCase(fetchElectionCandidates.pending, (state) => { state.loadingAdminAction = true; })
      .addCase(fetchElectionCandidates.fulfilled, (state, action) => {
        state.loadingAdminAction = false;
        state.electionCandidates[action.payload.electionId] = action.payload.data.data || [];
      })
      .addCase(fetchElectionCandidates.rejected, (state) => { state.loadingAdminAction = false; })
      /* ─── ADMIN: CREATE CANDIDATE ─── */
      .addCase(createCandidate.pending, (state) => { state.loadingAdminAction = true; state.adminError = null; })
      .addCase(createCandidate.fulfilled, (state, action) => {
        state.loadingAdminAction = false;
        const { electionId, data } = action.payload;
        if (data.data) {
          const existing = state.electionCandidates[electionId] || [];
          state.electionCandidates[electionId] = [...existing, data.data];
        }
      })
      .addCase(createCandidate.rejected, (state, action) => {
        state.loadingAdminAction = false;
        state.adminError = action.error.message || "Failed to create candidate";
      })
      /* ─── ADMIN: DELETE CANDIDATE ─── */
      .addCase(deleteCandidate.pending, (state) => { state.loadingAdminAction = true; state.adminError = null; })
      .addCase(deleteCandidate.fulfilled, (state, action) => {
        state.loadingAdminAction = false;
        const { candidateId, electionId } = action.payload;
        if (state.electionCandidates[electionId]) {
          state.electionCandidates[electionId] = state.electionCandidates[electionId].filter(
            (c) => c.id !== candidateId
          );
        }
      })
      .addCase(deleteCandidate.rejected, (state, action) => {
        state.loadingAdminAction = false;
        state.adminError = action.error.message || "Failed to delete candidate";
      });
  },
});

export const { clearError } = votingSlice.actions;
export default votingSlice.reducer;
