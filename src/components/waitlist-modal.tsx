"use client";

import { useState, useEffect } from "react";
import { X, Rocket, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate short network request
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setEmail("");
    setName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={handleReset}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-lg rounded-2xl border border-white/15 bg-[#1E293B] p-6 sm:p-8 text-l1-text shadow-2xl shadow-black/60 ring-1 ring-white/10 transition-all animate-in zoom-in-95 duration-200 overflow-hidden"
      >
        {/* Ambient Top Glow Orbs */}
        <div className="pointer-events-none absolute -top-24 -left-20 h-48 w-48 rounded-full bg-l1-primary/30 blur-[80px]" />
        <div className="pointer-events-none absolute -top-24 -right-20 h-48 w-48 rounded-full bg-l1-secondary/20 blur-[80px]" />

        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-xl text-l1-text-muted hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header Badge & Title */}
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-l1-primary/20 border border-l1-primary/40 text-l1-primary">
                <Rocket className="h-4.5 w-4.5" />
              </div>
              <span className="text-xs font-semibold tracking-wider text-l1-secondary uppercase">
                Early Access
              </span>
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
              Join the L1Pilot Waitlist
            </h2>

            <p className="text-sm sm:text-base text-l1-text-muted leading-relaxed mb-6">
              Be the first to know when we launch. Get early access to the AI-powered Avalanche L1 assistant.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-l1-text mb-1.5">
                  Email Address <span className="text-l1-secondary">*</span>
                </label>
                <Input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#0F172A]/80 border-white/10 text-white placeholder:text-l1-text-muted/60"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-l1-text mb-1.5">
                  Your Name <span className="text-l1-text-muted font-normal">(optional)</span>
                </label>
                <Input
                  type="text"
                  placeholder="e.g. Alex Rivera"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-[#0F172A]/80 border-white/10 text-white placeholder:text-l1-text-muted/60"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl bg-l1-primary hover:bg-l1-primary-hover text-white font-semibold text-base shadow-lg shadow-l1-primary/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Reserving spot...
                    </span>
                  ) : (
                    <>
                      <span>Join Waitlist</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>

              <p className="text-[11px] text-center text-l1-text-muted/80 pt-1">
                Zero spam. We only notify you when early access seats open.
              </p>
            </form>
          </div>
        ) : (
          /* Success State */
          <div className="py-6 sm:py-8 flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-l1-accent/20 border border-l1-accent/40 text-l1-accent mb-5 shadow-lg shadow-l1-accent/20">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <h3 className="font-heading text-2xl font-bold text-white mb-2">
              You&apos;re on the list!
            </h3>

            <p className="text-base text-l1-text-muted max-w-xs mb-8 leading-relaxed">
              We&apos;ll notify you when L1Pilot is ready.
            </p>

            <Button
              onClick={handleReset}
              className="h-11 px-8 rounded-xl bg-l1-surface border border-white/10 hover:bg-white/5 text-white font-medium cursor-pointer"
            >
              Back to site
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
