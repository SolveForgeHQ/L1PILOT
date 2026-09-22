"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bot,
  User,
  Send,
  Sparkles,
  Gamepad2,
  Building2,
  Zap,
  Coins,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeBlockViewer } from "@/components/chat/code-block-viewer";
import { ChatSidebar, type ChatSession } from "@/components/chat/chat-sidebar";
import { useAuth } from "@/components/auth-provider";
import { createClient } from "@/lib/supabase/client";
import {
  extractGeneratedFiles,
  isValidUUID,
  recoverConfigsFromLocalStorage,
} from "@/lib/configurations-store";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Utility to ensure AI responses never contain emojis while preserving markdown newlines
function stripEmojis(text: string): string {
  return text
    .replace(
      /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/gu,
      ""
    )
    .trim();
}


const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome-1",
    role: "assistant",
    content:
      "Hello! I am L1Pilot AI, your intelligent assistant for building and configuring Avalanche L1 blockchains.\n\nTell me about the chain you would like to create, or select one of the quick options below to get started.",
    timestamp: new Date(),
  },
];

const QUICK_PROMPTS = [
  {
    icon: Gamepad2,
    label: "Gaming L1",
    prompt: "I want to create a high-throughput, gasless gaming L1 with instant finality.",
  },
  {
    icon: Building2,
    label: "RWA Subnet",
    prompt: "Create a permissioned PoA chain for tokenized real estate assets.",
  },
  {
    icon: Zap,
    label: "High TPS Chain",
    prompt: "Configure an EVM L1 optimized for high transaction speed and low latency.",
  },
  {
    icon: Coins,
    label: "Custom Gas Token",
    prompt: "Set up an EVM chain using my custom governance ERC-20 token for gas fees.",
  },
];

export function ChatClient() {
  const { user } = useAuth();
  // Use a stable Supabase client instance (not recreated on every render)
  const supabase = useMemo(() => createClient(), []);

  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isMobileOrAndroid, setIsMobileOrAndroid] = useState(true);
  const [sessionReady, setSessionReady] = useState(false);

  // Chat History & Sidebar State
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Bootstrap session into the browser Supabase client
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSessionReady(true);
    });
  }, [supabase]);


  // Mobile detection
  useEffect(() => {
    const checkMobileOrAndroid = () => {
      if (typeof window !== "undefined") {
        const ua = navigator.userAgent || "";
        const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua);
        const isSmallScreen = window.innerWidth < 768;
        setIsMobileOrAndroid(isMobileUA || isSmallScreen);
      }
    };

    checkMobileOrAndroid();
    window.addEventListener("resize", checkMobileOrAndroid);
    return () => window.removeEventListener("resize", checkMobileOrAndroid);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  // Auto-recover any configurations generated in previous chat sessions
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const recovered = recoverConfigsFromLocalStorage();
        if (recovered.length > 0) {
          const stored = localStorage.getItem("l1pilot_saved_configs");
          const existing = stored ? JSON.parse(stored) : [];
          const missing = recovered.filter(
            (r) => !existing.some((e: any) => e.name === r.name && e.content === r.content)
          );
          if (missing.length > 0) {
            const combined = [...missing, ...existing];
            localStorage.setItem("l1pilot_saved_configs", JSON.stringify(combined));
            console.log(`[L1Pilot] Recovered and saved ${missing.length} config file(s) from chat history.`);
          }
        }
      } catch (err) {
        console.error("Error during auto-recovery of configs:", err);
      }
    }
  }, []);


  // Load user chats history from Supabase with localStorage persistence fallback
  const loadUserChats = useCallback(async () => {
    setIsHistoryLoading(true);

    // 1. First load from localStorage for instant display
    let localChats: ChatSession[] = [];
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("l1pilot_chats");
        if (stored) {
          localChats = JSON.parse(stored);
          setChats(localChats);
        }
      } catch (err) {
        console.error("Error reading localStorage chats:", err);
      }
    }

    // 2. If logged in, fetch from Supabase and sync
    if (user) {
      try {
        const { data, error } = await supabase
          .from("chats")
          .select("id, title, updated_at, created_at")
          .eq("user_id", user.id)
          .order("updated_at", { ascending: false });

        if (!error && data && data.length > 0) {
          setChats(data);
          if (typeof window !== "undefined") {
            localStorage.setItem("l1pilot_chats", JSON.stringify(data));
          }
        }
      } catch (err) {
        console.error("Error loading chat history from DB:", err);
      }
    }

    setIsHistoryLoading(false);
  }, [user, supabase]);

  useEffect(() => {
    loadUserChats();
  }, [loadUserChats]);

  // Load messages for a selected chat thread
  const handleSelectChat = async (chatId: string) => {
    if (chatId === activeChatId) return;
    setActiveChatId(chatId);
    setIsThinking(false);

    let loaded = false;

    // 1. Try Supabase first if logged in AND chatId is a real UUID (not a temp ID)
    if (user && isValidUUID(chatId)) {
      try {
        const { data, error } = await supabase
          .from("messages")
          .select("id, role, content, created_at")
          .eq("chat_id", chatId)
          .order("created_at", { ascending: true });

        if (!error && data && data.length > 0) {
          const formattedMsgs = data.map((m) => ({
            id: m.id,
            role: m.role as "user" | "assistant",
            content: m.content,
            timestamp: new Date(m.created_at),
          }));
          setMessages(formattedMsgs);
          loaded = true;
          if (typeof window !== "undefined") {
            localStorage.setItem(
              `l1pilot_msgs_${chatId}`,
              JSON.stringify(formattedMsgs)
            );
          }
        }
      } catch (err) {
        console.error("Error loading chat messages from DB:", err);
      }
    }


    // 2. Fallback to localStorage
    if (!loaded && typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(`l1pilot_msgs_${chatId}`);
        if (stored) {
          const parsed = JSON.parse(stored);
          setMessages(
            parsed.map((m: any) => ({
              ...m,
              timestamp: new Date(m.timestamp),
            }))
          );
          loaded = true;
        }
      } catch (err) {
        console.error("Error reading localStorage messages:", err);
      }
    }

    if (!loaded) {
      setMessages(INITIAL_MESSAGES);
    }
  };

  // Start a new chat session
  const handleNewChat = () => {
    setActiveChatId(null);
    setMessages(INITIAL_MESSAGES);
    setInput("");
    setIsThinking(false);
  };

  // Rename a chat title
  const handleRenameChat = async (chatId: string, newTitle: string) => {
    const updatedChats = chats.map((c) =>
      c.id === chatId ? { ...c, title: newTitle } : c
    );
    setChats(updatedChats);
    if (typeof window !== "undefined") {
      localStorage.setItem("l1pilot_chats", JSON.stringify(updatedChats));
    }

    if (user && isValidUUID(chatId)) {
      try {
        await supabase
          .from("chats")
          .update({ title: newTitle, updated_at: new Date().toISOString() })
          .eq("id", chatId)
          .eq("user_id", user.id);
      } catch (err) {
        console.error("Error renaming chat in DB:", err);
      }
    }
  };

  // Delete a chat thread
  const handleDeleteChat = async (chatId: string) => {
    const updatedChats = chats.filter((c) => c.id !== chatId);
    setChats(updatedChats);
    if (typeof window !== "undefined") {
      localStorage.setItem("l1pilot_chats", JSON.stringify(updatedChats));
      localStorage.removeItem(`l1pilot_msgs_${chatId}`);
    }

    if (activeChatId === chatId) {
      handleNewChat();
    }

    if (user && isValidUUID(chatId)) {
      try {
        await supabase
          .from("chats")
          .delete()
          .eq("id", chatId)
          .eq("user_id", user.id);
      } catch (err) {
        console.error("Error deleting chat from DB:", err);
      }
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        140
      )}px`;
    }
  };

  // Save generated genesis or config files to localStorage + Supabase configurations table
  const saveGeneratedFilesToDatabase = async (
    text: string,
    currentChatId: string,
    freshUser: { id: string } | null
  ) => {
    const files = extractGeneratedFiles(text);
    if (files.length === 0) return;

    // 1. Always save to localStorage first so Configurations page shows them immediately
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("l1pilot_saved_configs");
        const existing = stored ? JSON.parse(stored) : [];
        const chatTitle = chats.find((c) => c.id === currentChatId)?.title || "AI Conversation";
        
        // Deduplicate against existing saved files by name and content
        const nonDuplicateFiles = files.filter(
          (f) => !existing.some((e: any) => e.name === f.name && e.content === f.content)
        );

        if (nonDuplicateFiles.length > 0) {
          const newEntries = nonDuplicateFiles.map((file) => ({
            id: `config-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            user_id: freshUser?.id || "local",
            chat_id: currentChatId,
            name: file.name,
            type: file.type,
            content: file.content,
            created_at: new Date().toISOString(),
            chats: { title: chatTitle },
          }));
          localStorage.setItem(
            "l1pilot_saved_configs",
            JSON.stringify([...newEntries, ...existing])
          );
          console.log(`[L1Pilot] Saved ${nonDuplicateFiles.length} config file(s) to localStorage.`);
        }
      } catch (err) {
        console.error("Error saving configs to localStorage:", err);
      }
    }

    // 2. Also sync to Supabase if user is authenticated
    if (freshUser) {
      const dbChatId = isValidUUID(currentChatId) ? currentChatId : null;
      for (const file of files) {
        try {
          const { error: insertErr } = await supabase.from("configurations").insert({
            user_id: freshUser.id,
            chat_id: dbChatId,
            name: file.name,
            type: file.type,
            content: file.content,
          });

          if (insertErr) {
            console.warn("[L1Pilot] Config DB insert with chat_id failed:", insertErr.message);
            // If foreign key constraint failed because chat record doesn't exist in DB, retry with chat_id: null
            if (dbChatId && (insertErr.code === "23503" || insertErr.message?.includes("foreign key"))) {
              const { error: retryErr } = await supabase.from("configurations").insert({
                user_id: freshUser.id,
                chat_id: null,
                name: file.name,
                type: file.type,
                content: file.content,
              });
              if (!retryErr) {
                console.log(`[L1Pilot] Successfully saved ${file.name} to Supabase configurations (null chat_id)`);
              }
            }
          } else {
            console.log(`[L1Pilot] Successfully saved ${file.name} to Supabase configurations!`);
          }
        } catch (err) {
          console.error("Error saving generated configuration to DB:", err);
        }
      }
    }
  };



  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || isThinking) return;

    // Always fetch a fresh user — avoids stale auth state causing 403 on Supabase writes
    const { data: { user: freshUser } } = await supabase.auth.getUser();

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: messageContent,
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    setIsThinking(true);

    let currentChatId = activeChatId;

    // Create conversation entry in chat history state immediately
    if (!currentChatId) {
      const titleSnippet =
        messageContent.length > 30
          ? messageContent.substring(0, 30) + "..."
          : messageContent;

      const tempId = `chat-${Date.now()}`;
      const newChatObj: ChatSession = {
        id: tempId,
        title: titleSnippet,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      currentChatId = tempId;
      setActiveChatId(tempId);
      const nextChats = [newChatObj, ...chats];
      setChats(nextChats);
      if (typeof window !== "undefined") {
        localStorage.setItem("l1pilot_chats", JSON.stringify(nextChats));
      }

      // If user is logged in, sync chat creation to Supabase
      if (freshUser) {
        try {
          const { data: chatData, error: chatError } = await supabase
            .from("chats")
            .insert({
              user_id: freshUser.id,
              title: titleSnippet,
            })
            .select("id, title, created_at, updated_at")
            .single();

          if (chatError) {
            console.error("[L1Pilot] Chat INSERT failed:", chatError.message, chatError.details, chatError.hint);
          } else if (chatData) {
            currentChatId = chatData.id;
            setActiveChatId(chatData.id);
            setChats((prev) => {
              const updated = prev.map((c) => (c.id === tempId ? chatData : c));
              if (typeof window !== "undefined") {
                localStorage.setItem("l1pilot_chats", JSON.stringify(updated));
              }
              return updated;
            });
          }
        } catch (err) {
          console.error("Error creating DB chat record:", err);
        }
      }

    }

    // Save user message locally
    if (typeof window !== "undefined" && currentChatId) {
      localStorage.setItem(
        `l1pilot_msgs_${currentChatId}`,
        JSON.stringify(newMessages)
      );
    }

    // Save user message to Supabase (only if currentChatId is a real UUID, not a temp ID)
    if (freshUser && currentChatId && isValidUUID(currentChatId)) {
      try {
        await supabase.from("messages").insert({
          chat_id: currentChatId,
          user_id: freshUser.id,
          role: "user",
          content: messageContent,
        });

        await supabase
          .from("chats")
          .update({ updated_at: new Date().toISOString() })
          .eq("id", currentChatId);
      } catch (err) {
        console.error("Error saving user message:", err);
      }
    }


    try {
      // Call Google Gemini API route
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      const cleanReply = stripEmojis(
        data.reply || "I could not generate a response. Please try again."
      );

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: cleanReply,
        timestamp: new Date(),
      };

      const finalMessages = [...newMessages, aiMsg];
      setMessages(finalMessages);

      // Save complete thread to localStorage
      if (typeof window !== "undefined" && currentChatId) {
        localStorage.setItem(
          `l1pilot_msgs_${currentChatId}`,
          JSON.stringify(finalMessages)
        );
      }

      // Save assistant message to Supabase (only if we have a real UUID chat ID)
      if (freshUser && currentChatId && isValidUUID(currentChatId)) {
        try {
          await supabase.from("messages").insert({
            chat_id: currentChatId,
            user_id: freshUser.id,
            role: "assistant",
            content: cleanReply,
          });
        } catch (err) {
          console.error("Error saving assistant message:", err);
        }
      }

      // Check if AI generated genesis/config files & auto-save (always runs, localStorage first)
      await saveGeneratedFilesToDatabase(cleanReply, currentChatId!, freshUser);



    } catch (err: any) {
      const errorMsg: Message = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content:
          err.message ||
          "An error occurred while connecting to L1Pilot AI. Please verify GOOGLE_GENERATIVE_AI_API_KEY in .env.local.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen h-dvh w-full flex bg-l1-bg text-l1-text overflow-hidden">
      {/* Sidebar for Chat History */}
      <ChatSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        onRenameChat={handleRenameChat}
        onDeleteChat={handleDeleteChat}
        isLoading={isHistoryLoading}
      />

      {/* Main Chat Content Area */}
      <div className="flex-1 flex flex-col h-screen h-dvh min-w-0 overflow-hidden">
        {/* Top Header Bar */}
        <header className="h-16 shrink-0 border-b border-white/10 bg-[#1E293B]/70 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-l1-text-muted hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Back to dashboard"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-l1-primary text-white shadow-md shadow-l1-primary/30">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h1 className="font-heading text-base sm:text-lg font-bold text-white tracking-tight">
                  L1Pilot AI
                </h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNewChat}
              className="text-xs text-l1-text-muted hover:text-white hover:bg-white/5 rounded-xl gap-1.5 cursor-pointer"
              title="Start new conversation"
            >
              <Plus className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">New Chat</span>
            </Button>
          </div>
        </header>

        {/* Main Messages Container (Scrollable) */}
        <div className="flex-1 min-h-0 overflow-y-auto w-full px-4 sm:px-6 py-6">
          <main className="max-w-4xl mx-auto space-y-5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl text-white shadow-md ${
                    msg.role === "user"
                      ? "bg-violet-600/80 border border-violet-400/30"
                      : "bg-l1-primary/20 border border-l1-primary/40 text-l1-primary"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="h-4 w-4 text-violet-200" />
                  ) : (
                    <Bot className="h-4.5 w-4.5 text-l1-primary" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed max-w-[85%] sm:max-w-[75%] shadow-md ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-l1-primary to-violet-600 text-white rounded-tr-sm"
                      : "bg-[#1E293B]/80 border border-white/10 text-l1-text rounded-tl-sm"
                  }`}
                >
                  <CodeBlockViewer
                    content={msg.content}
                    isUser={msg.role === "user"}
                  />
                  <div
                    className={`text-[10px] mt-2 text-right ${
                      msg.role === "user"
                        ? "text-violet-200/70"
                        : "text-l1-text-muted/60"
                    }`}
                  >
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}

            {/* Thinking Loading State Indicator */}
            {isThinking && (
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl bg-l1-primary/20 border border-l1-primary/40 text-l1-primary shadow-md">
                  <Bot className="h-4.5 w-4.5 text-l1-primary animate-pulse" />
                </div>
                <div className="p-4 rounded-2xl rounded-tl-sm bg-[#1E293B]/80 border border-white/10 text-l1-text-muted text-sm flex items-center gap-2 shadow-md">
                  <span className="text-xs font-medium text-l1-text-muted">
                    L1Pilot AI is thinking
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-l1-primary animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-l1-primary animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-l1-primary animate-bounce" />
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </main>
        </div>

        {/* Fixed Bottom Input Bar Container */}
        <footer className="shrink-0 border-t border-white/10 bg-[#1E293B]/80 backdrop-blur-2xl px-4 sm:px-6 py-3.5 sm:py-4 z-20 w-full">
          <div className="max-w-4xl mx-auto w-full flex flex-col gap-3">
            {/* Quick Prompts Suggestion Chips */}
            {messages.length <= 2 && !isThinking && !isMobileOrAndroid && (
              <div className="hidden md:flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                <span className="text-[11px] font-medium text-l1-text-muted flex items-center gap-1 shrink-0">
                  <Sparkles className="h-3 w-3 text-l1-primary" />
                  Prompts:
                </span>
                {QUICK_PROMPTS.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(item.prompt)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-l1-primary/40 transition-all text-xs font-medium text-slate-200 hover:text-white shrink-0 cursor-pointer"
                    >
                      <Icon className="h-3.5 w-3.5 text-l1-primary" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Form Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="relative flex items-end gap-2 p-2 rounded-2xl border border-white/10 bg-[#0F172A]/90 focus-within:border-l1-primary focus-within:ring-1 focus-within:ring-l1-primary transition-all shadow-inner"
            >
              <textarea
                ref={textareaRef}
                rows={1}
                value={input}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                placeholder="Ask L1Pilot AI anything about Avalanche L1 setup, genesis specs..."
                className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none resize-none max-h-36 overflow-y-auto leading-relaxed"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isThinking}
                className="h-9 w-9 rounded-xl bg-l1-primary hover:bg-l1-primary-hover disabled:opacity-40 disabled:hover:bg-l1-primary text-white shadow-md shadow-l1-primary/30 shrink-0 cursor-pointer transition-all"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>

            <div className="flex items-center justify-end px-1 text-[11px] text-l1-text-muted/60">
              <span>L1Pilot AI v1.0</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
