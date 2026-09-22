"use client";

import React from "react";
import {
  Rocket,
  Code2,
  Laptop,
  Server,
  Cpu,
  Network,
  Sparkles,
  Layers,
} from "lucide-react";

interface FloatingBadgeProps {
  icon: React.ElementType;
  position: string;
  colorClass: string;
  glowClass: string;
  animationClass: string;
  delay?: string;
  label?: string;
}

const badges: FloatingBadgeProps[] = [
  // 1. Top Left - Sparkles (AI Intelligence)
  {
    icon: Sparkles,
    position: "top-2 left-3 sm:top-4 sm:left-8 lg:left-12",
    colorClass: "text-amber-300",
    glowClass: "bg-amber-400/25",
    animationClass: "animate-[float-slow_6.5s_ease-in-out_infinite]",
    delay: "0s",
    label: "AI Co-Pilot",
  },
  // 2. Mid-Top Left - Code2 (Genesis & Config)
  {
    icon: Code2,
    position: "top-24 left-2 sm:top-28 sm:left-4 lg:left-6",
    colorClass: "text-sky-400",
    glowClass: "bg-sky-500/25",
    animationClass: "animate-[float-medium_5.2s_ease-in-out_infinite]",
    delay: "1.2s",
    label: "Genesis Config",
  },
  // 3. Mid-Lower Left - Laptop (Developer Interface)
  {
    icon: Laptop,
    position: "hidden md:flex top-56 left-4 lg:left-8",
    colorClass: "text-violet-400",
    glowClass: "bg-violet-500/25",
    animationClass: "animate-[float-slow_7.2s_ease-in-out_infinite]",
    delay: "2.4s",
    label: "Dev Console",
  },
  // 4. Bottom Left - Cpu (EVM Execution)
  {
    icon: Cpu,
    position: "bottom-4 left-4 sm:bottom-6 sm:left-12 lg:left-16",
    colorClass: "text-emerald-400",
    glowClass: "bg-emerald-400/25",
    animationClass: "animate-[float-fast_4.8s_ease-in-out_infinite]",
    delay: "0.8s",
    label: "EVM Engine",
  },
  // 5. Top Right - Rocket (Avalanche L1 Launch)
  {
    icon: Rocket,
    position: "top-2 right-3 sm:top-4 sm:right-8 lg:right-12",
    colorClass: "text-violet-400",
    glowClass: "bg-violet-500/30",
    animationClass: "animate-[float-slow_6.0s_ease-in-out_infinite]",
    delay: "0.4s",
    label: "L1 Launch",
  },
  // 6. Mid-Top Right - Layers (Subnet Architecture)
  {
    icon: Layers,
    position: "top-24 right-2 sm:top-28 sm:right-4 lg:right-6",
    colorClass: "text-sky-400",
    glowClass: "bg-sky-400/25",
    animationClass: "animate-[float-medium_5.8s_ease-in-out_infinite]",
    delay: "1.8s",
    label: "Subnet Mesh",
  },
  // 7. Mid-Lower Right - Server (Validator Nodes)
  {
    icon: Server,
    position: "hidden md:flex top-56 right-4 lg:right-8",
    colorClass: "text-emerald-400",
    glowClass: "bg-emerald-500/25",
    animationClass: "animate-[float-slow_7.5s_ease-in-out_infinite]",
    delay: "2.8s",
    label: "AvaCloud / Nodes",
  },
  // 8. Bottom Right - Network (Teleporter & Interoperability)
  {
    icon: Network,
    position: "bottom-4 right-4 sm:bottom-6 sm:right-12 lg:right-16",
    colorClass: "text-violet-300",
    glowClass: "bg-violet-500/25",
    animationClass: "animate-[float-fast_4.6s_ease-in-out_infinite]",
    delay: "1.0s",
    label: "Teleporter ICM",
  },
];

export function HeroFloatingIcons() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {badges.map((b, idx) => {
        const IconComponent = b.icon;

        return (
          <div
            key={idx}
            className={`absolute ${b.position} flex items-center gap-2 select-none`}
            style={{ animationDelay: b.delay }}
          >
            <div
              className={`relative flex items-center justify-center h-11 w-11 sm:h-13 sm:w-13 rounded-2xl border border-white/15 bg-[#1E293B]/75 backdrop-blur-xl shadow-xl shadow-black/40 ring-1 ring-white/10 ${b.animationClass}`}
              style={{ animationDelay: b.delay }}
            >
              {/* Subtle ambient blur behind icon */}
              <div
                className={`absolute inset-0 rounded-2xl ${b.glowClass} blur-lg opacity-70 -z-10 scale-110`}
              />
              <IconComponent className={`h-5 w-5 sm:h-6 sm:w-6 ${b.colorClass} drop-shadow-sm`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
