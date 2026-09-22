import { AnimatedSection } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { WaitlistButton } from "@/components/waitlist-button";
import { HeroFloatingIcons } from "@/components/hero-floating-icons";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  Settings, 
  Shield, 
  FileCode, 
  Server, 
  Coins, 
  Globe, 
  HelpCircle,
  CheckCircle,
  MessageSquare,
  Target,
  Download,
  User,
  Users,
  Cloud,
  BookOpen
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-l1-bg text-l1-text overflow-hidden relative">
      
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-l1-primary/20 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-[20%] -left-[200px] w-[500px] h-[500px] bg-l1-secondary/10 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-[20%] -right-[200px] w-[500px] h-[500px] bg-l1-primary/10 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse" />

      <main className="flex-1">
        
        {/* Section 1: Hero */}
        <AnimatedSection className="relative pt-24 pb-20 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <HeroFloatingIcons />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-l1-primary/20 via-transparent to-transparent -z-10" />
          <h1 className="relative z-20 font-heading text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white/95 to-white/75 drop-shadow-sm leading-[1.08]">
            Launch and Manage Avalanche L1s Faster with AI
          </h1>
          <p className="relative z-20 max-w-3xl mx-auto text-lg sm:text-xl text-l1-text-muted mb-10 leading-relaxed">
            L1Pilot is your intelligent assistant for creating, configuring, and operating Avalanche L1s. Get clear guidance, auto-generated configs, and expert help — whether you use AvaCloud or self-host.
          </p>
          <div className="relative z-20 flex flex-col sm:flex-row items-center justify-center gap-4">
            <WaitlistButton size="lg" className="bg-l1-primary hover:bg-l1-primary-hover text-white w-full sm:w-auto font-medium shadow-lg shadow-l1-primary/25 cursor-pointer">
              Try L1Pilot Free
            </WaitlistButton>
            <Link href="/how-it-works" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="border-l1-border text-l1-text hover:bg-l1-surface w-full sm:w-auto font-medium">
                See How It Works
              </Button>
            </Link>
          </div>
        </AnimatedSection>

        {/* Section 2: Problem */}
        <section id="problem" className="py-20 px-4 sm:px-6 lg:px-8 bg-l1-surface/30">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection>
              <SectionHeader 
                title="Creating an Avalanche L1 is Still Harder Than It Should Be" 
                description="Even after Avalanche9000, most builders still struggle with:"
                align="center"
              />
            </AnimatedSection>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 mb-12">
              {[
                { icon: Settings, text: "Confusing configuration options" },
                { icon: Shield, text: "Permissioned vs Permissionless decisions" },
                { icon: FileCode, text: "Genesis file setup" },
                { icon: Server, text: "Validator requirements" },
                { icon: Coins, text: "Fee and economic settings" },
                { icon: Globe, text: "Interoperability (Teleporter / ICM)" },
                { icon: HelpCircle, text: "Understanding what every parameter actually means" },
              ].map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <Card className="bg-l1-surface border-l1-border/50 h-full flex flex-col hover:border-l1-primary/30 transition-colors">
                    <CardHeader className="flex-row items-center gap-4 pb-2">
                      <div className="p-2 bg-l1-primary/10 rounded-lg shrink-0">
                        <item.icon className="w-5 h-5 text-l1-primary" />
                      </div>
                      <CardTitle className="text-base font-semibold leading-tight">{item.text}</CardTitle>
                    </CardHeader>
                  </Card>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={0.8} className="text-center max-w-3xl mx-auto">
              <p className="text-lg text-l1-text-muted bg-l1-surface/50 border border-l1-border p-6 rounded-2xl">
                AvaCloud makes deployment easier, but you still need to know what to configure. L1Pilot solves the knowledge and configuration problem with AI.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Section 3: Solution */}
        <section id="solution" className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection>
              <SectionHeader 
                badge="The Solution"
                title="Meet L1Pilot – Your AI Co-Pilot for Avalanche L1s" 
                align="center"
              />
            </AnimatedSection>

            <div className="mt-16 bg-l1-surface border border-l1-border rounded-3xl p-8 sm:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-l1-primary/10 blur-[80px] rounded-full pointer-events-none" />
              
              <div className="grid gap-6">
                {[
                  "Understand every option in plain English",
                  "Generate correct genesis and configuration files",
                  "Choose the right settings for gaming, RWA, DeFi, or enterprise use cases",
                  "Avoid costly mistakes",
                  "Move from idea to ready-to-deploy config much faster"
                ].map((benefit, i) => (
                  <AnimatedSection key={i} delay={i * 0.1} className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-l1-accent shrink-0 mt-0.5" />
                    <span className="text-lg sm:text-xl text-l1-text">{benefit}</span>
                  </AnimatedSection>
                ))}
              </div>

              <AnimatedSection delay={0.6} className="mt-12 pt-8 border-t border-l1-border/50">
                <p className="text-xl text-l1-secondary font-medium">
                  You stay in control. L1Pilot just makes the process smarter and clearer.
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Section 4: How It Works */}
        <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-l1-surface/30">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection>
              <SectionHeader 
                badge="Simple Process"
                title="How L1Pilot Works" 
                align="center"
              />
            </AnimatedSection>

            <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
              {[
                {
                  step: 1,
                  title: "Describe what you want",
                  desc: "Tell the AI: \"I want a gasless gaming L1\" or \"Create a permissioned chain for tokenized real-world assets\"",
                  icon: MessageSquare
                },
                {
                  step: 2,
                  title: "Get intelligent guidance",
                  desc: "The AI asks the right questions and explains every choice simply",
                  icon: HelpCircle
                },
                {
                  step: 3,
                  title: "Receive ready-to-use configs",
                  desc: "Get genesis files, recommended settings, and clear next steps",
                  icon: FileCode
                },
                {
                  step: 4,
                  title: "Deploy your way",
                  desc: "Use the output with AvaCloud or your own validators",
                  icon: Server
                }
              ].map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.15} className="flex gap-6 relative">
                  {i !== 3 && (
                    <div className="absolute left-6 top-16 bottom-[-3rem] w-px bg-l1-border hidden lg:block" />
                  )}
                  <div className="shrink-0 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-l1-primary/20 border border-l1-primary/50 flex items-center justify-center text-l1-primary font-bold text-lg shadow-[0_0_15px_rgba(124,58,237,0.3)] z-10 relative">
                      {item.step}
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="flex items-center gap-3 mb-3">
                      <item.icon className="w-5 h-5 text-l1-primary" />
                      <h3 className="text-xl font-semibold text-l1-text">{item.title}</h3>
                    </div>
                    <p className="text-l1-text-muted leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={0.6} className="mt-12 text-center">
              <Link href="/how-it-works">
                <Button variant="outline" className="border-l1-primary/40 hover:bg-l1-primary/10 text-l1-secondary">
                  Explore Full Step-by-Step Breakdown &rarr;
                </Button>
              </Link>
            </AnimatedSection>
          </div>
        </section>

        {/* Section 5: Features */}
        <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection>
              <SectionHeader 
                badge="Features"
                title="What You Can Do with L1Pilot" 
                align="center"
              />
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
              {[
                { title: "AI Chat", desc: "AI Chat that deeply understands Avalanche L1s", icon: MessageSquare },
                { title: "Config Generation", desc: "Automatic generation of genesis and configuration files", icon: FileCode },
                { title: "Permission Models", desc: "Clear explanations of Permissioned (PoA) vs Permissionless", icon: Shield },
                { title: "Use Case Recs", desc: "Recommendations based on your use case (Gaming, RWA, DeFi, Enterprise)", icon: Target },
                { title: "Fee Guidance", desc: "Fee structure and economic guidance", icon: Coins },
                { title: "Interoperability", desc: "Interoperability (Teleporter/ICM) setup help", icon: Globe },
                { title: "Export Ready", desc: "Export-ready files you can use immediately", icon: Download },
              ].map((feat, i) => (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <Card className="bg-l1-surface border-l1-border hover:border-l1-primary/50 transition-all duration-300 h-full group">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-l1-primary/10 flex items-center justify-center mb-4 group-hover:bg-l1-primary/20 transition-colors">
                        <feat.icon className="w-6 h-6 text-l1-primary" />
                      </div>
                      <CardTitle className="text-xl">{feat.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-l1-text-muted">{feat.desc}</p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: Who Is It For */}
        <section id="who-is-it-for" className="py-24 px-4 sm:px-6 lg:px-8 bg-l1-surface/30">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection>
              <SectionHeader 
                title="Built for Avalanche Builders" 
                align="center"
              />
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 justify-center">
              {[
                { icon: User, text: "Solo developers launching their first L1" },
                { icon: Users, text: "Teams that want to move faster" },
                { icon: Cloud, text: "Projects using AvaCloud who want smarter configuration" },
                { icon: Server, text: "Builders who prefer self-hosting but need guidance" },
                { icon: BookOpen, text: "Anyone tired of reading endless documentation" }
              ].map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.1} className={i === 3 ? "lg:col-start-1 lg:ml-auto lg:mr-0 w-full lg:w-[calc(150%)]" : i === 4 ? "lg:col-start-3 lg:mr-auto lg:ml-0 w-full lg:w-[calc(150%)] -translate-x-1/3" : ""}>
                  <Card className="bg-l1-surface border-l1-border text-center hover:bg-l1-surface/80 transition-colors h-full flex flex-col items-center p-6">
                    <div className="p-3 bg-l1-secondary/10 rounded-full mb-4">
                      <item.icon className="w-6 h-6 text-l1-secondary" />
                    </div>
                    <p className="font-medium text-lg">{item.text}</p>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7: Pricing */}
        <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection>
              <SectionHeader 
                title="Start Free. Upgrade When You're Ready." 
                align="center"
              />
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
              {/* Free Plan */}
              <AnimatedSection delay={0.1}>
                <Card className="bg-l1-surface border-l1-border h-full flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 w-full h-1 bg-l1-text-muted/30" />
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">Free Plan</CardTitle>
                    <CardDescription className="text-l1-text-muted mt-2 text-base">Perfect for getting started and exploring options.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-4">
                      {["AI Chat (limited)", "Basic configuration generator", "Core explanations"].map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-l1-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <div className="p-6 pt-0 mt-auto">
                    <WaitlistButton className="w-full bg-l1-primary hover:bg-l1-primary-hover text-white cursor-pointer">
                      Get Started Free
                    </WaitlistButton>
                  </div>
                </Card>
              </AnimatedSection>

              {/* Pro Plan */}
              <AnimatedSection delay={0.2}>
                <Card className="bg-l1-surface border-l1-primary/50 shadow-[0_0_30px_rgba(124,58,237,0.1)] h-full flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-l1-primary to-l1-secondary" />
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl font-bold">Pro Plan</CardTitle>
                      <Badge variant="secondary" className="bg-l1-primary/20 text-l1-primary hover:bg-l1-primary/30 border-none">
                        Coming Soon
                      </Badge>
                    </div>
                    <CardDescription className="text-l1-text-muted mt-2 text-base">For serious teams ready to launch to mainnet.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-4">
                      {["Unlimited AI usage", "Advanced config generation", "Priority responses", "Team features", "Full monitoring tools (future)"].map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-l1-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <div className="p-6 pt-0 mt-auto">
                    <WaitlistButton variant="outline" className="w-full border-l1-primary/50 hover:bg-l1-primary/10 text-l1-text cursor-pointer">
                      Join Waitlist
                    </WaitlistButton>
                  </div>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Section 8: Final CTA */}
        <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-l1-bg via-l1-primary/10 to-l1-bg -z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[300px] bg-l1-secondary/10 blur-[100px] rounded-full pointer-events-none -z-10" />
          
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70">
                Stop guessing. Start building smarter.
              </h2>
              <p className="text-xl text-l1-text-muted mb-10 max-w-2xl mx-auto">
                Join the builders who are launching Avalanche L1s with confidence.
              </p>
              <WaitlistButton size="lg" className="bg-l1-primary hover:bg-l1-primary-hover text-white text-lg h-14 px-8 rounded-full shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all cursor-pointer">
                Get Early Access to L1Pilot
              </WaitlistButton>
            </AnimatedSection>
          </div>
        </section>
        
      </main>
    </div>
  );
}
