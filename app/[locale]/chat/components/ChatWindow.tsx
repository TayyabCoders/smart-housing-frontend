"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { 
  ChevronLeft, 
  Send,
  MoreVertical,
  FileText
} from "lucide-react";
import { cn } from "@/lib/tailwindUtils/utils";
import type { ChatWindowProps } from "../types";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchMessages, sendMessage, setActiveConversation } from "@/redux/slices/chat-slice";
import { useChatSocket } from "@/socket/chat-socket";
import type { Message } from "@/redux/slices/chat-slice";

export function ChatWindow({ activeChatId, onBack, selectedUser }: ChatWindowProps) {
  const t = useTranslations("chat.window");
  const [message, setMessage] = useState("");
  
  const dispatch = useAppDispatch();
  const { messages, loading, sending } = useAppSelector((state) => state.chat);
  const { user: currentUser } = useAppSelector((state) => state.login);
  const currentMessages = activeChatId ? messages[activeChatId] || [] : [];
  const { sendMessage: sendSocketMessage } = useChatSocket();

  useEffect(() => {
    if (activeChatId) {
      dispatch(setActiveConversation(activeChatId));
      dispatch(fetchMessages(activeChatId));
    }
  }, [activeChatId, dispatch]);

  const handleSendMessage = async () => {
    if (!message.trim() || !activeChatId) return;

    try {
      await dispatch(sendMessage({ receiverId: activeChatId, content: message })).unwrap();
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  if (activeChatId === null) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-muted-foreground bg-accent/10">
        <div className="h-24 w-24 rounded-full bg-accent/50 flex items-center justify-center mb-6 shadow-inner">
          <MessageSquareIcon className="h-10 w-10 text-muted-foreground/50" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-foreground/70">{t("empty.title")}</h3>
        <p className="text-sm">{t("empty.description")}</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col relative">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-border/40 bg-background/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="md:hidden p-2 -ml-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold">{selectedUser?.username || t("header.title")}</h2>
          </div>
        </div>

        <div className="flex items-center gap-1">
       
          <button className="p-2.5 rounded-full hover:bg-accent text-muted-foreground hover:text-foreground transition-all sm:hidden">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar bg-accent/5">
        {loading ? (
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            Loading messages...
          </div>
        ) : currentMessages.length === 0 ? (
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            No messages yet. Start the conversation!
          </div>
        ) : (
          currentMessages.map((msg: Message) => {
            const isCurrentUser = msg.sender_id === currentUser?.id;
            return (
              <div
                key={msg.id}
                className={cn(
                  "flex flex-col gap-1 w-full max-w-3xl",
                  isCurrentUser ? "ml-auto items-end" : "mr-auto items-start"
                )}
              >
                <div
                  className={cn(
                    "p-4 rounded-2xl shadow_sm",
                    isCurrentUser
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-card border border-border/50 rounded-bl-sm"
                  )}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
                <span className="text-[10px] text-muted-foreground font-medium">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                  {msg.is_read && " ✓"}
                </span>
              </div>
            );
          })
        )}
        
        {/* Invisible element to auto-scroll to bottom */}
        <div className="h-4"></div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-background/95 backdrop-blur-xl border-t border-border/40 z-10">
        <div className="flex items-center gap-2 max-w-4xl mx-auto">
          <div className="flex-1 relative group">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t("input.placeholder")}
              className="w-full bg-accent/30 border border-foreground/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-2xl pl-4 pr-12 py-3.5 text-sm transition-all focus:outline-none placeholder:text-muted-foreground"
            />
            {/* Quick action mic/recording could go here */}
          </div>
          
          <button 
            onClick={handleSendMessage}
            disabled={!message.trim() || sending}
            className={cn(
              "p-3.5 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm group border border-foreground/20",
              message.trim().length > 0 && !sending
                ? "bg-primary text-primary-foreground hover:shadow-md hover:shadow-primary/20 hover:-translate-y-0.5" 
                : "bg-accent text-muted-foreground cursor-not-allowed"
            )}
          >
            {sending ? (
              <span className="h-5 w-5 animate-spin">⏳</span>
            ) : (
              <Send className={cn("h-5 w-5", message.trim().length > 0 ? "translate-x-0.5 -translate-y-0.5" : "")} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Simple fallback icon for empty state
function MessageSquareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
