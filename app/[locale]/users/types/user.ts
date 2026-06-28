export type UserModuleUser = {
  id: string;
  username: string;
  email: string;
  role: string;
  is_active: boolean;
  phone_number?: string | null;
  age?: number | null;
  gender?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  zip_code?: string | null;
  created_at: string;
  updated_at: string;
};

// Request body for creating a new user
export type CreateUserRequest = {
  username: string;
  email: string;
  password: string;
  phone_number?: string;
  age?: number;
  role?: string;
  gender?: string;
  address?: string;
  city?: string;
  country?: string;
  zip_code?: string;
};

// Request body for updating an existing user
export type UpdateUserRequest = Partial<CreateUserRequest>;

// Query parameters for filtering/searching user list
export type UserListParams = {
  search?: string;
  city?: string;
  country?: string;
  gender?: "Male" | "Female" | "Other";
  isActive?: boolean;
  sort?: string;
  page?: number;
  limit?: number;
};

// Response shape for paginated user list
export type UserListResponse = {
  total: number;
  rows: UserModuleUser[];
  offset: number;
  limit: number;
};

// Generic API response for User module
export type UserModuleApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  total?: number;
  page?: number;
  pages?: number;
};

export type UserModuleErrorResponse = {
  success: false;
  message: string;
};
