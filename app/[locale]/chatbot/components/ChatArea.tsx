"use client";

import { useTranslations } from "next-intl";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { Button } from "@/components/ui/button/button";
import { PanelLeftClose, PanelLeftOpen, Bot } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/tailwindUtils/utils";

interface ChatAreaProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const mockMessages = [
  {
    id: "1",
    role: "user" as const,
    content: "Who has the power to search a person if there is reason to believe they are carrying goods liable to confiscation?",
  },
  {
    id: "2",
    role: "ai" as const,
    content: "The appropriate officer — i.e., a customs officer duly empowered for the prevention of smuggling — has the power to search a person when there are reasonable grounds to believe they are carrying goods liable to confiscation. (Section 158(1), Customs Act, 1969; Page 172)",
    reasoningSteps: {
      count: 5,
      time: "01:45 PM  2 techniques  61.8s",
      details: "1. Analyzing the user request regarding customs law.\n2. Searching document database for 'power to search'.\n3. Cross-referencing Customs Act, 1969, Section 158.\n4. Identifying 'appropriate officer' definition.\n5. Synthesizing the final answer."
    }
  }
];

export function ChatArea({ sidebarOpen, toggleSidebar }: ChatAreaProps) {
  const t = useTranslations("chatbot");

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-background relative">
      {/* Header */}
      <header className="h-[60px] flex items-center px-4 border-b border-border/40 shrink-0 gap-4 justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="text-muted-foreground hover:text-foreground shrink-0"
          >
            {sidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
          </Button>
          <h1 className="font-medium text-sm truncate">is a license required to act as a customs agent?</h1>
        </div>

        <div className="shrink-0">
          <Select defaultValue="ammar-demo-cot">
            <SelectTrigger className="w-[180px] h-9 bg-background border-border/40 focus:ring-primary shadow-sm">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-primary" />
                <SelectValue placeholder={t("models.selectModel")} />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ammar-demo-cot">{t("models.ammarDemoCot")}</SelectItem>
              <SelectItem value="gpt-4">GPT-4 Turbo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      {/* Messages Area */}
      <ScrollArea className="flex-1 px-4 py-6 md:px-8 lg:px-24">
        <div className="max-w-3xl mx-auto w-full flex flex-col justify-end min-h-full">
          {mockMessages.map((msg) => (
            <ChatMessage
              key={msg.id}
              role={msg.role}
              content={msg.content}
              reasoningSteps={msg.reasoningSteps}
            />
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="shrink-0 pb-4">
        <ChatInput />
      </div>
    </div>
  );
}
