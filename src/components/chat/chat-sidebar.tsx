"use client";

import { useState } from "react";
import {
  Plus,
  MessageSquare,
  Trash2,
  Edit2,
  Check,
  X,
  PanelLeftClose,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ChatSession {
  id: string;
  title: string;
  updated_at: string;
  created_at: string;
}

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  chats: ChatSession[];
  activeChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  onRenameChat: (chatId: string, newTitle: string) => Promise<void>;
  onDeleteChat: (chatId: string) => Promise<void>;
  isLoading: boolean;
}

export function ChatSidebar({
  isOpen,
  onClose,
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  onRenameChat,
  onDeleteChat,
  isLoading,
}: ChatSidebarProps) {
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const startEditing = (chat: ChatSession, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingChatId(chat.id);
    setEditTitle(chat.title);
  };

  const cancelEditing = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setEditingChatId(null);
    setEditTitle("");
  };

  const saveRename = async (chatId: string, e: React.MouseEvent | React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!editTitle.trim()) return;
    await onRenameChat(chatId, editTitle.trim());
    setEditingChatId(null);
    setEditTitle("");
  };

  const handleDelete = async (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeletingId(chatId);
    try {
      await onDeleteChat(chatId);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden transition-opacity"
        />
      )}

      {/* Sidebar container - fully toggles on both desktop and mobile */}
      <aside
        className={`fixed md:static top-0 left-0 bottom-0 z-40 bg-[#0F172A] border-r border-white/10 flex flex-col transition-all duration-300 ease-in-out shrink-0 ${
          isOpen
            ? "translate-x-0 w-72 opacity-100"
            : "-translate-x-full md:-translate-x-full w-0 opacity-0 overflow-hidden pointer-events-none border-none"
        }`}
      >
        {/* Top Action Header */}
        <div className="p-3.5 border-b border-white/10 flex items-center gap-2">
          <Button
            onClick={() => {
              onNewChat();
              if (window.innerWidth < 768) onClose();
            }}
            className="flex-1 bg-l1-primary hover:bg-l1-primary-hover text-white font-medium text-xs rounded-xl h-10 gap-2 shadow-md shadow-l1-primary/20 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>New Chat</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-10 w-10 text-slate-400 hover:text-white rounded-xl hover:bg-white/10"
            aria-label="Close sidebar"
          >
            <PanelLeftClose className="h-4.5 w-4.5" />
          </Button>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin">
          <div className="px-2.5 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3 w-3 text-violet-400" />
              Chat History
            </span>
            <span className="text-slate-500 font-normal">
              {chats.length}
            </span>
          </div>

          {isLoading ? (
            <div className="p-4 space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-9 rounded-xl bg-white/5 animate-pulse"
                />
              ))}
            </div>
          ) : chats.length === 0 ? (
            <div className="p-6 text-center text-slate-500 text-xs">
              No saved chats yet. Start a conversation to save history.
            </div>
          ) : (
            chats.map((chat) => {
              const isActive = chat.id === activeChatId;
              const isEditing = editingChatId === chat.id;

              return (
                <div
                  key={chat.id}
                  onClick={() => {
                    if (!isEditing) {
                      onSelectChat(chat.id);
                      if (window.innerWidth < 768) onClose();
                    }
                  }}
                  className={`group relative flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer select-none ${
                    isActive
                      ? "bg-violet-600/20 text-white border border-violet-500/40 shadow-sm"
                      : "text-slate-300 hover:bg-white/5 hover:text-white border border-transparent"
                  }`}
                >
                  <MessageSquare
                    className={`h-4 w-4 shrink-0 ${
                      isActive ? "text-violet-400" : "text-slate-400 group-hover:text-slate-200"
                    }`}
                  />

                  {isEditing ? (
                    <form
                      onSubmit={(e) => saveRename(chat.id, e)}
                      className="flex-1 flex items-center gap-1 min-w-0"
                    >
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                        className="w-full bg-slate-900 border border-violet-500 rounded px-1.5 py-0.5 text-xs text-white outline-none"
                      />
                      <button
                        type="submit"
                        onClick={(e) => saveRename(chat.id, e)}
                        className="p-1 text-emerald-400 hover:text-emerald-300 cursor-pointer"
                      >
                        <Check className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={cancelEditing}
                        className="p-1 text-slate-400 hover:text-white cursor-pointer"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </form>
                  ) : (
                    <>
                      <span className="flex-1 truncate leading-tight">
                        {chat.title}
                      </span>

                      {/* Action buttons on hover */}
                      <div className="hidden group-hover:flex items-center gap-1 shrink-0">
                        <button
                          onClick={(e) => startEditing(chat, e)}
                          title="Rename chat"
                          className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <Edit2 className="h-3 w-3" />
                        </button>
                        <button
                          onClick={(e) => handleDelete(chat.id, e)}
                          disabled={deletingId === chat.id}
                          title="Delete chat"
                          className="p-1 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer disabled:opacity-50"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>
      </aside>
    </>
  );
}
