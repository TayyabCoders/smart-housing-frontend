import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/lib/axios/axios-instance";

interface DashboardMetrics {
  totalUsers: number;
  totalComplaints: number;
  pendingComplaints: number;
  totalVoters: number;
}

interface DashboardState {
  metrics: DashboardMetrics | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  metrics: null,
  loading: false,
  error: null,
};

/* -------------------------------------------------------------------------- */
/*                                ASYNC THUNKS                                */
/* -------------------------------------------------------------------------- */

interface DashboardResponse {
  success: boolean;
  data: {
    metrics: DashboardMetrics;
  };
}

// ✅ Fetch dashboard metrics
export const fetchDashboardMetrics = createAsyncThunk(
  "dashboard/fetchDashboardMetrics",
  async (): Promise<DashboardMetrics> => {
    const response = await axiosInstance.get<DashboardResponse>("/dashboard/");
    return response.data.data.metrics;
  }
);

/* -------------------------------------------------------------------------- */
/*                                   SLICE                                    */
/* -------------------------------------------------------------------------- */

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* --------------------------- FETCH DASHBOARD METRICS --------------------------- */
      .addCase(fetchDashboardMetrics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardMetrics.fulfilled, (state, action) => {
        state.loading = false;
        state.metrics = action.payload;
      })
      .addCase(fetchDashboardMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch dashboard metrics";
      });
  },
});

export const { clearError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
