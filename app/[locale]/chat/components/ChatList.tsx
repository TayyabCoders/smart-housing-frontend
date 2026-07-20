"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Share2, PlusCircle } from "lucide-react";
import { cn } from "@/lib/tailwindUtils/utils";
import type { ChatThread } from "../types";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchUsers } from "@/redux/slices/user-slice";

interface ChatListProps {
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
}

const iconColors = [
  "bg-emerald-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-yellow-500",
  "bg-pink-500",
  "bg-orange-500",
  "bg-teal-500",
];

export function ChatList({ activeChatId, onSelectChat }: ChatListProps) {
  const t = useTranslations("chat.list");
  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers({}));
  }, [dispatch]);

  return (
    <div className="flex h-full flex-col">
      {/* List */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 custom-scrollbar">
        {loading ? (
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            Loading...
          </div>
        ) : (
          users.map((user, index) => {
            const isActive = activeChatId === user.id;
            const iconColor = iconColors[index % iconColors.length];

            return (
              <div
                key={user.id}
                onClick={() => onSelectChat(user.id)}
                className={cn(
                  "group relative flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300",
                  isActive
                    ? "bg-primary/5 border border-primary/20 shadow-sm"
                    : "hover:bg-accent/50 border border-transparent"
                )}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-md"></div>
                )}

                {/* Icon / Avatar */}
                <div className="relative">
                  <div
                    className={cn(
                      "h-12 w-12 rounded-2xl flex items-center justify-center text-white font-bold shadow-sm",
                      iconColor
                    )}
                  >
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  {user.is_active && (
                    <span className="absolute -bottom-1 -right-1 block h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-background"></span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3
                      className={cn(
                        "font-semibold text-sm truncate pr-2",
                        isActive ? "text-primary" : ""
                      )}
                    >
                      {user.username}
                    </h3>
                    <span className="flex-shrink-0 h-2 w-2 rounded-full bg-muted mt-1.5"></span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                    <span className="truncate">{user.role || "User"}</span>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="flex items-center gap-1 hover:text-primary transition-colors">
                        <Share2 className="h-3 w-3" /> {t("actions.share")}
                      </button>
                      <button className="flex items-center gap-1 hover:text-primary transition-colors">
                        <PlusCircle className="h-3 w-3" /> {t("actions.add")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
