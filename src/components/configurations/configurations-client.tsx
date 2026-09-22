"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  FileCode,
  Download,
  Copy,
  Check,
  Trash2,
  Eye,
  Plus,
  ArrowLeft,
  Sparkles,
  Search,
  FileJson,
  X,
  Clock,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlockViewer } from "@/components/chat/code-block-viewer";
import { useAuth } from "@/components/auth-provider";
import { createClient } from "@/lib/supabase/client";
import { recoverConfigsFromLocalStorage } from "@/lib/configurations-store";

export interface SavedConfiguration {
  id: string;
  user_id?: string;
  chat_id?: string | null;
  name: string;
  type: "genesis" | "config";
  content: string;
  created_at: string;
  chats?: { title: string } | null;
}

export function ConfigurationsClient() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const supabase = createClient();

  const [configs, setConfigs] = useState<SavedConfiguration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState<"all" | "genesis" | "config">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedMap, setCopiedMap] = useState<Record<string, boolean>>({});
  const [selectedConfig, setSelectedConfig] = useState<SavedConfiguration | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch configurations from Supabase and fallback/merge with localStorage
  const loadConfigurations = useCallback(async () => {
    setIsLoading(true);

    let localItems: SavedConfiguration[] = [];
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("l1pilot_saved_configs");
        if (stored) {
          localItems = JSON.parse(stored);
        }

        // Also check if any configs can be recovered from past chat messages
        const recovered = recoverConfigsFromLocalStorage();
        if (recovered.length > 0) {
          const missing = recovered.filter(
            (r) => !localItems.some((item) => item.name === r.name && item.content === r.content)
          );
          if (missing.length > 0) {
            localItems = [...missing, ...localItems];
            localStorage.setItem("l1pilot_saved_configs", JSON.stringify(localItems));
            console.log(`[L1Pilot] Recovered ${missing.length} config file(s) into Configurations page.`);
          }
        }

        setConfigs(localItems);
      } catch (err) {
        console.error("Error loading local configurations:", err);
      }
    }

    if (user) {
      try {
        const { data, error } = await supabase
          .from("configurations")
          .select("id, user_id, chat_id, name, type, content, created_at, chats(title)")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (!error && data) {
          const formatted: SavedConfiguration[] = data.map((item: any) => ({
            id: item.id,
            user_id: item.user_id,
            chat_id: item.chat_id,
            name: item.name,
            type: item.type as "genesis" | "config",
            content: item.content,
            created_at: item.created_at,
            chats: Array.isArray(item.chats) ? item.chats[0] : item.chats,
          }));

          // Merge Supabase items and local items (never wipe local items if Supabase has 0 rows)
          const mergedMap = new Map<string, SavedConfiguration>();
          formatted.forEach((item) => mergedMap.set(item.id, item));

          localItems.forEach((localItem) => {
            const existsInDb = formatted.some((dbItem) => dbItem.content === localItem.content);
            if (!existsInDb) {
              mergedMap.set(localItem.id, localItem);
              // Background sync local-only items to Supabase
              supabase
                .from("configurations")
                .insert({
                  user_id: user.id,
                  chat_id: null,
                  name: localItem.name,
                  type: localItem.type,
                  content: localItem.content,
                })
                .then(({ error: syncErr }) => {
                  if (!syncErr) {
                    console.log(`[L1Pilot] Background synced ${localItem.name} to DB`);
                  }
                });
            }
          });

          const combined = Array.from(mergedMap.values());
          setConfigs(combined);
          if (typeof window !== "undefined") {
            localStorage.setItem("l1pilot_saved_configs", JSON.stringify(combined));
          }
        }
      } catch (err) {
        console.error("Error fetching configurations from DB:", err);
      }
    }

    setIsLoading(false);
  }, [user, supabase]);


  useEffect(() => {
    loadConfigurations();
  }, [loadConfigurations]);

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedMap((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => setCopiedMap((prev) => ({ ...prev, [id]: false })), 2000);
  };

  const handleDownload = (content: string, fileName: string) => {
    const blob = new Blob([content], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const updated = configs.filter((c) => c.id !== id);
    setConfigs(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("l1pilot_saved_configs", JSON.stringify(updated));
    }

    if (user) {
      try {
        await supabase
          .from("configurations")
          .delete()
          .eq("id", id)
          .eq("user_id", user.id);
      } catch (err) {
        console.error("Error deleting configuration:", err);
      }
    }

    if (selectedConfig?.id === id) {
      setSelectedConfig(null);
    }
    setDeletingId(null);
  };

  const filteredConfigs = configs.filter((item) => {
    const matchesType =
      filterType === "all" || item.type === filterType;
    const matchesSearch =
      searchQuery === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.chats?.title?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-l1-bg text-l1-text pb-16">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[600px] h-[400px] bg-l1-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] bg-violet-600/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-l1-text-muted hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Back to dashboard"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600/20 border border-violet-500/30 text-violet-400 shadow-md">
                  <FileJson className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    My Configurations
                  </h1>
                  <p className="text-xs sm:text-sm text-l1-text-muted mt-0.5">
                    Saved Genesis JSON and Node Configuration files
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/chat">
              <Button className="h-10 px-4 rounded-xl bg-l1-primary hover:bg-l1-primary-hover text-white text-xs font-semibold shadow-md shadow-l1-primary/25 cursor-pointer gap-2">
                <Plus className="h-4 w-4" />
                <span>New L1 Config</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 rounded-2xl border border-white/10 bg-[#1E293B]/60 backdrop-blur-xl">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto scrollbar-none">
            {[
              { key: "all", label: `All Files (${configs.length})` },
              {
                key: "genesis",
                label: `Genesis (${configs.filter((c) => c.type === "genesis").length})`,
              },
              {
                key: "config",
                label: `Config (${configs.filter((c) => c.type === "config").length})`,
              },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilterType(tab.key as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer ${
                  filterType === tab.key
                    ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search configurations..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-900/80 border border-white/10 rounded-xl text-xs text-white placeholder:text-slate-500 outline-none focus:border-violet-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Configurations Grid */}
        {isLoading || isAuthLoading ? (
          /* Loading Skeletons */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-44 rounded-2xl bg-[#1E293B]/40 border border-white/10 animate-pulse p-5 space-y-4"
              >
                <div className="flex justify-between">
                  <div className="h-5 w-24 bg-white/10 rounded-lg" />
                  <div className="h-5 w-16 bg-white/10 rounded-full" />
                </div>
                <div className="h-4 w-40 bg-white/5 rounded-md" />
                <div className="h-8 w-full bg-white/5 rounded-xl pt-4" />
              </div>
            ))}
          </div>
        ) : filteredConfigs.length === 0 ? (
          /* Empty State */
          <Card className="border-white/10 border-dashed bg-[#1E293B]/40 backdrop-blur-xl">
            <CardContent className="p-12 flex flex-col items-center text-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shadow-xl">
                <FileCode className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-white">
                  No Saved Configurations Yet
                </h3>
                <p className="text-xs sm:text-sm text-l1-text-muted mt-1.5 max-w-md mx-auto leading-relaxed">
                  {searchQuery || filterType !== "all"
                    ? "No files matched your filter criteria. Try clearing search or switching tabs."
                    : "When you design an L1 in the AI Chat, your generated genesis.json and config.json files will automatically save here."}
                </p>
              </div>
              <Link href="/chat">
                <Button className="h-10 px-5 rounded-xl bg-l1-primary hover:bg-l1-primary-hover text-white text-xs font-semibold shadow-md shadow-l1-primary/25 cursor-pointer flex items-center gap-2 mt-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Start New Config in Chat</span>
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredConfigs.map((item) => {
              const isCopied = copiedMap[item.id];
              const formattedDate = new Date(item.created_at).toLocaleDateString(
                undefined,
                { month: "short", day: "numeric", year: "numeric" }
              );

              return (
                <Card
                  key={item.id}
                  className="border-white/10 bg-[#1E293B]/70 backdrop-blur-xl hover:border-violet-500/30 transition-all flex flex-col justify-between overflow-hidden group shadow-lg"
                >
                  <CardHeader className="p-4 pb-3 border-b border-white/5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileCode className="h-4 w-4 text-violet-400 shrink-0" />
                        <CardTitle className="text-sm font-bold text-white font-mono truncate">
                          {item.name}
                        </CardTitle>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-semibold font-mono uppercase px-2 py-0.5 rounded-full ${
                          item.type === "genesis"
                            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                            : "border-sky-500/40 bg-sky-500/10 text-sky-300"
                        }`}
                      >
                        {item.type}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="p-4 pt-3 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2 text-xs">
                      {item.chats?.title && (
                        <div className="flex items-center gap-1.5 text-slate-300 truncate">
                          <MessageSquare className="h-3 w-3 text-slate-500 shrink-0" />
                          <span className="truncate">{item.chats.title}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                        <Clock className="h-3 w-3 text-slate-500 shrink-0" />
                        <span>Created {formattedDate}</span>
                      </div>
                    </div>

                    {/* Action buttons bar */}
                    <div className="flex items-center justify-between gap-1.5 pt-2 border-t border-white/5">
                      <div className="flex items-center gap-1.5">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedConfig(item)}
                          className="h-8 px-2.5 text-xs text-slate-300 hover:text-white hover:bg-white/10 rounded-lg gap-1.5 cursor-pointer"
                        >
                          <Eye className="h-3.5 w-3.5 text-violet-400" />
                          <span>View</span>
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(item.content, item.id)}
                          className="h-8 px-2.5 text-xs text-slate-300 hover:text-white hover:bg-white/10 rounded-lg gap-1.5 cursor-pointer"
                        >
                          {isCopied ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(item.content, item.name)}
                          className="h-8 px-2.5 text-xs border-violet-500/30 bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 hover:text-white rounded-lg gap-1.5 cursor-pointer"
                        >
                          <Download className="h-3.5 w-3.5" />
                          <span>Download</span>
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(item.id)}
                        disabled={deletingId === item.id}
                        className="h-8 w-8 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg cursor-pointer shrink-0"
                        title="Delete configuration"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* View Modal / Drawer */}
      {selectedConfig && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in-0">
          <div className="w-full max-w-3xl max-h-[85vh] bg-[#0F172A] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-white/[0.03]">
              <div className="flex items-center gap-2.5">
                <FileCode className="h-5 w-5 text-violet-400" />
                <span className="font-mono text-sm font-bold text-white">
                  {selectedConfig.name}
                </span>
                <Badge
                  variant="outline"
                  className="text-[10px] font-mono uppercase border-violet-500/40 bg-violet-500/10 text-violet-300"
                >
                  {selectedConfig.type}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(selectedConfig.content, "modal")}
                  className="h-8 px-2.5 text-xs text-slate-300 hover:text-white hover:bg-white/10 rounded-lg gap-1.5 cursor-pointer"
                >
                  {copiedMap["modal"] ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleDownload(selectedConfig.content, selectedConfig.name)
                  }
                  className="h-8 px-2.5 text-xs border-violet-500/40 bg-violet-500/20 hover:bg-violet-500/30 text-white rounded-lg gap-1.5 cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download</span>
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedConfig(null)}
                  className="h-8 w-8 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-5 bg-[#0B0F19]">
              <CodeBlockViewer
                content={`\`\`\`json\n${selectedConfig.content}\n\`\`\``}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
