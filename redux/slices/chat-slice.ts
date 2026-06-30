import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "@/lib/axios/axios-instance";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  timestamp: string;
  is_read: boolean;
}

export interface Conversation {
  id: string;
  user_id: string;
  username: string;
  last_message: string | null;
  last_message_time: string | null;
  unread_count: number;
  is_online: boolean;
}

interface ChatState {
  conversations: Conversation[];
  messages: Record<string, Message[]>; // Key: user_id, Value: array of messages
  activeConversationId: string | null;
  loading: boolean;
  sending: boolean;
  error: string | null;
  onlineUsers: Set<string>;
}

const initialState: ChatState = {
  conversations: [],
  messages: {},
  activeConversationId: null,
  loading: false,
  sending: false,
  error: null,
  onlineUsers: new Set(),
};

/* -------------------------------------------------------------------------- */
/*                                ASYNC THUNKS                                */
/* -------------------------------------------------------------------------- */

// Fetch all conversations
export const fetchConversations = createAsyncThunk(
  "chat/fetchConversations",
  async () => {
    const response = await axiosInstance.get<Conversation[]>("chat/conversations");
    return response.data;
  }
);

// Fetch messages for a specific user
export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<Message[]>(`chat/messages/${userId}`, {
        params: { limit: 50, offset: 0 }
      });
      return { userId, messages: response.data };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch messages");
    }
  }
);

// Send a message
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ receiverId, content }: { receiverId: string; content: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<Message>("chat/messages", {
        receiver_id: receiverId,
        content,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to send message");
    }
  }
);

// Mark message as read
export const markMessageRead = createAsyncThunk(
  "chat/markMessageRead",
  async (messageId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put<{ status: string }>(`chat/messages/${messageId}/read`);
      return { messageId, status: response.data.status };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to mark message as read");
    }
  }
);

/* -------------------------------------------------------------------------- */
/*                                   SLICE                                    */
/* -------------------------------------------------------------------------- */

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConversation: (state, action: PayloadAction<string | null>) => {
      state.activeConversationId = action.payload;
    },
    addMessage: (state, action: PayloadAction<{ userId: string; message: Message }>) => {
      const { userId, message } = action.payload;
      if (!state.messages[userId]) {
        state.messages[userId] = [];
      }
      // Check if message already exists to avoid duplicates
      const existingMessage = state.messages[userId].find((m) => m.id === message.id);
      if (!existingMessage) {
        state.messages[userId].push(message);
      }
    },
    updateMessageReadStatus: (state, action: PayloadAction<{ userId: string; messageId: string }>) => {
      const { userId, messageId } = action.payload;
      if (state.messages[userId]) {
        const message = state.messages[userId].find((m) => m.id === messageId);
        if (message) {
          message.is_read = true;
        }
      }
    },
    setUserOnline: (state, action: PayloadAction<string>) => {
      state.onlineUsers.add(action.payload);
    },
    setUserOffline: (state, action: PayloadAction<string>) => {
      state.onlineUsers.delete(action.payload);
    },
    updateConversationUnread: (state, action: PayloadAction<{ userId: string; count: number }>) => {
      const { userId, count } = action.payload;
      const conversation = state.conversations.find((c) => c.user_id === userId);
      if (conversation) {
        conversation.unread_count = count;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* --------------------------- FETCH CONVERSATIONS --------------------------- */
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload;
        // Update online users from conversations
        action.payload.forEach((conv) => {
          if (conv.is_online) {
            state.onlineUsers.add(conv.user_id);
          }
        });
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch conversations";
      })

      /* ------------------------------ FETCH MESSAGES ------------------------------ */
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        const { userId, messages } = action.payload;
        state.messages[userId] = messages;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to fetch messages";
      })

      /* ------------------------------ SEND MESSAGE ------------------------------- */
      .addCase(sendMessage.pending, (state) => {
        state.sending = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.sending = false;
        const message = action.payload;
        const receiverId = message.receiver_id;
        
        // Add message to the receiver's conversation if not already present
        if (!state.messages[receiverId]) {
          state.messages[receiverId] = [];
        }
        const existingMessage = state.messages[receiverId].find((m) => m.id === message.id);
        if (!existingMessage) {
          state.messages[receiverId].push(message);
        }
        
        // Update conversation last message
        const conversation = state.conversations.find((c) => c.user_id === receiverId);
        if (conversation) {
          conversation.last_message = message.content;
          conversation.last_message_time = message.timestamp;
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.sending = false;
        state.error = action.payload as string || "Failed to send message";
      })

      /* --------------------------- MARK MESSAGE READ ---------------------------- */
      .addCase(markMessageRead.fulfilled, (state, action) => {
        const { messageId } = action.payload;
        // Find and update the message in all conversations
        Object.keys(state.messages).forEach((userId) => {
          const message = state.messages[userId].find((m) => m.id === messageId);
          if (message) {
            message.is_read = true;
          }
        });
      })
      .addCase(markMessageRead.rejected, (state, action) => {
        state.error = action.payload as string || "Failed to mark message as read";
      });
  },
});

export const {
  setActiveConversation,
  addMessage,
  updateMessageReadStatus,
  setUserOnline,
  setUserOffline,
  updateConversationUnread,
  clearError,
} = chatSlice.actions;

export default chatSlice.reducer;
