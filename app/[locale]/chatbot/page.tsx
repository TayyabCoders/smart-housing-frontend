"use client";

import { DynamicLayout } from "@/components/layout/dynamic-layout";
import { ChatbotSidebar } from "./components/ChatbotSidebar";
import { ChatArea } from "./components/ChatArea";
import { useState } from "react";

export default function ChatbotPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <DynamicLayout>
      <div className="flex h-[calc(100vh-var(--header-height,64px))] w-full bg-background overflow-hidden border-t border-border/40">
        <ChatbotSidebar 
          isOpen={sidebarOpen} 
          setIsOpen={setSidebarOpen} 
        />
        <ChatArea 
          sidebarOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
      </div>
    </DynamicLayout>
  );
}
