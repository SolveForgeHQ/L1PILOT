"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useWaitlistModal } from "@/components/waitlist-context";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";

interface WaitlistButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  className?: string;
}

export function WaitlistButton({
  children,
  className,
  variant = "default",
  size = "default",
  ...props
}: WaitlistButtonProps) {
  const { openWaitlist } = useWaitlistModal();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={openWaitlist}
      className={className}
      {...props}
    >
      {children}
    </Button>
  );
}
