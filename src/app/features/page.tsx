import type { Metadata } from "next";
import {
  MessageSquare,
  FileCode,
  Shield,
  Target,
  Coins,
  Globe,
  Download,
} from "lucide-react";
import Link from "next/link";

import { AnimatedSection } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { WaitlistButton } from "@/components/waitlist-button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore everything L1Pilot can do — from AI-powered chat to automatic config generation for Avalanche L1s.",
};

const features = [
  {
    icon: MessageSquare,
    title: "AI Chat for Avalanche L1s",
    description:
      "Have natural conversations about your L1 requirements. The AI understands Avalanche architecture, subnet configurations, and deployment options at a deep level. Ask anything from basic questions to complex multi-chain setups.",
  },
  {
    icon: FileCode,
    title: "Automatic Config Generation",
    description:
      "Generate correct genesis files, chain configs, and validator settings automatically. No more manually editing JSON files or wondering if you missed a parameter. Every config is validated and explained.",
  },
  {
    icon: Shield,
    title: "Permission Model Guidance",
    description:
      "Understand the tradeoffs between Permissioned (PoA) and Permissionless consensus. Get clear recommendations based on your security requirements, regulatory needs, and operational preferences.",
  },
  {
    icon: Target,
    title: "Use Case Recommendations",
    description:
      "Whether you're building for Gaming, Real World Assets, DeFi, or Enterprise — get tailored settings that match your specific use case. L1Pilot knows the optimal configurations for each scenario.",
  },
  {
    icon: Coins,
    title: "Fee & Economic Design",
    description:
      "Design your L1's fee structure and token economics with confidence. Understand gas pricing, fee distribution, and economic incentives. Get guidance on gasless chains, custom fee tokens, and more.",
  },
  {
    icon: Globe,
    title: "Interoperability Setup",
    description:
      "Configure Teleporter and ICM (Interchain Messaging) correctly from the start. L1Pilot guides you through cross-chain communication setup so your L1 works seamlessly with the Avalanche ecosystem.",
  },
  {
    icon: Download,
    title: "Export-Ready Files",
    description:
      "Download production-ready configuration files that work directly with AvaCloud or your own validator setup. No reformatting, no guesswork — just deploy.",
  },
] as const;

export default function FeaturesPage() {
  return (
    <main className="bg-l1-bg">
      {/* Hero */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* Decorative glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-[480px] w-[480px] rounded-full bg-l1-primary/10 blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              badge="Features"
              title="Everything You Need to Build Avalanche L1s"
              description="L1Pilot combines deep Avalanche knowledge with AI to make L1 creation accessible to everyone."
              align="center"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Detailed Features Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <AnimatedSection key={feature.title} delay={index * 0.08}>
                <Card className="h-full border-l1-border bg-l1-surface/60 backdrop-blur-sm hover:border-l1-primary/40 transition-colors duration-300">
                  <CardContent className="p-6 sm:p-8 flex flex-col gap-5">
                    {/* Icon */}
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-l1-primary/10">
                      <feature.icon className="h-7 w-7 text-l1-primary" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-l1-text">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-l1-text-muted leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="relative rounded-2xl border border-l1-border bg-l1-surface/50 px-6 py-16 sm:px-12 sm:py-20 text-center overflow-hidden">
              {/* Glow */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 h-[320px] w-[320px] rounded-full bg-l1-primary/15 blur-[100px]" />
              </div>

              <div className="relative flex flex-col items-center gap-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-l1-text">
                  Ready to build your Avalanche L1?
                </h2>

                <WaitlistButton size="lg" className="bg-l1-primary hover:bg-l1-primary-hover text-white cursor-pointer shadow-lg shadow-l1-primary/25">
                  Try L1Pilot Free
                </WaitlistButton>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
