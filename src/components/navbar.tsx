"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, Rocket, LogOut, FileCode, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAuth } from "@/components/auth-provider";
import { useWaitlistModal } from "@/components/waitlist-context";

const navLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const { openWaitlist } = useWaitlistModal();
  const { user, isLoading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Close user dropdown menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Completely hide Navbar on /chat route
  if (pathname === "/chat") {
    return null;
  }

  function navigate(href: string) {
    setIsOpen(false);
    router.push(href);
  }

  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isSignedIn = !isLoading && !!user;
  // Prevent logged-in state flicker on dashboard or during auth loading
  const showLoggedInState = isSignedIn || (isLoading && isDashboardRoute);
  const showLoggedOutState = !showLoggedInState && !isLoading;

  const userInitial = (
    user?.user_metadata?.full_name?.[0] ||
    user?.email?.[0] ||
    "U"
  ).toUpperCase();
  const avatarUrl =
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture ||
    null;

  return (
    <header className="fixed top-6 inset-x-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
      <nav className="pointer-events-auto w-full max-w-5xl h-16 flex items-center justify-between px-4 sm:px-6 rounded-2xl border border-white/10 bg-l1-bg/75 backdrop-blur-xl shadow-2xl shadow-black/40 ring-1 ring-white/5 transition-all">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0B0D17] border border-l1-primary/30 shadow-md shadow-l1-primary/30 group-hover:scale-105 transition-transform overflow-hidden">
            <img
              src="/robot-avatar.jpg"
              alt="L1Pilot Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-l1-text group-hover:text-l1-primary transition-colors">
            L1Pilot
          </span>
        </Link>

        {/* Desktop Nav Links (Only shown when NOT logged in and auth check finished) */}
        {showLoggedOutState && (
          <div className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 text-sm font-medium text-l1-text-muted transition-all hover:text-white rounded-xl hover:bg-white/5 cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {/* Desktop Action Buttons (Right) */}
        <div className="hidden md:flex items-center gap-2.5">
          {showLoggedOutState ? (
            <>
              <Button
                render={<Link href="/sign-in" />}
                variant="ghost"
                className="text-sm font-medium text-l1-text-muted hover:text-white rounded-xl h-10 px-4 cursor-pointer"
              >
                Sign In
              </Button>
              <Button
                onClick={openWaitlist}
                className="h-10 px-5 rounded-xl bg-l1-primary hover:bg-l1-primary-hover text-white text-sm font-medium shadow-md shadow-l1-primary/25 cursor-pointer"
              >
                Try L1Pilot Free
              </Button>
            </>
          ) : isLoading ? (
            /* Loading State Avatar Skeleton */
            <div className="h-9 w-9 rounded-xl bg-white/10 animate-pulse" />
          ) : (
            /* User Avatar Dropdown (Shown when signed in) */
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="h-9 w-9 rounded-xl bg-gradient-to-br from-l1-primary to-violet-700 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-l1-primary/20 border border-l1-primary/30 hover:scale-105 transition-transform cursor-pointer outline-none overflow-hidden"
                aria-label="User menu"
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="User"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  userInitial
                )}
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2.5 w-56 rounded-xl border border-white/10 bg-[#1E293B] backdrop-blur-2xl p-1.5 shadow-2xl z-50 animate-in fade-in-0 zoom-in-95">
                  {user?.email && (
                    <div className="px-3 py-2 text-xs font-medium text-l1-text-muted truncate border-b border-white/10 mb-1">
                      {user.email}
                    </div>
                  )}
                  <Link
                    href="/dashboard"
                    onClick={() => setUserMenuOpen(false)}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-slate-200 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <LayoutDashboard className="h-3.5 w-3.5 text-l1-primary" />
                    Dashboard
                  </Link>
                  <Link
                    href="/configurations"
                    onClick={() => setUserMenuOpen(false)}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-slate-200 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <FileCode className="h-3.5 w-3.5 text-violet-400" />
                    My Configurations
                  </Link>
                  <div className="my-1 border-t border-white/10" />
                  <button
                    onClick={async () => {
                      setUserMenuOpen(false);
                      await signOut();
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <LogOut className="h-3.5 w-3.5 text-red-400" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Drawer */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-l1-text-muted hover:text-l1-text rounded-xl h-10 w-10 cursor-pointer"
              />
            }
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] bg-l1-bg/95 backdrop-blur-2xl border-l border-white/10 rounded-l-2xl"
          >
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2.5 text-l1-text">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0B0D17] border border-l1-primary/30 overflow-hidden">
                  <img
                    src="/robot-avatar.jpg"
                    alt="L1Pilot Logo"
                    className="h-full w-full object-cover"
                  />
                </div>
                L1Pilot
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-1.5 mt-8 px-2">
              {showLoggedOutState &&
                navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => navigate(link.href)}
                    className="block w-full text-left rounded-xl px-4 py-3 text-base font-medium text-l1-text-muted transition-colors hover:bg-white/5 hover:text-white cursor-pointer"
                  >
                    {link.label}
                  </button>
                ))}
              <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6">
                {showLoggedOutState ? (
                  <>
                    <button
                      onClick={() => navigate("/sign-in")}
                      className="w-full rounded-xl h-11 px-4 border border-white/10 bg-white/5 text-l1-text hover:text-white hover:bg-white/10 text-sm font-medium cursor-pointer transition-all"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        openWaitlist();
                      }}
                      className="w-full rounded-xl h-11 px-4 bg-l1-primary hover:bg-l1-primary-hover text-white text-sm font-medium shadow-lg shadow-l1-primary/30 cursor-pointer transition-all"
                    >
                      Try L1Pilot Free
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10">
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt="User"
                          className="h-8 w-8 rounded-lg object-cover border border-l1-primary/30 shrink-0"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-l1-primary to-violet-700 flex items-center justify-center text-xs font-bold text-white shrink-0">
                          {userInitial}
                        </div>
                      )}
                      <span className="text-xs font-medium text-l1-text truncate">
                        {user?.email || "User"}
                      </span>
                    </div>
                    <button
                      onClick={async () => {
                        setIsOpen(false);
                        await signOut();
                      }}
                      className="w-full rounded-xl h-10 px-4 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-sm font-medium cursor-pointer transition-all flex items-center justify-center gap-2"
                    >
                      <LogOut className="h-4 w-4 text-red-400" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
