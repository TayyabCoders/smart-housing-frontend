"use client";

import { Button } from "@/components/ui/button/button";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { addUserMessage, askOtto } from "@/redux/slices/chatbot-slice";

export function ChatInput() {
  const t = useTranslations("chatbot");
  const [input, setInput] = useState("");
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.chatbot.loading);

  const handleSend = () => {
    const query = input.trim();
    if (!query || loading) return;
    dispatch(addUserMessage(query));
    dispatch(askOtto(query));
    setInput("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 pt-0">
      <div className="relative flex items-end gap-2 bg-background border border-border/40 rounded-2xl p-2 focus-within:ring-1 focus-within:ring-primary transition-shadow shadow-sm">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("chat.placeholder")}
          rows={1}
          className="min-h-[44px] max-h-[200px] resize-none border-0 focus-visible:ring-0 bg-transparent text-foreground placeholder:text-muted-foreground p-3"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />

        <Button
          variant="ghost"
          size="icon"
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className="h-9 w-9 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 shrink-0"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
