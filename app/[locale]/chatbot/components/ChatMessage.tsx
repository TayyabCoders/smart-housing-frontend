"use client";

import { cn } from "@/lib/tailwindUtils/utils";
import { User, Bot, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface ChatMessageProps {
  role: "user" | "ai";
  content: string;
  reasoningSteps?: {
    count: number;
    time: string;
    details: string;
  };
}

export function ChatMessage({ role, content, reasoningSteps }: ChatMessageProps) {
  const isUser = role === "user";
  const [reasoningOpen, setReasoningOpen] = useState(false);
  const t = useTranslations("chatbot.chat");

  return (
    <div className={cn("flex w-full mb-6", isUser ? "justify-end" : "justify-start")}>
      <div className={cn("flex max-w-[80%] gap-3", isUser ? "flex-row-reverse" : "flex-row")}>
        {/* Avatar */}
        <div className={cn(
          "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
          isUser ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
        )}>
          {isUser ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
        </div>

        {/* Message Bubble */}
        <div className="flex flex-col gap-2 min-w-0">
          {reasoningSteps && !isUser && (
            <div className="border border-border/40 rounded-xl bg-background overflow-hidden w-fit shadow-sm">
              <button
                onClick={() => setReasoningOpen(!reasoningOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-primary hover:bg-accent/40 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium text-xs border border-primary text-primary rounded-full w-4 h-4 flex items-center justify-center">i</span>
                  {t("reasoningSteps", { count: reasoningSteps.count })}
                </div>
                <ChevronDown className={cn("h-4 w-4 transition-transform", reasoningOpen && "rotate-180")} />
              </button>
              
              {reasoningOpen && (
                <div className="p-3 text-xs text-muted-foreground border-t border-border/40 max-w-sm">
                  <div className="mb-1">{reasoningSteps.time}</div>
                  <div className="whitespace-pre-wrap">{reasoningSteps.details}</div>
                </div>
              )}
            </div>
          )}

          <div className={cn(
            "p-3 rounded-2xl text-sm whitespace-pre-wrap shadow-sm",
            isUser 
              ? "bg-primary text-primary-foreground rounded-tr-sm" 
              : "bg-accent/50 text-foreground border border-border/20 rounded-tl-sm"
          )}>
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}
