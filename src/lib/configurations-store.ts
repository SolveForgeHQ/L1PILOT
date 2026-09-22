// Utility functions for extracting, saving, and recovering L1 configurations

export interface SavedConfigurationItem {
  id: string;
  user_id?: string;
  chat_id?: string | null;
  name: string;
  type: "genesis" | "config";
  content: string;
  created_at: string;
  chats?: { title: string } | null;
}

export function isValidUUID(id?: string | null): boolean {
  if (!id) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
}

// Inspect response content for generated genesis/config files
export function extractGeneratedFiles(text: string): { name: string; type: "genesis" | "config"; content: string }[] {
  if (!text) return [];
  const files: { name: string; type: "genesis" | "config"; content: string }[] = [];
  const codeBlockRegex = /(?:```|~~~)(?:[a-zA-Z0-9_\-\.\:]+)?\s*([\s\S]*?)(?:```|~~~)/gi;

  let match;
  while ((match = codeBlockRegex.exec(text)) !== null) {
    const code = match[1].trim();
    if (!code.startsWith("{") && !code.includes("{")) continue;

    const lowerCode = code.toLowerCase();
    const matchIndex = match.index;
    const precedingText = text.substring(Math.max(0, matchIndex - 250), matchIndex).toLowerCase();

    const isGenesis =
      precedingText.includes("genesis") ||
      lowerCode.includes('"alloc"') ||
      lowerCode.includes('"chainid"') ||
      lowerCode.includes('"difficulty"') ||
      lowerCode.includes('"gaslimit"') ||
      lowerCode.includes('"homesteadblock"') ||
      lowerCode.includes('"coinbase"') ||
      lowerCode.includes('"mixhash"') ||
      lowerCode.includes('"extradata"');

    const isConfig =
      precedingText.includes("config.json") ||
      precedingText.includes("subnet config") ||
      precedingText.includes("node config") ||
      lowerCode.includes('"feeconfig"') ||
      lowerCode.includes('"allowlist"') ||
      lowerCode.includes('"subnetid"') ||
      lowerCode.includes('"snowman"') ||
      lowerCode.includes('"eth-api"') ||
      lowerCode.includes('"warp-api"') ||
      lowerCode.includes('"pruning-enabled"') ||
      lowerCode.includes('"continuous-profiler"');

    if (isGenesis) {
      if (!files.some((f) => f.name === "genesis.json")) {
        files.push({ name: "genesis.json", type: "genesis", content: code });
      }
    } else if (isConfig) {
      if (!files.some((f) => f.name === "config.json")) {
        files.push({ name: "config.json", type: "config", content: code });
      }
    }
  }

  return files;
}

// Scans localStorage to recover any configs previously generated in chat messages
export function recoverConfigsFromLocalStorage(): SavedConfigurationItem[] {
  if (typeof window === "undefined") return [];
  try {
    const recovered: SavedConfigurationItem[] = [];
    const chatsMap: Record<string, string> = {};

    try {
      const storedChats = localStorage.getItem("l1pilot_chats");
      if (storedChats) {
        const parsedChats = JSON.parse(storedChats);
        if (Array.isArray(parsedChats)) {
          parsedChats.forEach((c: any) => {
            if (c.id && c.title) chatsMap[c.id] = c.title;
          });
        }
      }
    } catch {}

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("l1pilot_msgs_")) {
        const chatId = key.replace("l1pilot_msgs_", "");
        const raw = localStorage.getItem(key);
        if (!raw) continue;
        try {
          const msgs = JSON.parse(raw);
          if (!Array.isArray(msgs)) continue;

          for (const msg of msgs) {
            if (msg.role === "assistant" && typeof msg.content === "string") {
              const files = extractGeneratedFiles(msg.content);
              for (const file of files) {
                const alreadyExists = recovered.some(
                  (r) => r.name === file.name && r.content === file.content
                );
                if (!alreadyExists) {
                  recovered.push({
                    id: `recovered-${chatId}-${file.type}`,
                    name: file.name,
                    type: file.type,
                    content: file.content,
                    chat_id: chatId,
                    created_at: msg.timestamp || new Date().toISOString(),
                    chats: { title: chatsMap[chatId] || "AI Conversation" },
                  });
                }
              }
            }
          }
        } catch {}
      }
    }
    return recovered;
  } catch (e) {
    console.error("Error recovering configs from localStorage:", e);
    return [];
  }
}
