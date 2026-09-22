import type { Metadata } from "next";
import { Sparkles, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

import { AnimatedSection } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { WaitlistButton } from "@/components/waitlist-button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about L1Pilot's mission to make Avalanche L1 creation accessible to every builder.",
};

const pillars = [
  {
    label: "AI-First",
    description: "Built around conversational AI",
  },
  {
    label: "Avalanche Native",
    description: "Deep Avalanche L1 expertise",
  },
  {
    label: "Builder Focused",
    description: "Designed for real workflows",
  },
  {
    label: "Open",
    description: "Works with AvaCloud or self-hosted",
  },
] as const;

const values = [
  {
    icon: Sparkles,
    title: "Simplicity",
    description:
      "Complex technology should have simple interfaces. We turn Avalanche's powerful but complex configuration system into clear, guided conversations.",
  },
  {
    icon: ShieldCheck,
    title: "Accuracy",
    description:
      "Every configuration L1Pilot generates is validated and explained. We don't guess — we help you make informed decisions based on real Avalanche documentation and best practices.",
  },
  {
    icon: Zap,
    title: "Empowerment",
    description:
      "We don't just give you configs. We help you understand why each setting matters, so you become a more knowledgeable Avalanche builder over time.",
  },
] as const;

const roadmap = [
  { emoji: "✅", title: "AI Chat for L1 configuration", status: "Live" },
  { emoji: "✅", title: "Genesis file generation", status: "Live" },
  {
    emoji: "🚧",
    title: "Direct AvaCloud integration",
    status: "In Progress",
  },
  {
    emoji: "📋",
    title: "Multi-chain management dashboard",
    status: "Planned",
  },
  { emoji: "📋", title: "Team collaboration features", status: "Planned" },
  { emoji: "📋", title: "L1 monitoring and alerting", status: "Planned" },
  { emoji: "📋", title: "One-click deployment", status: "Planned" },
] as const;

function statusColor(status: string) {
  if (status === "Live") return "text-l1-accent";
  if (status === "In Progress") return "text-l1-secondary";
  return "text-l1-text-muted";
}

export default function AboutPage() {
  return (
    <main className="bg-l1-bg">
      {/* ───── Hero ───── */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* Decorative glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-[480px] w-[480px] rounded-full bg-l1-primary/10 blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              badge="About Us"
              title="Making Avalanche L1s Accessible to Everyone"
              description="We believe the future of blockchain is multi-chain. L1Pilot exists to make building on Avalanche simpler, faster, and more accessible."
              align="center"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* ───── Mission ───── */}
      <AnimatedSection className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — prose */}
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-bold tracking-tight text-l1-text sm:text-4xl">
                Our Mission
              </h2>
              <div className="space-y-4 text-l1-text-muted leading-relaxed text-lg">
                <p>
                  Avalanche&apos;s L1 architecture is one of the most powerful
                  innovations in blockchain. But power without accessibility
                  limits adoption. We&apos;re building L1Pilot to bridge that
                  gap — giving every developer, team, and enterprise the tools
                  and knowledge they need to launch their own blockchain with
                  confidence.
                </p>
                <p>
                  Whether you&apos;re a solo developer experimenting with your
                  first L1 or an enterprise team deploying a production network,
                  L1Pilot meets you where you are.
                </p>
              </div>
            </div>

            {/* Right — value pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((pillar) => (
                <Card
                  key={pillar.label}
                  className="border-l1-border bg-l1-surface/60 backdrop-blur-sm hover:border-l1-primary/40 transition-colors duration-300"
                >
                  <CardContent className="p-6 flex flex-col gap-2">
                    <span className="text-lg font-bold text-l1-text">
                      {pillar.label}
                    </span>
                    <span className="text-sm text-l1-text-muted">
                      {pillar.description}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ───── Values ───── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader title="What We Believe" align="center" />
          </AnimatedSection>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.1}>
                <Card className="h-full border-l1-border bg-l1-surface/60 backdrop-blur-sm hover:border-l1-primary/40 transition-colors duration-300">
                  <CardContent className="p-6 sm:p-8 flex flex-col gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-l1-primary/10">
                      <value.icon className="h-7 w-7 text-l1-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-l1-text">
                      {value.title}
                    </h3>
                    <p className="text-l1-text-muted leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Roadmap ───── */}
      <AnimatedSection className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Roadmap"
            title="Where We're Heading"
            align="center"
          />

          <div className="mt-14 max-w-2xl mx-auto">
            {/* vertical timeline */}
            <div className="relative border-l-2 border-l1-border pl-8 space-y-10">
              {roadmap.map((item, index) => (
                <AnimatedSection key={item.title} delay={index * 0.06}>
                  <div className="relative">
                    {/* Timeline dot */}
                    <span className="absolute -left-[2.55rem] top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-l1-border bg-l1-bg text-xs">
                      {item.emoji}
                    </span>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <h3 className="text-lg font-semibold text-l1-text">
                        {item.title}
                      </h3>
                      <span
                        className={`text-sm font-medium ${statusColor(item.status)}`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                </AnimatedSection>
              ))}

              {/* Gradient fade at the bottom of the timeline */}
              <div className="pointer-events-none absolute bottom-0 left-0 h-16 w-full bg-gradient-to-t from-l1-bg to-transparent" />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ───── Bottom CTA ───── */}
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
                  Want to be part of the journey?
                </h2>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <WaitlistButton
                    size="lg"
                    className="bg-l1-primary hover:bg-l1-primary-hover text-white shadow-lg shadow-l1-primary/25 cursor-pointer"
                  >
                    Try L1Pilot Free
                  </WaitlistButton>

                  <Link
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="ghost" size="lg" className="text-l1-text hover:text-white">
                      Follow us on Twitter
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
