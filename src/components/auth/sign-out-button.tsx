"use client";

import { useAuth } from "@/components/auth-provider";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SignOutButtonProps {
  className?: string;
  variant?: "outline" | "ghost" | "default";
  showIcon?: boolean;
  children?: React.ReactNode;
}

export function SignOutButton({
  className,
  variant = "outline",
  showIcon = true,
  children,
}: SignOutButtonProps) {
  const { signOut } = useAuth();

  return (
    <Button
      variant={variant}
      onClick={signOut}
      className={className}
    >
      {showIcon && <LogOut className="h-4 w-4" />}
      {children || <span>Sign Out</span>}
    </Button>
  );
}
