"use client";

import { DynamicLayout } from "@/components/layout/dynamic-layout";
import { ChatArea } from "./components/ChatArea";

export default function ChatbotPage() {
  return (
    <DynamicLayout>
      <div className="flex h-[calc(100vh-var(--header-height,64px))] w-full bg-background overflow-hidden border-t border-border/40">
        <ChatArea />
      </div>
    </DynamicLayout>
  );
}
