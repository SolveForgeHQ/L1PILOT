import type { Metadata } from "next";
import { CheckCircle, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

import { AnimatedSection } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { WaitlistButton } from "@/components/waitlist-button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Start free with L1Pilot. Upgrade to Pro for unlimited AI usage, advanced config generation, and team features.",
};

const freePlanFeatures = [
  "AI chat for Avalanche L1 configuration (limited)",
  "Basic Genesis and Config file generation",
  "Clear explanations of key settings (Permissioned vs Permissionless, fees, etc.)",
  "Basic use-case guidance (Gaming, DeFi, RWA, Enterprise)",
  "Download generated files",
  "Limited saved configurations",
  "Limited chat history",
] as const;

const proPlanFeatures = [
  "Unlimited AI usage",
  "Advanced configuration generation",
  "More templates",
  "Priority responses",
  "Full history and saved projects",
] as const;

const faqs = [
  {
    question: "What is L1Pilot?",
    answer:
      "L1Pilot is an AI-powered platform that helps you create, configure, and manage Avalanche L1s (formerly known as subnets). It provides intelligent guidance, auto-generates configuration files, and explains complex concepts in plain English.",
  },
  {
    question: "Do I need to be technical to use L1Pilot?",
    answer:
      "Not at all. L1Pilot is designed to make Avalanche L1 creation accessible to everyone. The AI explains every option clearly and guides you through the process step by step.",
  },
  {
    question: "Does L1Pilot deploy my L1 for me?",
    answer:
      "Not yet. Currently, L1Pilot helps you generate the right configurations and understand your options. You can then use these configs with AvaCloud or your own validators to deploy. Direct deployment integration is on our roadmap.",
  },
  {
    question:
      "What\u2019s the difference between AvaCloud and L1Pilot?",
    answer:
      "AvaCloud is Avalanche\u2019s managed deployment platform. L1Pilot is an AI assistant that helps you understand and configure your L1. They work great together \u2014 use L1Pilot to design your config, then deploy it through AvaCloud.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. We don\u2019t store your configuration files or chain data. All AI conversations are encrypted and we never share your information with third parties.",
  },
  {
    question: "When will Pro be available?",
    answer:
      "We\u2019re currently in early access. Pro features will roll out gradually. Join the waitlist to be notified and lock in early bird pricing.",
  },
] as const;

export default function PricingPage() {
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
              title="Start Free. Upgrade When You're Ready."
              description="No credit card required. Start building your Avalanche L1 today."
              align="center"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 sm:pb-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Free Plan */}
            <AnimatedSection delay={0}>
              <Card className="h-full border-l1-border bg-l1-surface/60 backdrop-blur-sm flex flex-col justify-between [--card-spacing:--spacing(6)]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-l1-text">
                      Free Plan
                    </CardTitle>
                    <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                      Active Free Tier
                    </Badge>
                  </div>
                  <CardDescription className="text-l1-text-muted">
                    Perfect for getting started and designing your L1
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col gap-6 flex-1">
                  {/* Price & Usage Limit Label */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold tracking-tight text-l1-text">
                        $0
                      </span>
                      <span className="text-lg text-l1-text-muted">/month</span>
                    </div>

                    {/* Free limit / usage label */}
                    <div className="rounded-xl border border-violet-500/20 bg-violet-500/10 p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-300 shrink-0">
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white">Daily Free Limit</p>
                          <p className="text-[11px] text-violet-200/90 font-medium">5 AI conversations per day</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">
                        Included
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="flex flex-col gap-3">
                    {freePlanFeatures.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                        <span className="text-sm text-l1-text-muted leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="mt-auto pt-4">
                    <Link href="/chat" className="w-full block">
                      <Button
                        size="lg"
                        className="w-full bg-l1-primary hover:bg-l1-primary-hover text-white cursor-pointer shadow-lg shadow-l1-primary/25 font-semibold"
                      >
                        Start Building Free
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Pro Plan */}
            <AnimatedSection delay={0.1}>
              <Card className="relative h-full border-l1-primary/50 bg-l1-surface/60 backdrop-blur-sm ring-1 ring-l1-primary/30 flex flex-col justify-between [--card-spacing:--spacing(6)]">
                {/* Subtle glow behind the card */}
                <div className="pointer-events-none absolute -inset-px rounded-xl bg-l1-primary/5" />

                <CardHeader className="relative">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-l1-text">
                      Pro Plan
                    </CardTitle>
                    <Badge className="border-l1-primary/30 bg-l1-primary/20 text-violet-300 text-xs font-semibold">
                      Coming Soon
                    </Badge>
                  </div>
                  <CardDescription className="text-l1-text-muted">
                    For serious builders, ecosystems, and teams
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative flex flex-col gap-6 flex-1">
                  {/* Price & Highlight */}
                  <div className="flex flex-col gap-3">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-bold tracking-tight text-l1-text">
                          $49
                        </span>
                        <span className="text-lg text-l1-text-muted">
                          /month
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-l1-primary font-medium">
                        (Early bird pricing on launch)
                      </p>
                    </div>

                    {/* Pro tier highlight */}
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3 flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-l1-primary/20 flex items-center justify-center text-l1-primary shrink-0">
                        <Zap className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white">Full Production Suite</p>
                        <p className="text-[11px] text-l1-text-muted">Uncapped generations & team tooling</p>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="flex flex-col gap-3">
                    {proPlanFeatures.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-l1-primary" />
                        <span className="text-sm text-l1-text-muted leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="mt-auto pt-4">
                    <WaitlistButton
                      variant="outline"
                      size="lg"
                      className="w-full border-l1-primary/50 text-l1-primary hover:bg-l1-primary/10 hover:text-l1-primary cursor-pointer font-semibold"
                    >
                      Join Pro Waitlist
                    </WaitlistButton>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="py-16 sm:py-24 border-t border-l1-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              title="Frequently Asked Questions"
              align="center"
              className="mb-12"
            />
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <Accordion className="divide-y divide-l1-border">
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.question}
                  className="border-none py-2"
                >
                  <AccordionTrigger className="text-base font-semibold text-l1-text hover:no-underline hover:text-l1-primary py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-l1-text-muted leading-relaxed">
                    <p>{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedSection>
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
                  Still have questions?
                </h2>
                <p className="text-l1-text-muted max-w-md">
                  We&apos;re happy to help. Reach out and we&apos;ll get back to
                  you as soon as possible.
                </p>
                <Link href="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-l1-primary/50 text-l1-primary hover:bg-l1-primary/10 hover:text-l1-primary"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
