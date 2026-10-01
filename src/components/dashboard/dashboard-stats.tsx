"use client";

import { useEffect, useState } from "react";
import { FileCode, MessageSquare, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { recoverConfigsFromLocalStorage } from "@/lib/configurations-store";

interface DashboardStatsProps {
  supabaseConversations: number;
  supabaseConfigurations: number;
}

export function DashboardStats({
  supabaseConversations,
  supabaseConfigurations,
}: DashboardStatsProps) {
  const [conversationsTotal, setConversationsTotal] = useState(supabaseConversations);
  const [configurationsTotal, setConfigurationsTotal] = useState(supabaseConfigurations);

  useEffect(() => {
    try {
      const storedChats = localStorage.getItem("l1pilot_chats");
      let storedConfigs = localStorage.getItem("l1pilot_saved_configs");

      let configsCount = 0;
      if (storedConfigs) {
        configsCount = JSON.parse(storedConfigs).length;
      }

      // If local configs are 0, attempt recovery from chat history
      if (configsCount === 0) {
        const recovered = recoverConfigsFromLocalStorage();
        if (recovered.length > 0) {
          configsCount = recovered.length;
          localStorage.setItem("l1pilot_saved_configs", JSON.stringify(recovered));
        }
      }

      const chatsCount = storedChats ? JSON.parse(storedChats).length : 0;

      setConversationsTotal(Math.max(supabaseConversations, chatsCount));
      setConfigurationsTotal(Math.max(supabaseConfigurations, configsCount));
    } catch {
      // ignore
    }
  }, [supabaseConversations, supabaseConfigurations]);


  const stats = [
    {
      label: "Configurations Created",
      value: String(configurationsTotal),
      desc:
        configurationsTotal > 0
          ? `${configurationsTotal} files saved`
          : "No configs yet — start below",
      icon: FileCode,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
    },
    {
      label: "AI Conversations",
      value: String(conversationsTotal),
      desc:
        conversationsTotal > 0
          ? `${conversationsTotal} active chats`
          : "Chat with L1Pilot AI",
      icon: MessageSquare,
      color: "text-sky-400",
      bg: "bg-sky-500/10",
    },
    {
      label: "Account Status",
      value: "Active",
      desc: "Free plan — all features",
      icon: Settings,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <Card
            key={i}
            className="border-white/10 bg-[#1E293B]/60 backdrop-blur-md hover:border-white/20 transition-all"
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-l1-text-muted uppercase tracking-wider leading-snug">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold font-heading text-white mt-1.5 leading-none">
                    {stat.value}
                  </p>
                  <p className="text-[11px] text-l1-text-muted mt-1.5 leading-snug hidden sm:block">
                    {stat.desc}
                  </p>
                </div>
                <div
                  className={`p-2.5 rounded-xl ${stat.bg} ${stat.color} shrink-0 ml-2`}
                >
                  <Icon className="h-4 w-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
