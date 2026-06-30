const chat = {
  sidebar: {
    allConversations: "All Conversations",
    total: "• {count} Total",
    filters: {
      all: "All",
      unread: "Unread",
      favorites: "Favorites",
      groups: "Groups",
    },
    invite: {
      title: "Invite your friends",
      description: "Grow your network",
    },
  },
  list: {
    topics: "New Messages",
    searchPlaceholder: "Search resident",
    actions: {
      share: "Share",
      add: "Add",
    },
    addNewConversation: "Add a New Conversation",
  },
  window: {
    empty: {
      title: "No Conversation Selected",
      description: "Choose a topic from the left to start chatting.",
    },
    header: {
      title: "Doctor Freud.ai",
      modelBadge: "GPT-5 MODEL",
      dataBadge: "10K LLM DATA",
    },
    mock: {
      recipient1: "Hi, Doctor. I've been feeling really down lately, and I'm not sure why. Can you help me? 😢",
      bot1: "Of course! I'm here to support you. 😊 Can you tell me more about how you've been feeling? Any specific symptoms or changes in your daily life?",
      today: "Today",
      recipient2: "I've been experiencing persistent sadness, loss of interest in things I used to enjoy. It's been affecting my work and relationships too! 🥀😣",
      attachmentsTitle: "Attached my medical history below:",
      attachment1: "AMANDA_MEDICAL_HISTORY.PDF",
      attachment2: "EKG.PDF",
      bot2: "Thanks a lot amanda. Let me try to analyze that and get back to you...",
      time1: "10:42 AM",
      time2: "10:43 AM",
      time3: "2:15 PM",
      time4: "Just now",
    },
    input: {
      placeholder: "Send your message...",
    },
  },
} as const;

export default chat;
export type ChatMessages = typeof chat;
