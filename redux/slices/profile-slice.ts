import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/lib/axios/axios-instance";
import { UserModuleUser } from "@/app/[locale]/users/types/user";

interface ProfileState {
  profile: UserModuleUser | null;
  loading: boolean;
  updating: boolean;
  changingPassword: boolean;
  error: string | null;
  passwordError: string | null;
}

const initialState: ProfileState = {
  profile: null,
  loading: false,
  updating: false,
  changingPassword: false,
  error: null,
  passwordError: null,
};

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/users/me");
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.detail ?? "Failed to load profile");
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (data: Partial<UserModuleUser>, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put("/users/me", data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.detail ?? "Failed to update profile");
    }
  }
);

export const changePassword = createAsyncThunk(
  "profile/changePassword",
  async (
    data: { old_password: string; new_password: string; confirm_password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.post("/users/me/change-password", data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.detail ?? "Failed to change password");
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfileErrors: (state) => {
      state.error = null;
      state.passwordError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.data ?? null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateProfile.pending, (state) => { state.updating = true; state.error = null; })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updating = false;
        state.profile = action.payload.data ?? state.profile;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload as string;
      })

      .addCase(changePassword.pending, (state) => { state.changingPassword = true; state.passwordError = null; })
      .addCase(changePassword.fulfilled, (state) => { state.changingPassword = false; })
      .addCase(changePassword.rejected, (state, action) => {
        state.changingPassword = false;
        state.passwordError = action.payload as string;
      });
  },
});

export const { clearProfileErrors } = profileSlice.actions;
export default profileSlice.reducer;
