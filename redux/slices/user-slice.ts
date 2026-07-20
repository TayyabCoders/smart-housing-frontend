import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  UserModuleUser,
  UserListParams,
  UserListResponse,
  CreateUserRequest,
  UpdateUserRequest,
} from "@/app/[locale]/users/types/user";
import { axiosInstance } from "@/lib/axios/axios-instance";

interface UserState {
  users: UserModuleUser[];
  currentUser: UserModuleUser | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    pages: number;
    total: number;
    count: number;
  };
  filters: UserListParams;
}

const initialState: UserState = {
  users: [],
  currentUser: null,
  loading: true,
  error: null,
  pagination: {
    page: 1,
    pages: 1,
    total: 0,
    count: 0,
  },
  filters: {
    page: 1,
    limit: 10,
    sort: "-createdAt",
  },
};

/* -------------------------------------------------------------------------- */
/*                                ASYNC THUNKS                                */
/* -------------------------------------------------------------------------- */

// ✅ Fetch all users (with filters)
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (params: UserListParams = {}) => {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });

    const response = await axiosInstance.get<UserListResponse>(`/users?${queryParams.toString()}`);
    return response.data;
  }
);

// ✅ Fetch a single user by ID
export const fetchUserById = createAsyncThunk("users/fetchUserById", async (id: string) => {
  const response = await axiosInstance.get<UserModuleUser>(`/users/${id}`);
  return response.data;
});

// ✅ Create a new user
export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData: CreateUserRequest) => {
    const response = await axiosInstance.post<UserModuleUser>("/users", userData);
    return response.data;
  }
);

// ✅ Update an existing user
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, userData }: { id: string; userData: UpdateUserRequest }) => {
    const response = await axiosInstance.put<UserModuleUser>(`/users/${id}`, userData);
    return response.data;
  }
);

// ✅ Delete user
export const deleteUser = createAsyncThunk("users/deleteUser", async (id: string) => {
  await axiosInstance.delete(`/users/${id}`);
  return id;
});

/* -------------------------------------------------------------------------- */
/*                                   SLICE                                    */
/* -------------------------------------------------------------------------- */

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<UserListParams>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ------------------------------- FETCH USERS ------------------------------- */
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.rows;
        state.pagination = {
          page: Math.floor(action.payload.offset / action.payload.limit) + 1,
          pages: Math.ceil(action.payload.total / action.payload.limit),
          total: action.payload.total,
          count: action.payload.rows.length,
        };
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      })

      /* ----------------------------- FETCH USER BY ID ----------------------------- */
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user";
      })

      /* -------------------------------- CREATE USER ------------------------------- */
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.unshift(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create user";
      })

      /* -------------------------------- UPDATE USER ------------------------------- */
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        const index = state.users.findIndex((user) => user.id === updatedUser.id);
        if (index !== -1) state.users[index] = updatedUser;
        if (state.currentUser?.id === updatedUser.id) {
          state.currentUser = updatedUser;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update user";
      })

      /* -------------------------------- DELETE USER ------------------------------- */
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        state.users = state.users.filter((user) => user.id !== id);
        if (state.currentUser?.id === id) {
          state.currentUser = null;
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete user";
      });
  },
});

export const { setFilters, clearCurrentUser, clearError } = userSlice.actions;
export default userSlice.reducer;
