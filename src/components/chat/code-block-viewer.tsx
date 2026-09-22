"use client";

import React, { useState, useContext, createContext } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Check, Download, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockViewerProps {
  content: string;
  isUser?: boolean;
}

// Context to track ol vs ul list hierarchy
const ListTypeContext = createContext<"ol" | "ul">("ul");

function getFileName(code: string): string {
  const lower = code.toLowerCase();
  if (
    lower.includes('"alloc"') ||
    lower.includes('"chainid"') ||
    lower.includes('"difficulty"') ||
    lower.includes('"gaslimit"') ||
    lower.includes('"homesteadblock"') ||
    lower.includes('"coinbase"') ||
    lower.includes('"mixhash"') ||
    lower.includes('"extradata"')
  ) {
    return "genesis.json";
  }
  if (
    lower.includes('"feeconfig"') ||
    lower.includes('"allowlist"') ||
    lower.includes('"subnetid"') ||
    lower.includes('"snowman"') ||
    lower.includes('"eth-api"') ||
    lower.includes('"warp-api"') ||
    lower.includes('"pruning-enabled"') ||
    lower.includes('"continuous-profiler"')
  ) {
    return "config.json";
  }
  if (code.trim().startsWith("{") || code.trim().startsWith("[")) {
    return "configuration.json";
  }
  return "code.txt";
}


/**
 * Syntax highlighter for JSON code blocks
 */
function JsonSyntaxHighlighter({ code }: { code: string }) {
  let formatted = code;
  try {
    const parsed = JSON.parse(code);
    formatted = JSON.stringify(parsed, null, 2);
  } catch {
    // Keep original if not strict JSON
  }

  const tokens: React.ReactNode[] = [];
  const regex =
    /("(?:\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*")\s*(:)?|\b(true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|([{}[\]:,])|(\s+)|([^\s"{}[\]:,]+)/g;

  let match;
  let keyIndex = 0;

  while ((match = regex.exec(formatted)) !== null) {
    const [full, str, isKey, boolOrNull, number, punct, whitespace, unknown] =
      match;
    const k = `tok-${keyIndex++}`;

    if (str !== undefined) {
      if (isKey) {
        tokens.push(
          <span key={k} className="text-purple-300 font-semibold">
            {str}
          </span>
        );
        tokens.push(
          <span key={`${k}-colon`} className="text-slate-400">
            :
          </span>
        );
      } else {
        tokens.push(
          <span key={k} className="text-emerald-300">
            {str}
          </span>
        );
      }
    } else if (boolOrNull !== undefined) {
      tokens.push(
        <span key={k} className="text-rose-400 font-semibold">
          {boolOrNull}
        </span>
      );
    } else if (number !== undefined) {
      tokens.push(
        <span key={k} className="text-amber-300 font-semibold">
          {full}
        </span>
      );
    } else if (punct !== undefined) {
      tokens.push(
        <span key={k} className="text-slate-400 font-medium">
          {punct}
        </span>
      );
    } else if (whitespace !== undefined) {
      tokens.push(whitespace);
    } else {
      tokens.push(
        <span key={k} className="text-slate-200">
          {full}
        </span>
      );
    }
  }

  return (
    <pre className="text-[12.5px] font-mono leading-relaxed whitespace-pre m-0">
      {tokens}
    </pre>
  );
}

// Custom List wrappers using native CSS counters for 100% accurate 1, 2, 3, 4, 5 numbering
function OlWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ListTypeContext.Provider value="ol">
      <div
        className="flex flex-col gap-2.5 my-2.5"
        style={{ counterReset: "ol-item-counter" }}
      >
        {children}
      </div>
    </ListTypeContext.Provider>
  );
}

function UlWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ListTypeContext.Provider value="ul">
      <div className="flex flex-col gap-1.5 my-2">
        {children}
      </div>
    </ListTypeContext.Provider>
  );
}

function LiItem({ children }: { children: React.ReactNode }) {
  const listType = useContext(ListTypeContext);

  if (listType === "ol") {
    return (
      <div
        className="flex items-start gap-2.5 text-sm leading-relaxed"
        style={{ counterIncrement: "ol-item-counter" }}
      >
        <span className="text-violet-400 font-bold text-sm min-w-[1.25rem] shrink-0 pt-0.5 select-none font-mono before:content-[counter(ol-item-counter)_'.']" />
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2.5 text-sm leading-relaxed">
      <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shrink-0 mt-2 select-none" />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

export function CodeBlockViewer({ content, isUser = false }: CodeBlockViewerProps) {
  const [copiedMap, setCopiedMap] = useState<Record<string, boolean>>({});

  const handleCopy = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedMap((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => setCopiedMap((prev) => ({ ...prev, [key]: false })), 2000);
  };

  const handleDownload = (code: string, fileName: string) => {
    const blob = new Blob([code], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  let blockIndex = 0;

  return (
    <div className="text-sm leading-relaxed space-y-1">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p({ children }) {
            return <p className="mb-2 last:mb-0 leading-relaxed text-slate-200">{children}</p>;
          },
          strong({ children }) {
            return <strong className="font-semibold text-white">{children}</strong>;
          },
          em({ children }) {
            return <em className="italic opacity-90">{children}</em>;
          },
          a({ href, children }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 underline underline-offset-2 hover:text-white transition-colors"
              >
                {children}
              </a>
            );
          },
          h1({ children }) {
            return <h1 className="text-lg font-bold text-white mt-4 mb-2 first:mt-0">{children}</h1>;
          },
          h2({ children }) {
            return <h2 className="text-base font-bold text-white mt-3.5 mb-2 first:mt-0">{children}</h2>;
          },
          h3({ children }) {
            return <h3 className="text-sm font-semibold text-violet-200 mt-3 mb-1.5 first:mt-0">{children}</h3>;
          },
          ul({ children }) {
            return <UlWrapper>{children}</UlWrapper>;
          },
          ol({ children }) {
            return <OlWrapper>{children}</OlWrapper>;
          },
          li({ children }) {
            return <LiItem>{children}</LiItem>;
          },
          blockquote({ children }) {
            return (
              <blockquote className="border-l-2 border-violet-500/60 pl-3.5 py-1 my-2.5 text-slate-400 italic text-sm">
                {children}
              </blockquote>
            );
          },
          hr() {
            return <hr className="my-3 border-white/10" />;
          },
          pre({ children }) {
            return <>{children}</>;
          },
          code({ children, className }) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match?.[1] ?? "";
            const codeString = String(children).replace(/\n$/, "");
            const isBlock = Boolean(className) || codeString.includes("\n");

            if (isBlock) {
              const key = `block-${blockIndex++}`;
              const isCopied = copiedMap[key];
              const fileName = getFileName(codeString);
              const isJsonLike =
                language === "json" ||
                codeString.trim().startsWith("{") ||
                codeString.trim().startsWith("[");

              return (
                <div className="my-3 rounded-xl border border-white/10 bg-[#0B0F19] overflow-hidden shadow-xl">
                  {/* Header Bar */}
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/[0.04]">
                    <div className="flex items-center gap-2">
                      <FileCode className="h-4 w-4 text-violet-400 shrink-0" />
                      <span className="font-mono text-xs font-semibold text-slate-200">
                        {isJsonLike ? fileName : language || "code"}
                      </span>
                      {language && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-400 font-mono uppercase tracking-wider">
                          {language}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(codeString, key)}
                        className="h-7 px-2.5 text-xs hover:bg-white/10 text-slate-300 hover:text-white rounded-lg gap-1.5 cursor-pointer"
                      >
                        {isCopied ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-medium">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </Button>
                      {isJsonLike && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(codeString, fileName)}
                          className="h-7 px-2.5 text-xs border-violet-500/40 bg-violet-500/20 hover:bg-violet-500/30 text-white rounded-lg gap-1.5 cursor-pointer"
                        >
                          <Download className="h-3.5 w-3.5" />
                          <span>Download</span>
                        </Button>
                      )}
                    </div>
                  </div>
                  {/* Scrollable code block with syntax highlighting */}
                  <div className="overflow-x-auto max-h-[450px] p-4">
                    {isJsonLike ? (
                      <JsonSyntaxHighlighter code={codeString} />
                    ) : (
                      <pre className="text-[12.5px] font-mono text-emerald-300/90 leading-relaxed whitespace-pre m-0">
                        {codeString}
                      </pre>
                    )}
                  </div>
                </div>
              );
            }

            return (
              <code className="px-1.5 py-0.5 rounded-md bg-white/10 text-violet-300 font-mono text-[12px]">
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
