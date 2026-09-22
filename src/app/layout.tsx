import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LayoutMain } from "@/components/layout-wrapper";
import { WaitlistProvider } from "@/components/waitlist-context";
import { AuthProvider } from "@/components/auth-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "L1Pilot — AI-Powered Avalanche L1 Management",
    template: "%s | L1Pilot",
  },
  description:
    "L1Pilot is your intelligent assistant for creating, configuring, and operating Avalanche L1s. Get clear guidance, auto-generated configs, and expert help.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-l1-bg text-l1-text font-sans selection:bg-l1-primary/30 selection:text-white">
        <AuthProvider>
          <WaitlistProvider>
            <Navbar />
            <LayoutMain>{children}</LayoutMain>
            <Footer />
          </WaitlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

