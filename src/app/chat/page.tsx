import type { Metadata } from "next";
import { ChatClient } from "@/components/chat/chat-client";

export const metadata: Metadata = {
  title: "L1Pilot AI Chat",
  description: "Chat with L1Pilot AI to design, configure, and generate Avalanche L1 specifications.",
};

export default function ChatPage() {
  return <ChatClient />;
}

