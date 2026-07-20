"use client";

import { useState } from "react";
import { ChatList } from "./ChatList";
import { ChatWindow } from "./ChatWindow";
import { useAppSelector } from "@/redux/store";
import type { UserModuleUser } from "@/app/[locale]/users/types/user";

export function ChatContainer() {
  // Mobile view state management
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const { users } = useAppSelector((state) => state.users);
  const selectedUser = activeChatId !== null ? users.find((u) => u.id === activeChatId) : null;

  return (
    <div className="flex h-[calc(100vh-140px)] w-full overflow-hidden rounded-2xl bg-background shadow-lg border border-border/40">
      {/* 1 & 2. Unified List Column (WhatsApp Style) */}
      <div
        className={`flex flex-col w-full md:w-[360px] lg:w-[400px] border-r border-border/40 bg-card/10 backdrop-blur-sm transition-all duration-300 ${
          activeChatId !== null ? "hidden md:flex" : "flex"
        }`}
      >
        <ChatList activeChatId={activeChatId} onSelectChat={setActiveChatId} />
      </div>

      {/* 3. Main Chat Window */}
      <div
        className={`flex-1 flex-col bg-background/50 backdrop-blur-md transition-all duration-300 ${
          activeChatId === null ? "hidden md:flex" : "flex"
        }`}
      >
        <ChatWindow
          activeChatId={activeChatId}
          onBack={() => setActiveChatId(null)}
          selectedUser={
            selectedUser ? { username: selectedUser.username, id: selectedUser.id } : null
          }
        />
      </div>
    </div>
  );
}
