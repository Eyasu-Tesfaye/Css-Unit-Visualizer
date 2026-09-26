"use client";

import React from "react";

interface ControlPanelProps {
  darkMode: boolean;
  value: string;
  setValue: (val: string) => void;
  unit: string;
  setUnit: (val: string) => void;
  rootFontSize: string;
  setRootFontSize: (val: string) => void;
  parentFontSize: string;
  setParentFontSize: (val: string) => void;
  viewportWidth: string;
  setViewportWidth: (val: string) => void;
  viewportHeight: string;
  setViewportHeight: (val: string) => void;
  conversion: { px: number; formula: string };
  unitDescription: string;
  needsRoot: boolean;
  needsParent: boolean;
  needsViewport: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  darkMode,
  value,
  setValue,
  unit,
  setUnit,
  rootFontSize,
  setRootFontSize,
  parentFontSize,
  setParentFontSize,
  viewportWidth,
  setViewportWidth,
  viewportHeight,
  setViewportHeight,
  conversion,
  unitDescription,
  needsRoot,
  needsParent,
  needsViewport,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <label className="block text-xs font-medium mb-1.5 opacity-80">
            Value
          </label>
          <input
            type="number"
            min="0"
            step="any"
            value={value}
            onChange={(e) => {
              const v = e.target.value;
              setValue(
                v === "" ? "" : Math.max(0, parseFloat(v) || 0).toString(),
              );
            }}
            className={`w-full px-3 py-2 rounded-lg border font-mono text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 ${
              darkMode
                ? "bg-zinc-900 border-zinc-700 text-zinc-100"
                : "bg-zinc-50 border-zinc-300 text-zinc-900"
            }`}
            placeholder="e.g. 2"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1.5 opacity-80">
            Unit
          </label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className={`w-full px-3 py-2 rounded-lg border font-mono text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 ${
              darkMode
                ? "bg-zinc-900 border-zinc-700 text-zinc-100"
                : "bg-zinc-50 border-zinc-300 text-zinc-900"
            }`}
          >
            <option value="px">px</option>
            <option value="rem">rem</option>
            <option value="em">em</option>
            <option value="%">%</option>
            <option value="vw">vw</option>
            <option value="vh">vh</option>
            <option value="vmin">vmin</option>
            <option value="vmax">vmax</option>
          </select>
        </div>
      </div>

      {/* Beginner Concept Explainer Card */}
      <div
        className={`p-3 rounded-lg border text-xs leading-relaxed ${
          darkMode
            ? "bg-blue-950/30 border-blue-800/50 text-blue-200"
            : "bg-blue-50 border-blue-200 text-blue-900"
        }`}
      >
        <div className="font-semibold mb-1 flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
          <span>💡 Concept Guide: {unit}</span>
        </div>
        {unitDescription}
      </div>

      <div
        className={`pt-4 border-t space-y-4 transition-all ${
          darkMode ? "border-zinc-800" : "border-zinc-200"
        }`}
      >
        {(needsRoot || needsParent || needsViewport) && (
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
            Context Settings
          </p>
        )}

        {needsRoot && (
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-medium opacity-80">
                Root Font Size (&lt;html&gt;)
              </label>
              <span className="text-xs font-mono text-zinc-400">
                {rootFontSize}px
              </span>
            </div>
            <input
              type="number"
              min="0"
              value={rootFontSize}
              onChange={(e) => {
                const v = e.target.value;
                setRootFontSize(
                  v === "" ? "" : Math.max(0, parseFloat(v) || 0).toString(),
                );
              }}
              className={`w-full px-3 py-2 rounded-lg border font-mono text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 ${
                darkMode
                  ? "bg-zinc-900 border-zinc-700 text-zinc-100"
                  : "bg-zinc-50 border-zinc-300 text-zinc-900"
              }`}
            />
          </div>
        )}

        {needsParent && (
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-medium opacity-80">
                Parent Font Size
              </label>
              <span className="text-xs font-mono text-zinc-400">
                {parentFontSize}px
              </span>
            </div>
            <input
              type="number"
              min="0"
              value={parentFontSize}
              onChange={(e) => {
                const v = e.target.value;
                setParentFontSize(
                  v === "" ? "" : Math.max(0, parseFloat(v) || 0).toString(),
                );
              }}
              className={`w-full px-3 py-2 rounded-lg border font-mono text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 ${
                darkMode
                  ? "bg-zinc-900 border-zinc-700 text-zinc-100"
                  : "bg-zinc-50 border-zinc-300 text-zinc-900"
              }`}
            />
          </div>
        )}

        {needsViewport && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1.5 opacity-80">
                  Viewport Width
                </label>
                <input
                  type="number"
                  min="0"
                  value={viewportWidth}
                  onChange={(e) => {
                    const v = e.target.value;
                    setViewportWidth(
                      v === ""
                        ? ""
                        : Math.max(0, parseFloat(v) || 0).toString(),
                    );
                  }}
                  className={`w-full px-3 py-2 rounded-lg border font-mono text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 ${
                    darkMode
                      ? "bg-zinc-900 border-zinc-700 text-zinc-100"
                      : "bg-zinc-50 border-zinc-300 text-zinc-900"
                  }`}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5 opacity-80">
                  Viewport Height
                </label>
                <input
                  type="number"
                  min="0"
                  value={viewportHeight}
                  onChange={(e) => {
                    const v = e.target.value;
                    setViewportHeight(
                      v === ""
                        ? ""
                        : Math.max(0, parseFloat(v) || 0).toString(),
                    );
                  }}
                  className={`w-full px-3 py-2 rounded-lg border font-mono text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 ${
                    darkMode
                      ? "bg-zinc-900 border-zinc-700 text-zinc-100"
                      : "bg-zinc-50 border-zinc-300 text-zinc-900"
                  }`}
                />
              </div>
            </div>

            <div className="pt-2">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-medium opacity-80">
                  Viewport Width Slider
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  {viewportWidth}px
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="2560"
                step="10"
                value={viewportWidth}
                onChange={(e) => setViewportWidth(e.target.value)}
                className="w-full accent-zinc-500 cursor-pointer"
                aria-label="Viewport Width Slider"
              />
            </div>

            <div className="pt-2">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-medium opacity-80">
                  Viewport Height Slider
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  {viewportHeight}px
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="2160"
                step="10"
                value={viewportHeight}
                onChange={(e) => setViewportHeight(e.target.value)}
                className="w-full accent-zinc-500 cursor-pointer"
                aria-label="Viewport Height Slider"
              />
            </div>
          </>
        )}
      </div>

      <div
        className={`mt-6 p-4 rounded-xl border ${
          darkMode
            ? "bg-zinc-900/40 border-zinc-800"
            : "bg-zinc-100 border-zinc-200"
        }`}
      >
        <div className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-1">
          Conversion Result
        </div>
        <div className="text-2xl font-mono font-bold tracking-tight">
          {value || 0}
          {unit} <span className="text-zinc-500 font-normal">=</span>{" "}
          {Math.round(conversion.px * 10) / 10}px
        </div>
        <div
          className={`mt-2 text-xs font-mono p-2 rounded border overflow-x-auto ${
            darkMode
              ? "bg-zinc-950 border-zinc-800 text-zinc-300"
              : "bg-white border-zinc-200 text-zinc-600"
          }`}
        >
          {conversion.formula}
        </div>
      </div>
    </div>
  );
};
