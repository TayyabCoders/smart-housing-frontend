const chatbot = {
  sidebar: {
    conversations: "Conversations",
    newConversation: "New Conversation",
  },
  chat: {
    placeholder: "Send a message... (type / for docs & skills)",
    reasoningSteps: "{count} reasoning steps",
  },
  models: {
    selectModel: "Select Model",
    ammarDemoCot: "ammar-demo-cot",
  },
  skills: {
    browserUse: "/browser_use",
    memorySearchTool: "/memory_search_tool",
    documentGenerationTool: "/document_generation_tool",
  },
} as const;

export default chatbot;
