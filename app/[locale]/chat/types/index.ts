export type ChatFilterId = "all" | "unread" | "favorites" | "groups";

export interface ChatSidebarFilter {
  id: ChatFilterId;
  label: string;
  count: number;
}

export interface ChatThread {
  id: number;
  title: string;
  type: string;
  icon: string;
  unread: number;
  isOnline: boolean;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestampLabel: string;
}

export interface ChatWindowProps {
  activeChatId: string | null;
  onBack: () => void;
  selectedUser?: { username: string; id: string } | null;
}
