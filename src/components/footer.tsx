"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Rocket } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/faq", label: "FAQ" },
  { href: "/pricing", label: "Pricing" },
];

const secondaryLinks = [
  { href: "/features", label: "Features" },
  { href: "/about", label: "About" },
  { href: "#", label: "Documentation" },
  { href: "https://docs.avax.network", label: "Avalanche Docs" },
];

export function Footer() {
  const pathname = usePathname();
  if (pathname === "/chat" || pathname?.startsWith("/dashboard")) return null;

  return (


    <footer className="border-t border-l1-border/50 bg-l1-bg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="flex flex-col gap-4 sm:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 w-fit">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0B0D17] border border-l1-primary/30 overflow-hidden">
                <img
                  src="/robot-avatar.jpg"
                  alt="L1Pilot Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-xl font-bold text-l1-text">L1Pilot</span>
            </Link>
            <p className="text-sm font-medium text-l1-secondary">
              AI-powered assistant for Avalanche L1s
            </p>
            <p className="text-sm text-l1-text-muted leading-relaxed max-w-md">
              Built for the Avalanche ecosystem. Get clear guidance, auto-generated configs, and expert help — whether you use AvaCloud or self-host.
            </p>
            
            {/* Social Placeholders */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-l1-border bg-l1-surface/60 text-l1-text-muted hover:border-l1-primary/60 hover:text-l1-text hover:bg-l1-surface transition-colors text-sm font-semibold"
                aria-label="X (Twitter)"
              >
                𝕏
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-l1-border bg-l1-surface/60 text-l1-text-muted hover:border-l1-primary/60 hover:text-l1-text hover:bg-l1-surface transition-colors"
                aria-label="Discord"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-l1-border bg-l1-surface/60 text-l1-text-muted hover:border-l1-primary/60 hover:text-l1-text hover:bg-l1-surface transition-colors"
                aria-label="GitHub"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links column */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-l1-text">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-l1-text-muted transition-colors hover:text-l1-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore column */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-l1-text">
              Resources
            </h3>
            <ul className="flex flex-col gap-2.5">
              {secondaryLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-l1-text-muted transition-colors hover:text-l1-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-l1-border/50" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-l1-text-muted text-center sm:text-left">
            &copy; 2026 L1Pilot. Built for the Avalanche ecosystem.
          </p>
          <div className="flex gap-6">
            <Link
              href="/faq"
              className="text-xs text-l1-text-muted hover:text-l1-text transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/about"
              className="text-xs text-l1-text-muted hover:text-l1-text transition-colors"
            >
              About
            </Link>
            <Link
              href="#"
              className="text-xs text-l1-text-muted hover:text-l1-text transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs text-l1-text-muted hover:text-l1-text transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
