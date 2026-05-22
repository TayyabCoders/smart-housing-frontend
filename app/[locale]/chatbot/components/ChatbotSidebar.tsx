"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button/button";
import { PlusIcon, MessageSquareIcon, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { cn } from "@/lib/tailwindUtils/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatbotSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const mockConversations = [
  { id: "1", title: "what is FBR?", msgs: 4 },
  { id: "2", title: "is a license required to act as a customs agent?", active: true, msgs: 10 },
  { id: "3", title: "What does the term \"conveyance\" mean unde...", msgs: 0 },
  { id: "4", title: "Who has the power to appoint officers of...", msgs: 0 },
  { id: "5", title: "What is the short title of the Customs Act, 1969?", msgs: 0 },
  { id: "6", title: "whats most trending in Islamabad today ?", msgs: 0 },
  { id: "7", title: "hllo'", msgs: 0 },
];

export function ChatbotSidebar({ isOpen, setIsOpen }: ChatbotSidebarProps) {
  const t = useTranslations("chatbot.sidebar");

  if (!isOpen) return null;

  return (
    <div className={cn(
      "w-64 h-full border-e border-border/40 bg-background flex flex-col transition-all duration-300",
      isOpen ? "translate-x-0" : "-translate-x-full hidden"
    )}>
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <span className="font-semibold text-sm text-muted-foreground flex items-center gap-2">
          <MessageSquareIcon className="h-4 w-4" />
          Conversations
        </span>
      </div>

      {/* New Conversation Button */}
      <div className="px-3 pb-4">
        <Button 
          variant="default" 
          className="w-full justify-start gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <PlusIcon className="h-4 w-4" />
          {t("newConversation")}
        </Button>
      </div>

      {/* History List */}
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1">
          {mockConversations.map((conv) => (
            <button
              key={conv.id}
              className={cn(
                "w-full text-left px-3 py-3 text-sm rounded-md transition-colors flex flex-col gap-1.5",
                conv.active 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <span className="line-clamp-2 leading-snug">{conv.title}</span>
              <div className="flex items-center gap-1.5 text-xs opacity-60 font-normal">
                <MessageSquareIcon className="h-3 w-3 flex-shrink-0" />
                <span>{conv.msgs} msgs</span>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
