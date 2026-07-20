import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Complaint } from "@/app/[locale]/dashboard/types";
import { axiosInstance } from "@/lib/axios/axios-instance";

interface ComplaintState {
  complaints: Complaint[];
  loading: boolean;
  error: string | null;
  total: number;
  pending: number;
  in_progress: number;
  resolved: number;
  rejected: number;
}

const initialState: ComplaintState = {
  complaints: [],
  loading: true,
  error: null,
  total: 0,
  pending: 0,
  in_progress: 0,
  resolved: 0,
  rejected: 0,
};

/* -------------------------------------------------------------------------- */
/*                                ASYNC THUNKS                                */
/* -------------------------------------------------------------------------- */

interface ComplaintsResponse {
  total: number;
  rows: Complaint[];
  offset: number;
  limit: number;
  pending: number;
  in_progress: number;
  resolved: number;
  rejected: number;
}

// ✅ Fetch all complaints
export const fetchComplaints = createAsyncThunk(
  "complaints/fetchComplaints",
  async (): Promise<ComplaintsResponse> => {
    const response = await axiosInstance.get<ComplaintsResponse>("/complaint/");
    return response.data;
  }
);

// ✅ Create a new complaint
export const createComplaint = createAsyncThunk(
  "complaints/createComplaint",
  async (payload: { fullname: string; gender: string; complaint_detail: string }) => {
    const response = await axiosInstance.post<Complaint>("/complaint/", payload);
    return response.data;
  }
);

// ✅ Update complaint status
export const updateComplaintStatus = createAsyncThunk(
  "complaints/updateComplaintStatus",
  async ({
    id,
    status,
  }: {
    id: string;
    status: "pending" | "in_progress" | "resolved" | "rejected";
  }) => {
    // Map snake_case to PascalCase for API
    const statusMapping: Record<string, string> = {
      pending: "Pending",
      in_progress: "In_Progress",
      resolved: "Resolved",
      rejected: "Rejected",
    };

    const response = await axiosInstance.put<Complaint>(`/complaint/${id}/`, {
      status: statusMapping[status],
    });

    // Transform response status back to snake_case
    const transformedData = {
      ...response.data,
      status:
        Object.keys(statusMapping).find((key) => statusMapping[key] === response.data.status) ||
        response.data.status.toLowerCase(),
    };

    return transformedData;
  }
);

// ✅ Delete complaint
export const deleteComplaint = createAsyncThunk(
  "complaints/deleteComplaint",
  async (id: string) => {
    await axiosInstance.delete(`/complaint/${id}/`);
    return id;
  }
);

/* -------------------------------------------------------------------------- */
/*                                   SLICE                                    */
/* -------------------------------------------------------------------------- */

const complaintSlice = createSlice({
  name: "complaints",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ----------------------------- FETCH COMPLAINTS ----------------------------- */
      .addCase(fetchComplaints.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComplaints.fulfilled, (state, action) => {
        state.loading = false;
        state.complaints = action.payload.rows;
        state.total = action.payload.total;
        state.pending = action.payload.pending;
        state.in_progress = action.payload.in_progress;
        state.resolved = action.payload.resolved;
        state.rejected = action.payload.rejected;
      })
      .addCase(fetchComplaints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch complaints";
      })

      /* ----------------------------- CREATE COMPLAINT ----------------------------- */
      .addCase(createComplaint.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComplaint.fulfilled, (state, action) => {
        state.loading = false;
        if (!Array.isArray(state.complaints)) {
          state.complaints = [];
        }
        state.complaints.unshift(action.payload);
        state.total += 1;
        if (action.payload.status === "pending") {
          state.pending += 1;
        }
      })
      .addCase(createComplaint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create complaint";
      })

      /* --------------------------- UPDATE COMPLAINT STATUS --------------------------- */
      .addCase(updateComplaintStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateComplaintStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedComplaint = action.payload;
        const index = state.complaints.findIndex(
          (complaint) => complaint.id === updatedComplaint.id
        );
        if (index !== -1) {
          const oldStatus = state.complaints[index].status;
          const newStatus = updatedComplaint.status;

          // Update counts based on status change
          if (oldStatus === "pending") state.pending -= 1;
          if (oldStatus === "in_progress") state.in_progress -= 1;
          if (oldStatus === "resolved") state.resolved -= 1;
          if (oldStatus === "rejected") state.rejected -= 1;

          if (newStatus === "pending") state.pending += 1;
          if (newStatus === "in_progress") state.in_progress += 1;
          if (newStatus === "resolved") state.resolved += 1;
          if (newStatus === "rejected") state.rejected += 1;

          state.complaints[index] = updatedComplaint;
        }
      })
      .addCase(updateComplaintStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update complaint status";
      })

      /* ----------------------------- DELETE COMPLAINT ----------------------------- */
      .addCase(deleteComplaint.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComplaint.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        const complaintToDelete = state.complaints.find((complaint) => complaint.id === id);

        if (complaintToDelete) {
          // Decrement counts based on the deleted complaint's status
          if (complaintToDelete.status === "pending") state.pending -= 1;
          if (complaintToDelete.status === "in_progress") state.in_progress -= 1;
          if (complaintToDelete.status === "resolved") state.resolved -= 1;
          if (complaintToDelete.status === "rejected") state.rejected -= 1;
          state.total -= 1;
        }

        state.complaints = state.complaints.filter((complaint) => complaint.id !== id);
      })
      .addCase(deleteComplaint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete complaint";
      });
  },
});

export const { clearError } = complaintSlice.actions;
export default complaintSlice.reducer;
