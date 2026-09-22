import type { Metadata } from "next";
import Link from "next/link";
import {
  MessageSquare,
  HelpCircle,
  FileCode,
  Server,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Terminal,
  Cloud,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
} from "lucide-react";

import { AnimatedSection } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { WaitlistButton } from "@/components/waitlist-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Learn how L1Pilot guides you from your initial idea to ready-to-deploy Avalanche L1 configuration files in 4 simple steps.",
};

const steps = [
  {
    step: "01",
    title: "Describe what you want",
    tagline: "Natural language input without the blockchain jargon",
    quote:
      'Tell the AI: "I want a gasless gaming L1" or "Create a permissioned chain for tokenized real-world assets"',
    description:
      "Start by explaining your project's goals in everyday language. You don't need to know genesis parameters, EVM opcodes, or precompile addresses beforehand. L1Pilot extracts your core functional and economic requirements.",
    icon: MessageSquare,
    badge: "Step 1: Input",
    visual: {
      type: "chat",
      prompts: [
        {
          label: "Gaming Studio",
          text: "I need a zero-gas L1 with instant finality for an on-chain RPG card game.",
          tag: "Gaming Preset",
        },
        {
          label: "Fintech Enterprise",
          text: "Create a KYC-permissioned L1 for real-world asset tokenization with approved validators.",
          tag: "RWA / PoA",
        },
        {
          label: "DeFi Protocol",
          text: "Launch an EVM-compatible L1 using my native governance token for network gas fees.",
          tag: "Custom Fee Token",
        },
      ],
    },
  },
  {
    step: "02",
    title: "Get intelligent guidance",
    tagline: "The AI asks the right questions and explains every choice simply",
    quote:
      "No guessing games. L1Pilot walks you through trade-offs in plain English so you avoid costly mistakes.",
    description:
      "Configuring an Avalanche L1 involves dozens of architectural decisions. L1Pilot asks clarifying questions one step at a time, explaining the pros, cons, and cost implications of each choice.",
    icon: HelpCircle,
    badge: "Step 2: Analysis",
    visual: {
      type: "guidance",
      checks: [
        {
          title: "Consensus Model Selection",
          desc: "Permissioned (Proof of Authority) for controlled consortiums vs. Permissionless (PoS) for decentralized networks.",
          status: "Clarified",
        },
        {
          title: "Gas & Economic Tokenomics",
          desc: "Decide whether users pay in AVAX, your custom ERC-20 token, or experience zero-friction gasless transactions.",
          status: "Optimized",
        },
        {
          title: "Validator & Hardware Sizing",
          desc: "Receive clear specifications for node memory, storage, and stake requirements based on expected TPS.",
          status: "Calculated",
        },
        {
          title: "Interoperability (Teleporter / ICM)",
          desc: "Auto-configure cross-subnet communication contracts and relayer settings out of the box.",
          status: "Integrated",
        },
      ],
    },
  },
  {
    step: "03",
    title: "Receive ready-to-use configs",
    tagline: "Get genesis files, recommended settings, and clear next steps",
    quote:
      "Fully validated JSON genesis files and Avalanche-CLI configs ready for immediate deployment.",
    description:
      "L1Pilot generates complete, syntactically verified configuration files tailored for Avalanche9000. Every single parameter is annotated with explanations of what it controls.",
    icon: FileCode,
    badge: "Step 3: Generation",
    visual: {
      type: "code",
      fileName: "genesis.json",
      snippet: `{
  "config": {
    "chainId": 91823,
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip155Block": 0,
    "byzantiumBlock": 0,
    "constantinopleBlock": 0,
    "petersburgBlock": 0,
    "istanbulBlock": 0,
    "contractDeployerAllowListConfig": {
      "blockTimestamp": 0,
      "adminAddresses": ["0x8db97C7c..."]
    },
    "feeConfig": {
      "gasLimit": 12000000,
      "targetBlockRate": 2,
      "minBaseFee": 1000000000
    }
  },
  "alloc": { ... }
}`,
    },
  },
  {
    step: "04",
    title: "Deploy your way",
    tagline: "Use the output with AvaCloud or your own validators",
    quote:
      "Zero vendor lock-in. Seamlessly transition to AvaCloud managed services or self-host your sovereign nodes.",
    description:
      "You stay in full control. Take your generated files and import them straight into AvaCloud for fully managed node infrastructure, or follow our auto-generated CLI commands to run your own validators.",
    icon: Server,
    badge: "Step 4: Launch",
    visual: {
      type: "deploy",
      options: [
        {
          name: "AvaCloud Deployment",
          desc: "Ideal for teams wanting enterprise SLA, automatic node updates, and managed validator infrastructure.",
          icon: Cloud,
          action: "Export for AvaCloud Portal",
          bullets: ["1-click config import", "Managed RPC endpoints", "Zero DevOps overhead"],
        },
        {
          name: "Self-Hosted Validators",
          desc: "Ideal for builders and decentralized protocols requiring sovereign infrastructure and custom hardware.",
          icon: Terminal,
          action: "Download avalanche-cli script",
          bullets: ["Full command-line scripts", "Custom Docker setups", "Complete node ownership"],
        },
      ],
    },
  },
];

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col min-h-screen bg-l1-bg text-l1-text relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/3 h-[500px] w-[800px] rounded-full bg-l1-primary/15 blur-[140px]" />
        <div className="absolute right-0 top-1/3 h-[450px] w-[450px] rounded-full bg-l1-secondary/10 blur-[130px]" />
        <div className="absolute left-0 bottom-1/4 h-[400px] w-[400px] rounded-full bg-l1-primary/10 blur-[120px]" />
      </div>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <AnimatedSection>
            <SectionHeader
              badge="How It Works"
              title="From Idea to Running Avalanche L1 in 4 Simple Steps"
              description="L1Pilot simplifies the entire lifecycle of configuring an Avalanche L1. Explore how conversational AI turns complex blockchain parameters into production-ready deployments."
              align="center"
            />
          </AnimatedSection>

          {/* Quick Step Indicators */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { num: "01", label: "Describe", icon: MessageSquare },
              { num: "02", label: "Guidance", icon: HelpCircle },
              { num: "03", label: "Generate", icon: FileCode },
              { num: "04", label: "Deploy", icon: Server },
            ].map((s, idx) => (
              <div
                key={s.num}
                className="flex flex-col items-center p-4 rounded-xl border border-l1-border/60 bg-l1-surface/50 backdrop-blur-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-l1-primary/15 text-l1-primary font-bold text-sm mb-2">
                  {s.num}
                </div>
                <span className="text-sm font-semibold text-l1-text">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Detailed 4 Steps */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            const isEven = idx % 2 === 1;

            return (
              <AnimatedSection key={item.step} delay={0.1}>
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${
                    isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Text Column */}
                  <div
                    className={`lg:col-span-6 flex flex-col gap-5 ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="outline"
                        className="border-l1-primary/40 bg-l1-primary/10 text-l1-primary px-3 py-1 font-mono text-xs font-semibold"
                      >
                        {item.badge}
                      </Badge>
                      <span className="text-xs font-medium text-l1-text-muted">
                        Step {idx + 1} of 4
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-l1-text">
                      {item.title}
                    </h2>

                    <p className="text-base sm:text-lg font-medium text-l1-secondary">
                      {item.tagline}
                    </p>

                    <blockquote className="border-l-2 border-l1-primary pl-4 py-1 italic text-sm text-l1-text/90 bg-l1-primary/5 rounded-r-lg">
                      {item.quote}
                    </blockquote>

                    <p className="text-sm sm:text-base text-l1-text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Visual / Mockup Column */}
                  <div
                    className={`lg:col-span-6 ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    {/* Visual 1: Natural Prompts */}
                    {item.visual.type === "chat" && (
                      <Card className="border-l1-border bg-l1-surface/70 backdrop-blur-md shadow-xl overflow-hidden">
                        <CardHeader className="border-b border-l1-border/50 pb-4 bg-l1-bg/40">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs font-medium text-l1-text-muted">
                              <MessageSquare className="h-4 w-4 text-l1-primary" />
                              <span>Sample Prompts Accepted by L1Pilot</span>
                            </div>
                            <span className="inline-flex h-2 w-2 rounded-full bg-l1-accent animate-pulse" />
                          </div>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-3.5">
                          {item.visual.prompts?.map((p, i) => (
                            <div
                              key={i}
                              className="p-3.5 rounded-xl border border-l1-border/70 bg-l1-bg/60 hover:border-l1-primary/40 transition-colors"
                            >
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-xs font-semibold text-l1-text">
                                  {p.label}
                                </span>
                                <Badge
                                  variant="secondary"
                                  className="bg-l1-surface text-[10px] text-l1-secondary border-none"
                                >
                                  {p.tag}
                                </Badge>
                              </div>
                              <p className="text-xs sm:text-sm text-l1-text-muted">
                                &ldquo;{p.text}&rdquo;
                              </p>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    )}

                    {/* Visual 2: Guidance checklist */}
                    {item.visual.type === "guidance" && (
                      <Card className="border-l1-border bg-l1-surface/70 backdrop-blur-md shadow-xl">
                        <CardHeader className="border-b border-l1-border/50 pb-4 bg-l1-bg/40">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs font-medium text-l1-text-muted">
                              <Sparkles className="h-4 w-4 text-l1-secondary" />
                              <span>Guided Parameter Optimization</span>
                            </div>
                            <Badge className="bg-l1-accent/20 text-l1-accent border-none text-[11px]">
                              Avalanche9000 Ready
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-5 space-y-3">
                          {item.visual.checks?.map((c, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-3 p-3 rounded-lg border border-l1-border/50 bg-l1-bg/40"
                            >
                              <CheckCircle2 className="h-4 w-4 text-l1-accent shrink-0 mt-0.5" />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-semibold text-l1-text">
                                    {c.title}
                                  </span>
                                  <span className="text-[10px] font-mono text-l1-accent bg-l1-accent/10 px-1.5 py-0.5 rounded">
                                    {c.status}
                                  </span>
                                </div>
                                <p className="text-xs text-l1-text-muted mt-1 leading-snug">
                                  {c.desc}
                                </p>
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    )}

                    {/* Visual 3: Code generation preview */}
                    {item.visual.type === "code" && (
                      <Card className="border-l1-border bg-l1-surface/70 backdrop-blur-md shadow-xl overflow-hidden font-mono text-xs">
                        <div className="flex items-center justify-between px-4 py-2.5 border-b border-l1-border/50 bg-l1-bg/70">
                          <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                            <span className="text-xs text-l1-text-muted font-sans ml-2">
                              {item.visual.fileName}
                            </span>
                          </div>
                          <span className="text-[10px] text-l1-secondary font-sans">
                            JSON Validated ✓
                          </span>
                        </div>
                        <div className="p-4 bg-[#090D16] text-[#A6ACCD] overflow-x-auto leading-relaxed">
                          <pre>{item.visual.snippet}</pre>
                        </div>
                      </Card>
                    )}

                    {/* Visual 4: Deployment options */}
                    {item.visual.type === "deploy" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {item.visual.options?.map((opt, i) => {
                          const OptIcon = opt.icon;
                          return (
                            <Card
                              key={i}
                              className="border-l1-border bg-l1-surface/70 hover:border-l1-primary/50 transition-all flex flex-col justify-between"
                            >
                              <CardHeader className="pb-3">
                                <div className="h-9 w-9 rounded-lg bg-l1-primary/10 flex items-center justify-center mb-2 text-l1-primary">
                                  <OptIcon className="h-5 w-5" />
                                </div>
                                <CardTitle className="text-base font-semibold text-l1-text">
                                  {opt.name}
                                </CardTitle>
                                <p className="text-xs text-l1-text-muted mt-1 leading-snug">
                                  {opt.desc}
                                </p>
                              </CardHeader>
                              <CardContent className="pt-0">
                                <ul className="space-y-1.5 border-t border-l1-border/40 pt-3 mb-4">
                                  {opt.bullets.map((b, bi) => (
                                    <li
                                      key={bi}
                                      className="flex items-center gap-1.5 text-xs text-l1-text-muted"
                                    >
                                      <CheckCircle2 className="h-3.5 w-3.5 text-l1-accent shrink-0" />
                                      <span>{b}</span>
                                    </li>
                                  ))}
                                </ul>
                                <span className="inline-block text-[11px] font-medium text-l1-secondary">
                                  {opt.action} &rarr;
                                </span>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </section>

        {/* Comparison: Before vs After L1Pilot */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <AnimatedSection>
            <SectionHeader
              title="The Difference L1Pilot Makes"
              description="Compare the traditional multi-week trial-and-error process with AI-guided Avalanche L1 generation."
              align="center"
            />
          </AnimatedSection>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Without L1Pilot */}
            <AnimatedSection delay={0.1}>
              <Card className="border-red-500/20 bg-l1-surface/40 h-full">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-red-400 flex items-center gap-2">
                    <span>Traditional Workflow (Without L1Pilot)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-l1-text-muted">
                  <p className="flex items-start gap-2.5">
                    <span className="text-red-400 font-bold">✕</span>
                    Reading hundreds of pages of documentation across subnets, precompiles, and Avalanche9000.
                  </p>
                  <p className="flex items-start gap-2.5">
                    <span className="text-red-400 font-bold">✕</span>
                    Manual JSON editing where a single wrong timestamp or parameter breaks the entire genesis block.
                  </p>
                  <p className="flex items-start gap-2.5">
                    <span className="text-red-400 font-bold">✕</span>
                    Unclear trade-offs between PoA permissioning and open validator staking.
                  </p>
                  <p className="flex items-start gap-2.5">
                    <span className="text-red-400 font-bold">✕</span>
                    Weeks of troubleshooting fee schedules and Teleporter cross-chain messaging setup.
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* With L1Pilot */}
            <AnimatedSection delay={0.2}>
              <Card className="border-l1-accent/40 bg-l1-surface/60 ring-1 ring-l1-accent/20 h-full">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-l1-accent flex items-center gap-2">
                    <span>The L1Pilot Experience</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-l1-text">
                  <p className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-l1-accent shrink-0 mt-0.5" />
                    Plain English conversational guidance tailored to your specific gaming, RWA, or DeFi use case.
                  </p>
                  <p className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-l1-accent shrink-0 mt-0.5" />
                    Auto-generated, fully validated genesis files with zero manual JSON syntax errors.
                  </p>
                  <p className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-l1-accent shrink-0 mt-0.5" />
                    Clear recommendations on validator count, tokenomics, and permissioning models.
                  </p>
                  <p className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-l1-accent shrink-0 mt-0.5" />
                    Ready-to-deploy configs you can plug straight into AvaCloud or run via Avalanche-CLI.
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="relative rounded-2xl border border-l1-border bg-gradient-to-r from-l1-surface/80 via-l1-surface to-l1-surface/80 p-8 sm:p-14 text-center overflow-hidden">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[500px] rounded-full bg-l1-primary/20 blur-[100px]" />
              </div>

              <div className="relative flex flex-col items-center gap-6 max-w-2xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-l1-text">
                  Ready to launch your Avalanche L1?
                </h2>
                <p className="text-base sm:text-lg text-l1-text-muted">
                  Start conversing with L1Pilot today and generate your verified genesis files in minutes.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <WaitlistButton
                    size="lg"
                    className="bg-l1-primary hover:bg-l1-primary-hover text-white px-8 h-12 shadow-lg shadow-l1-primary/25 cursor-pointer"
                  >
                    Try L1Pilot Free
                  </WaitlistButton>
                  <Link href="/faq">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-l1-border text-l1-text hover:bg-l1-surface h-12"
                    >
                      Read FAQ
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>
      </main>
    </div>
  );
}
