"use client";

import React, { createContext, useContext, useState, type ReactNode } from "react";
import { WaitlistModal } from "@/components/waitlist-modal";

interface WaitlistContextType {
  isOpen: boolean;
  openWaitlist: () => void;
  closeWaitlist: () => void;
}

const WaitlistContext = createContext<WaitlistContextType | undefined>(undefined);

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openWaitlist = () => setIsOpen(true);
  const closeWaitlist = () => setIsOpen(false);

  return (
    <WaitlistContext.Provider value={{ isOpen, openWaitlist, closeWaitlist }}>
      {children}
      <WaitlistModal isOpen={isOpen} onClose={closeWaitlist} />
    </WaitlistContext.Provider>
  );
}

export function useWaitlistModal() {
  const context = useContext(WaitlistContext);
  if (!context) {
    throw new Error("useWaitlistModal must be used within a WaitlistProvider");
  }
  return context;
}
