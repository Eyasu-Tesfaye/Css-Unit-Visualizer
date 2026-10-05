"use client";

import React from "react";

interface PresetScenariosProps {
  darkMode: boolean;
  onSelectPreset: (preset: {
    value: string;
    unit: string;
    root?: string;
    parent?: string;
    viewportWidth?: string;
  }) => void;
}

const PRESETS = [
  {
    name: "Hero Title",
    unit: "rem",
    value: "3.5",
    root: "16",
    label: "3.5rem (Root)",
  },
  {
    name: "Card Padding",
    unit: "em",
    value: "1.5",
    parent: "18",
    label: "1.5em (Parent)",
  },
  {
    name: "Fluid Width",
    unit: "%",
    value: "80",
    viewportWidth: "1400",
    label: "80% (Viewport)",
  },
  {
    name: "Full Viewport",
    unit: "vw",
    value: "50",
    viewportWidth: "1200",
    label: "50vw (Width)",
  },
];

export const PresetScenarios: React.FC<PresetScenariosProps> = ({
  darkMode,
  onSelectPreset,
}) => {
  return (
    <div className="space-y-2 mb-6">
      <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-zinc-400">
        <span>Quick Presets</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.name}
            type="button"
            onClick={() => onSelectPreset(preset)}
            className={`px-3 py-2 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
              darkMode
                ? "bg-zinc-900/60 border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-200"
                : "bg-zinc-50 border-zinc-200 hover:bg-zinc-100 hover:border-zinc-300 text-zinc-800"
            }`}
          >
            <span className="text-xs font-semibold">{preset.name}</span>
            <span className="text-[11px] font-mono opacity-60 mt-0.5">
              {preset.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
