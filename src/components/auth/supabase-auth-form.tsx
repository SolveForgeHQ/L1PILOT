"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Rocket,
  Mail,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

interface SupabaseAuthFormProps {
  mode: "sign-in" | "sign-up";
}

export function SupabaseAuthForm({ mode }: SupabaseAuthFormProps) {
  const isSignUp = mode === "sign-up";
  const [email, setEmail] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const supabase = createClient();

  const handleGoogleAuth = async () => {
    try {
      setIsGoogleLoading(true);
      setErrorMessage(null);
      const redirectTo = `${window.location.origin}/auth/callback?next=/dashboard`;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
        setIsGoogleLoading(false);
      }
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Failed to connect with Google");
      setIsGoogleLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      setIsLoading(true);
      setErrorMessage(null);

      const emailRedirectTo = `${window.location.origin}/auth/callback?next=/dashboard`;

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo,
          shouldCreateUser: true,
        },
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        setIsSuccess(true);
      }
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Failed to send magic link");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md relative">
      {/* Main Glassmorphic Auth Card */}
      <div className="rounded-2xl border border-white/10 bg-[#1E293B]/80 backdrop-blur-2xl p-7 sm:p-9 text-l1-text shadow-2xl shadow-black/50 ring-1 ring-white/5 relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="pointer-events-none absolute -top-24 -left-20 h-48 w-48 rounded-full bg-l1-primary/25 blur-[70px]" />
        <div className="pointer-events-none absolute -top-24 -right-20 h-48 w-48 rounded-full bg-l1-secondary/20 blur-[70px]" />

        {/* Back to Home Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-l1-text-muted hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to home</span>
          </Link>
        </div>

        {/* Logo & Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-3 cursor-pointer group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-l1-primary shadow-md shadow-l1-primary/30 group-hover:scale-105 transition-transform">
              <Rocket className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">L1Pilot</span>
          </Link>

          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {isSignUp ? "Create your account" : "Welcome to L1Pilot"}
          </h1>
          <p className="text-sm text-l1-text-muted mt-2 leading-relaxed">
            {isSignUp
              ? "Start building, configuring, and deploying Avalanche L1s with AI"
              : "Sign in to start building Avalanche L1s with AI"}
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-xs flex items-start gap-2.5">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
            <div className="flex-1 leading-relaxed">{errorMessage}</div>
          </div>
        )}

        {/* Success State (Magic Link Sent) */}
        {isSuccess ? (
          <div className="py-4 text-center animate-in zoom-in-95 duration-200">
            <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-2xl bg-l1-accent/20 border border-l1-accent/40 text-l1-accent mb-4 shadow-lg shadow-l1-accent/20">
              <CheckCircle2 className="h-7 w-7" />
            </div>

            <h2 className="font-heading text-xl font-bold text-white mb-2">
              Check your inbox!
            </h2>
            <p className="text-sm text-l1-text-muted mb-2">
              We sent a magic sign-in link to:
            </p>
            <p className="text-sm font-semibold text-l1-secondary bg-l1-surface/90 py-1.5 px-3 rounded-lg border border-white/5 inline-block mb-6 max-w-full truncate">
              {email}
            </p>

            <div className="space-y-3">
              <Button
                type="button"
                onClick={handleMagicLink}
                disabled={isLoading}
                variant="outline"
                className="w-full h-11 rounded-xl border-white/10 hover:bg-white/5 text-white cursor-pointer"
              >
                {isLoading ? "Resending link..." : "Resend magic link"}
              </Button>

              <button
                type="button"
                onClick={() => {
                  setIsSuccess(false);
                  setEmail("");
                  setShowEmailForm(false);
                }}
                className="text-xs text-l1-text-muted hover:text-white transition-colors cursor-pointer"
              >
                Use a different email address
              </button>
            </div>
          </div>
        ) : (
          /* Authentication Options */
          <div className="space-y-4">
            {/* Option 1: Continue with Google */}
            <Button
              type="button"
              onClick={handleGoogleAuth}
              disabled={isGoogleLoading}
              className="w-full h-12 rounded-xl bg-white hover:bg-zinc-100 text-zinc-900 font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              {isGoogleLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-zinc-400 border-t-zinc-900 rounded-full animate-spin" />
                  Connecting to Google...
                </span>
              ) : (
                <>
                  <svg className="h-4.5 w-4.5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </>
              )}
            </Button>

            {!showEmailForm ? (
              /* Option 2: Reveal Email input */
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowEmailForm(true)}
                className="w-full h-12 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Mail className="h-4.5 w-4.5 text-l1-secondary" />
                <span>Continue with Email</span>
              </Button>
            ) : (
              /* Email / Magic Link Form */
              <form
                onSubmit={handleMagicLink}
                className="pt-2 space-y-3.5 animate-in fade-in duration-200"
              >
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#1E293B] px-3 text-l1-text-muted">
                      Or magic link email
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white mb-1.5">
                    Email address
                  </label>
                  <Input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#0F172A]/80 border-white/10 text-white placeholder:text-l1-text-muted/60 h-11 rounded-xl"
                    autoFocus
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl bg-l1-primary hover:bg-l1-primary-hover text-white font-semibold text-sm shadow-lg shadow-l1-primary/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending magic link...
                    </span>
                  ) : (
                    <>
                      <span>Send Magic Link</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>

                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => setShowEmailForm(false)}
                    className="text-xs text-l1-text-muted hover:text-white transition-colors cursor-pointer"
                  >
                    Hide email form
                  </button>
                </div>
              </form>
            )}

            {/* Mode Switcher */}
            <div className="pt-2 text-center text-xs text-l1-text-muted">
              {isSignUp ? (
                <p>
                  Already have an account?{" "}
                  <Link
                    href="/sign-in"
                    className="text-l1-secondary hover:text-sky-300 font-semibold cursor-pointer"
                  >
                    Sign in
                  </Link>
                </p>
              ) : (
                <p>
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/sign-up"
                    className="text-l1-secondary hover:text-sky-300 font-semibold cursor-pointer"
                  >
                    Sign up
                  </Link>
                </p>
              )}
            </div>

            {/* Terms of Service & Privacy Policy */}
            <p className="text-[11px] text-center text-l1-text-muted/80 leading-relaxed pt-4 border-t border-white/5">
              By continuing, you agree to our{" "}
              <Link href="#" className="underline underline-offset-2 hover:text-white">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="underline underline-offset-2 hover:text-white">
                Privacy Policy
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
