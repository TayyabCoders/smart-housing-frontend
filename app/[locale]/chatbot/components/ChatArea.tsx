"use client";

import { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { Bot } from "lucide-react";
import { useAppSelector } from "@/redux/store";

export function ChatArea() {
  const { messages, loading } = useAppSelector((state) => state.chatbot);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex-1 flex flex-col min-w-0 min-h-0 bg-background relative">
      {/* Header */}
      <header className="h-[60px] flex items-center px-4 border-b border-border/40 shrink-0 gap-4 justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <h1 className="font-medium text-sm truncate">OTTO</h1>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-6 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto w-full flex flex-col">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
          ))}

          {loading && (
            <div className="flex w-full mb-8 justify-start">
              <div className="flex gap-4">
                <div className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-primary text-primary-foreground">
                  <Bot className="h-5 w-5" />
                </div>
                <div className="p-4 rounded-2xl text-sm bg-accent/50 text-muted-foreground border border-border/20 rounded-tl-sm">
                  OTTO is thinking...
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="shrink-0 pb-4">
        <ChatInput />
      </div>
    </div>
  );
}
