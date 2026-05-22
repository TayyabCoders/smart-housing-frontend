"use client";

import { Button } from "@/components/ui/button/button";
import { PlusCircle, Send, Globe, Database, FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export function ChatInput() {
  const t = useTranslations("chatbot");
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    // Handle send logic
    setInput("");
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 pt-0">
      <div className="relative flex flex-col bg-background border border-border/40 rounded-2xl p-2 focus-within:ring-1 focus-within:ring-primary transition-shadow shadow-sm">

        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("chat.placeholder")}
          className="min-h-[50px] max-h-[200px] resize-none border-0 focus-visible:ring-0 bg-transparent text-foreground placeholder:text-muted-foreground p-3"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />

        <div className="flex items-center justify-between mt-2 px-2">
          {/* Action Icons */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-primary hover:bg-primary/10 hover:text-primary">
              <PlusCircle className="h-5 w-5" />
            </Button>
          </div>

          {/* Send Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSend}
            disabled={!input.trim()}
            className="h-8 w-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Skills Bar */}
      <div className="flex items-center gap-2 mt-3 px-2 flex-wrap">
        <span className="text-xs text-muted-foreground font-semibold mr-2">SKILLS</span>

        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-primary/10 text-primary hover:bg-primary/20 transition-colors border border-border/40">
          <Globe className="h-3 w-3" />
          {t("skills.browserUse")}
        </button>

        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-primary/10 text-primary hover:bg-primary/20 transition-colors border border-border/40">
          <Database className="h-3 w-3" />
          {t("skills.memorySearchTool")}
        </button>

        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-primary/10 text-primary hover:bg-primary/20 transition-colors border border-border/40">
          <FileText className="h-3 w-3" />
          {t("skills.documentGenerationTool")}
        </button>
      </div>

      <div className="text-center mt-3 text-[10px] text-muted-foreground">
        Messages are queued via Kafka · responses streamed in real-time
      </div>
    </div>
  );
}
