"use client";

import { usePathname } from "next/navigation";

export function LayoutMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isChat = pathname === "/chat";

  return (
    <main
      className={
        isChat
          ? "flex-1 h-screen h-dvh min-h-0 overflow-hidden flex flex-col"
          : "flex-1 pt-12 sm:pt-14"
      }
    >
      {children}
    </main>
  );
}
