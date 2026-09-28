import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  Rocket,
  Sparkles,
  MessageSquare,
  BookOpen,
  ChevronRight,
  LayoutDashboard,
  FolderOpen,
  Settings,
  Zap,
  Plus,
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
import { Separator } from "@/components/ui/separator";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";


export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Manage your Avalanche L1 configurations and AI pilot sessions.",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const displayName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    "Builder";
  const userEmail = user.email || "";
  const avatarFallback = displayName.charAt(0).toUpperCase();
  const avatarUrl =
    user.user_metadata?.avatar_url ||
    user.user_metadata?.picture ||
    null;

  // Query live counts for chats and configurations from Supabase database
  let conversationsTotal = 0;
  let configurationsTotal = 0;

  try {
    const [{ count: chatsCount }, { count: configsCount }] = await Promise.all([
      supabase
        .from("chats")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id),
      supabase
        .from("configurations")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id),
    ]);

    conversationsTotal = chatsCount ?? 0;
    configurationsTotal = configsCount ?? 0;
  } catch (err) {
    console.error("Error querying dashboard stats:", err);
  }

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {/* Page background subtle gradient */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-l1-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] bg-l1-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12 space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-4 sm:mt-6">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  referrerPolicy="no-referrer"
                  className="h-14 w-14 rounded-2xl object-cover shadow-lg border border-l1-primary/30"
                />
              ) : (
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-l1-primary to-violet-800 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-l1-primary/30 border border-l1-primary/30">
                  {avatarFallback}
                </div>
              )}
              <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-l1-bg shadow-sm" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Welcome back, {displayName}!
                </h1>
                <Badge
                  variant="outline"
                  className="border-l1-primary/30 bg-l1-primary/10 text-violet-300 text-[11px] font-medium hidden sm:inline-flex"
                >
                  <Rocket className="h-2.5 w-2.5 mr-1" /> Free Plan
                </Badge>
              </div>
              {userEmail && (
                <p className="text-sm text-l1-text-muted mt-0.5">{userEmail}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link href="/chat">
              <Button className="h-11 rounded-xl bg-l1-primary hover:bg-l1-primary-hover text-white text-sm font-semibold shadow-md shadow-l1-primary/25 cursor-pointer flex items-center gap-2 px-5">
                <Plus className="h-4 w-4" />
                New L1 Config
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Row — client component reads localStorage as fallback */}
        <DashboardStats
          supabaseConversations={conversationsTotal}
          supabaseConfigurations={configurationsTotal}
        />


        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Quick Actions */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="border-white/10 bg-[#1E293B]/70 backdrop-blur-xl">
              <CardHeader className="border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <LayoutDashboard className="h-5 w-5 text-l1-primary" />
                  <CardTitle className="text-base font-bold text-white">
                    Quick Actions
                  </CardTitle>
                </div>
                <CardDescription className="text-xs text-l1-text-muted mt-1">
                  Everything you need to get started with L1Pilot
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 space-y-3">
                {/* Action 1: Start New L1 Configuration */}
                <Link href="/chat" className="group block">
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-gradient-to-r from-l1-primary/10 to-violet-800/5 hover:from-l1-primary/20 hover:to-violet-800/10 hover:border-l1-primary/40 transition-all cursor-pointer">
                    <div className="h-11 w-11 rounded-xl bg-l1-primary/20 border border-l1-primary/30 flex items-center justify-center text-l1-primary shrink-0 group-hover:scale-105 transition-transform shadow-md shadow-l1-primary/20">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white text-sm group-hover:text-l1-primary transition-colors">
                        Start New L1 Configuration
                      </p>
                      <p className="text-xs text-l1-text-muted mt-0.5 leading-snug">
                        Describe your L1 and let the AI generate a complete genesis config
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-l1-primary shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>

                {/* Action 2: View My Configurations */}
                <Link href="/configurations" className="group block">
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:border-violet-500/30 hover:bg-violet-500/5 transition-all cursor-pointer">
                    <div className="h-11 w-11 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0 group-hover:scale-105 transition-transform">
                      <FolderOpen className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-white text-sm group-hover:text-violet-300 transition-colors">
                          View My Configurations &amp; Chat History
                        </p>
                      </div>
                      <p className="text-xs text-l1-text-muted mt-0.5 leading-snug">
                        Browse your saved chats, genesis JSON, and node configs
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-violet-400/60 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>

                {/* Action 3: Documentation */}
                <Link href="/how-it-works" className="group block">
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:border-sky-500/30 hover:bg-sky-500/5 transition-all cursor-pointer">
                    <div className="h-11 w-11 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0 group-hover:scale-105 transition-transform">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white text-sm group-hover:text-sky-300 transition-colors">
                        Documentation &amp; How It Works
                      </p>
                      <p className="text-xs text-l1-text-muted mt-0.5 leading-snug">
                        Learn how L1Pilot works and explore the full feature set
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-sky-400/60 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </CardContent>
            </Card>

            {/* Getting Started / Empty State */}
            <Card className="border-white/10 border-dashed bg-[#1E293B]/40 backdrop-blur-xl">
              <CardContent className="p-8 flex flex-col items-center text-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-l1-primary/10 border border-l1-primary/20 flex items-center justify-center text-l1-primary">
                  <Rocket className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold text-white">
                    Ready to launch your first L1?
                  </h3>
                  <p className="text-sm text-l1-text-muted mt-1.5 max-w-sm mx-auto leading-relaxed">
                    Tell L1Pilot what you want to build — a gaming chain, a permissioned RWA network, or a DeFi subnet — and get a complete config in minutes.
                  </p>
                </div>
                <Link href="/chat">
                  <Button className="h-11 px-6 rounded-xl bg-l1-primary hover:bg-l1-primary-hover text-white text-sm font-semibold shadow-md shadow-l1-primary/25 cursor-pointer flex items-center gap-2 mt-1">
                    <Sparkles className="h-4 w-4" />
                    Start with AI Co-Pilot
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Account Card */}
            <Card className="border-white/10 bg-[#1E293B]/70 backdrop-blur-xl overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-l1-primary via-violet-500 to-l1-secondary" />
              <CardHeader className="pb-3 pt-5">
                <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                  <Settings className="h-4 w-4 text-l1-text-muted" />
                  Account
                </CardTitle>
              </CardHeader>
              <CardContent className="px-5 pb-5 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-l1-text-muted">Plan</span>
                    <Badge
                      variant="outline"
                      className="border-l1-primary/30 bg-l1-primary/10 text-violet-300 text-[10px]"
                    >
                      Free
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-l1-text-muted">Status</span>
                    <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-l1-text-muted">Daily Allowance</span>
                    <span className="text-violet-300 text-xs font-medium">5 chats / day</span>
                  </div>

                </div>

                <Separator className="bg-white/5" />

                <div className="pt-1 space-y-1">
                  <p className="text-[11px] text-l1-text-muted font-medium uppercase tracking-wider mb-2">
                    Quick Links
                  </p>
                  {[
                    { label: "AI Chat", href: "/chat", icon: MessageSquare },
                    { label: "How It Works", href: "/how-it-works", icon: BookOpen },
                    { label: "Pricing", href: "/pricing", icon: Zap },
                  ].map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-l1-text-muted hover:text-white hover:bg-white/5 transition-all group cursor-pointer"
                      >
                        <Icon className="h-3.5 w-3.5 text-l1-primary shrink-0" />
                        {link.label}
                        <ChevronRight className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Features Card */}
            <Card className="border-white/10 bg-[#1E293B]/60 backdrop-blur-xl">
              <CardHeader className="pb-3 border-b border-white/5">
                <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  Active Features
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-3">
                {[
                  "Google Gemini AI engine connected",
                  "Saved configurations & chat history",
                  "Genesis JSON & Node config generator",
                  "One-click JSON copy & download",
                  "Custom EVM precompile architect",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-l1-text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                    {item}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
