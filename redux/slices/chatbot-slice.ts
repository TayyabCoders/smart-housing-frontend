import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/lib/axios/axios-instance";

export interface ChatMessageItem {
  id: string;
  role: "user" | "ai";
  content: string;
}

interface ChatbotState {
  messages: ChatMessageItem[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatbotState = {
  messages: [],
  loading: false,
  error: null,
};

interface AskOttoResponse {
  answer: string;
  collections_used: string[];
}

export const askOtto = createAsyncThunk(
  "chatbot/askOtto",
  async (query: string): Promise<AskOttoResponse> => {
    const response = await axiosInstance.post<AskOttoResponse>("/chatbot/ask", { query });
    return response.data;
  }
);

const chatbotSlice = createSlice({
  name: "chatbot",
  initialState,
  reducers: {
    addUserMessage: (state, action: { payload: string }) => {
      state.messages.push({
        id: `${Date.now()}-user`,
        role: "user",
        content: action.payload,
      });
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(askOtto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(askOtto.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push({
          id: `${Date.now()}-ai`,
          role: "ai",
          content: action.payload.answer,
        });
      })
      .addCase(askOtto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to get a response from OTTO";
      });
  },
});

export const { addUserMessage, clearError } = chatbotSlice.actions;
export default chatbotSlice.reducer;
