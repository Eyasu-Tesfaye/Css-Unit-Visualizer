"use client";

import React, { useState, useCallback } from "react";
import { Check, Clipboard } from "lucide-react";

interface CodeExporterProps {
  darkMode: boolean;
  value: string;
  unit: string;
  calculatedPx: number;
}

export const CodeExporter: React.FC<CodeExporterProps> = ({
  darkMode,
  value,
  unit,
  calculatedPx,
}) => {
  const [copied, setCopied] = useState(false);

  const displayValue = value || "0";

  const roundedPx = parseFloat((Math.round(calculatedPx * 10) / 10).toFixed(1));

  const cssSnippet = `.your-element {\n  property: ${displayValue}${unit}; /* approx. ${roundedPx}px */\n}`;

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(cssSnippet).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [cssSnippet]);

  return (
    <div
      className={`mt-6 p-4 rounded-xl border relative font-mono text-xs ${
        darkMode
          ? "bg-zinc-900/40 border-zinc-800 text-zinc-300"
          : "bg-zinc-100 border-zinc-200 text-zinc-600"
      }`}
    >
      {/* Header and Copy Button */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
          Export CSS
        </span>
        <button
          onClick={copyToClipboard}
          disabled={copied}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
            copied
              ? "bg-emerald-500/10 text-emerald-400"
              : darkMode
                ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                : "bg-white hover:bg-zinc-200 text-zinc-700 border border-zinc-300"
          }`}
          aria-label="Copy CSS to clipboard"
        >
          {copied ? (
            <>
              <Check size={14} />
              Copied
            </>
          ) : (
            <>
              <Clipboard size={14} />
              Copy Snippet
            </>
          )}
        </button>
      </div>

      {/* Code Block Display with Responsive Text Wrapping */}
      <pre
        className={`p-3 rounded-lg overflow-x-auto ${
          darkMode ? "bg-zinc-950" : "bg-white"
        }`}
      >
        <code className="whitespace-pre text-[10px] sm:text-[11px] md:text-xs block">
          {cssSnippet}
        </code>
      </pre>

      {/* Optional hint */}
      <p
        className={`mt-2 text-[11px] opacity-70 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`}
      >
        Replace `.your-element` with your target selector.
      </p>
    </div>
  );
};
