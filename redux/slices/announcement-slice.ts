import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/lib/axios/axios-instance";
import { Announcement, AnnouncementsResponse } from "@/app/[locale]/announcements/types";

interface AnnouncementState {
  announcements: Announcement[];
  loading: boolean;
  error: string | null;
  total: number;
}

const initialState: AnnouncementState = {
  announcements: [],
  loading: false,
  error: null,
  total: 0,
};

/* -------------------------------------------------------------------------- */
/*                                ASYNC THUNKS                                */
/* -------------------------------------------------------------------------- */

export const fetchAnnouncements = createAsyncThunk(
  "announcements/fetchAnnouncements",
  async (): Promise<AnnouncementsResponse> => {
    const response = await axiosInstance.get<AnnouncementsResponse>("/announcement/");
    return response.data;
  }
);

export const createAnnouncement = createAsyncThunk(
  "announcements/createAnnouncement",
  async (payload: { title: string; summary: string; description: string }) => {
    const response = await axiosInstance.post<Announcement>("/announcement/", payload);
    return response.data;
  }
);

export const updateAnnouncement = createAsyncThunk(
  "announcements/updateAnnouncement",
  async ({
    id,
    data,
  }: {
    id: string;
    data: Partial<{ title: string; summary: string; description: string }>;
  }) => {
    const response = await axiosInstance.put<Announcement>(`/announcement/${id}/`, data);
    return response.data;
  }
);

export const deleteAnnouncement = createAsyncThunk(
  "announcements/deleteAnnouncement",
  async (id: string) => {
    await axiosInstance.delete(`/announcement/${id}/`);
    return id;
  }
);

/* -------------------------------------------------------------------------- */
/*                                   SLICE                                    */
/* -------------------------------------------------------------------------- */

const announcementSlice = createSlice({
  name: "announcements",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnnouncements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnnouncements.fulfilled, (state, action) => {
        state.loading = false;
        state.announcements = action.payload.rows;
        state.total = action.payload.total;
      })
      .addCase(fetchAnnouncements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch announcements";
      })

      .addCase(createAnnouncement.fulfilled, (state, action) => {
        state.announcements.unshift(action.payload);
        state.total += 1;
      })
      .addCase(createAnnouncement.rejected, (state, action) => {
        state.error = action.error.message || "Failed to create announcement";
      })

      .addCase(updateAnnouncement.fulfilled, (state, action) => {
        const index = state.announcements.findIndex((a) => a.id === action.payload.id);
        if (index !== -1) {
          state.announcements[index] = action.payload;
        }
      })
      .addCase(updateAnnouncement.rejected, (state, action) => {
        state.error = action.error.message || "Failed to update announcement";
      })

      .addCase(deleteAnnouncement.fulfilled, (state, action) => {
        state.announcements = state.announcements.filter((a) => a.id !== action.payload);
        state.total -= 1;
      })
      .addCase(deleteAnnouncement.rejected, (state, action) => {
        state.error = action.error.message || "Failed to delete announcement";
      });
  },
});

export const { clearError } = announcementSlice.actions;
export default announcementSlice.reducer;
