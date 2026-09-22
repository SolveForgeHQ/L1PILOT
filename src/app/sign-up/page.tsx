import type { Metadata } from "next";
import { SupabaseAuthForm } from "@/components/auth/supabase-auth-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign up to start building Avalanche L1s with AI on L1Pilot.",
};

export default function SignUpPage() {
  return (
    <div className="relative min-h-[calc(100vh-12rem)] flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[650px] rounded-full bg-l1-primary/20 blur-[140px]" />
        <div className="absolute bottom-10 right-1/4 h-[350px] w-[350px] rounded-full bg-l1-secondary/15 blur-[120px]" />
      </div>

      <SupabaseAuthForm mode="sign-up" />
    </div>
  );
}
