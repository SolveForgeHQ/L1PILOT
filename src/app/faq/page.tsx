import type { Metadata } from "next";
import Link from "next/link";
import {
  HelpCircle,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cloud,
  CheckCircle2,
  Terminal,
} from "lucide-react";

import { AnimatedSection } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { WaitlistButton } from "@/components/waitlist-button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find clear answers to common questions about L1Pilot, Avalanche L1s, AvaCloud integration, validator hosting, and permission models.",
};

const faqList = [
  {
    id: "item-1",
    category: "General",
    question: "What is L1Pilot?",
    answer:
      "L1Pilot is an intelligent, AI-powered platform designed specifically for the Avalanche ecosystem. It helps builders, startups, and enterprises easily create, configure, and manage Avalanche L1s (formerly known as subnets). By combining deep knowledge of Avalanche architecture with conversational AI, L1Pilot explains complex parameters in plain English and automatically generates production-ready genesis and configuration files.",
  },
  {
    id: "item-2",
    category: "Deployment",
    question: "Does L1Pilot create the L1 for me?",
    answer:
      "L1Pilot acts as your configuration and knowledge co-pilot rather than an automated blockchain deployer. It generates the exact, validated genesis and node configuration files you need, advises you on tokenomics, fee structures, and validator settings, and gives you clear next steps. You can deploy the generated configuration seamlessly through AvaCloud or self-host using Avalanche-CLI.",
  },
  {
    id: "item-3",
    category: "AvaCloud",
    question: "Does L1Pilot replace AvaCloud?",
    answer:
      "No, L1Pilot complements AvaCloud perfectly! AvaCloud is Ava Labs' premier managed infrastructure platform for deploying and hosting nodes. However, when you use AvaCloud, you still need to decide on dozens of critical parameters: EVM rules, gas schedules, permissioning models, and precompiles. L1Pilot solves this knowledge bottleneck by helping you configure everything accurately before deployment, making your AvaCloud setup fast and error-free.",
  },
  {
    id: "item-4",
    category: "Infrastructure",
    question: "Do I need to run validators myself?",
    answer:
      "Not necessarily. You have two flexible deployment paths:\n\n• Managed with AvaCloud: AvaCloud provisions and maintains enterprise-grade validator nodes for you, requiring zero server maintenance.\n• Self-Hosted: If you prefer complete sovereignty, L1Pilot generates the CLI commands and Docker instructions to set up, stake, and run your own validator nodes on AWS, GCP, or bare metal.",
  },
  {
    id: "item-5",
    category: "Pricing",
    question: "Is L1Pilot free?",
    answer:
      "Yes! L1Pilot offers a comprehensive Free Plan that includes access to the AI Chat, basic configuration generation, and core explanations of Avalanche L1 concepts with no credit card required. For teams needing unlimited AI conversations, advanced multi-chain validation, and priority support, we will be launching our Pro Plan with early bird pricing.",
  },
  {
    id: "item-6",
    category: "Architecture",
    question: "What is the difference between Permissioned and Permissionless L1?",
    answer:
      "• Permissioned (Proof of Authority / PoA): Only approved, KYC'd validator nodes and contract deployers can participate in consensus or deploy code. This model is optimal for enterprise consortiums, regulated financial institutions, and Real-World Asset (RWA) compliance.\n\n• Permissionless (Proof of Stake / PoS): Anyone who stakes the required tokens (e.g., AVAX or custom native tokens) can become a validator, and smart contract deployment is open to the public. This model is ideal for public DeFi protocols, gaming communities, and open Web3 applications.\n\nL1Pilot helps you choose and configure the right model for your project.",
  },
  {
    id: "item-7",
    category: "AvaCloud",
    question: "Can I use L1Pilot with AvaCloud?",
    answer:
      "Yes, absolutely! L1Pilot is designed to integrate smoothly with AvaCloud. Once you finish configuring your L1 through L1Pilot's guided conversation, you can export your settings into an AvaCloud-ready format, making the deployment in the AvaCloud console fast and error-free.",
  },
  {
    id: "item-8",
    category: "General",
    question: "Do I need coding knowledge to use L1Pilot?",
    answer:
      "No coding background is required. L1Pilot is built specifically to bridge the gap between business ideas and blockchain engineering. You can describe your requirements in everyday English (e.g., 'I want a zero-fee gaming chain with fast finality'), and L1Pilot will ask the right questions and configure the technical parameters automatically. For developers, L1Pilot also provides full JSON and CLI exports for deep customization.",
  },
];

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen bg-l1-bg text-l1-text relative overflow-hidden">
      {/* Background Orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/3 h-[500px] w-[700px] rounded-full bg-l1-primary/15 blur-[140px]" />
        <div className="absolute right-0 top-1/2 h-[400px] w-[400px] rounded-full bg-l1-secondary/10 blur-[120px]" />
      </div>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-20 pb-12 sm:pt-28 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <AnimatedSection>
            <SectionHeader
              badge="FAQ"
              title="Frequently Asked Questions"
              description="Everything you need to know about L1Pilot, Avalanche L1s, AvaCloud compatibility, and blockchain deployment."
              align="center"
            />
          </AnimatedSection>
        </section>

        {/* Highlights Cards (3 key takeaways) */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-l1-border/70 bg-l1-surface/60 backdrop-blur-sm p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-8 w-8 rounded-lg bg-l1-primary/10 flex items-center justify-center text-l1-primary">
                  <Sparkles className="h-4 w-4" />
                </div>
                <h3 className="font-semibold text-sm text-l1-text">No Coding Needed</h3>
              </div>
              <p className="text-xs text-l1-text-muted leading-relaxed">
                Describe your L1 in plain English. L1Pilot handles parameters, genesis files, and architecture.
              </p>
            </Card>

            <Card className="border-l1-border/70 bg-l1-surface/60 backdrop-blur-sm p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-8 w-8 rounded-lg bg-l1-secondary/10 flex items-center justify-center text-l1-secondary">
                  <Cloud className="h-4 w-4" />
                </div>
                <h3 className="font-semibold text-sm text-l1-text">AvaCloud & Self-Host</h3>
              </div>
              <p className="text-xs text-l1-text-muted leading-relaxed">
                Works seamlessly with AvaCloud managed infrastructure or your own sovereign validator nodes.
              </p>
            </Card>

            <Card className="border-l1-border/70 bg-l1-surface/60 backdrop-blur-sm p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-8 w-8 rounded-lg bg-l1-accent/10 flex items-center justify-center text-l1-accent">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <h3 className="font-semibold text-sm text-l1-text">Free to Start</h3>
              </div>
              <p className="text-xs text-l1-text-muted leading-relaxed">
                Free plan gives you immediate access to AI guidance and configuration generation.
              </p>
            </Card>
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="rounded-2xl border border-l1-border bg-l1-surface/70 backdrop-blur-md p-6 sm:p-10 shadow-2xl">
              <Accordion className="space-y-4">
                {faqList.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
                    className="border border-l1-border/50 rounded-xl px-5 py-2 bg-l1-bg/40 data-open:bg-l1-bg/70 data-open:border-l1-primary/40 transition-colors"
                  >
                    <AccordionTrigger className="hover:no-underline py-3 text-left">
                      <div className="flex items-center gap-3 text-left pr-4">
                        <Badge
                          variant="secondary"
                          className="bg-l1-surface text-[10px] font-mono text-l1-secondary border-none shrink-0"
                        >
                          {faq.category}
                        </Badge>
                        <span className="text-base sm:text-lg font-semibold text-l1-text">
                          {faq.question}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm sm:text-base text-l1-text-muted leading-relaxed pt-2 pb-4 whitespace-pre-line">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </AnimatedSection>

          {/* Bottom Help Card */}
          <AnimatedSection delay={0.2} className="mt-14">
            <div className="rounded-2xl border border-l1-border bg-l1-surface/40 p-8 text-center flex flex-col items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-l1-primary/10 flex items-center justify-center text-l1-primary">
                <HelpCircle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-l1-text">
                Have a question that isn&apos;t covered here?
              </h3>
              <p className="text-sm text-l1-text-muted max-w-md">
                Our AI assistant can answer questions specific to your Avalanche L1 architecture, or you can get in touch with our team.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
                <WaitlistButton className="bg-l1-primary hover:bg-l1-primary-hover text-white shadow-lg shadow-l1-primary/25 cursor-pointer">
                  Try L1Pilot Free
                </WaitlistButton>
                <Link href="/how-it-works">
                  <Button variant="outline" className="border-l1-border text-l1-text hover:bg-l1-surface">
                    See How It Works
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </section>
      </main>
    </div>
  );
}
