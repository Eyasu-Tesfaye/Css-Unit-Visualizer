"use client";

import React from "react";

interface VisualizerCanvasProps {
  darkMode: boolean;
  computedPx: number;
  value: string;
  unit: string;
  needsViewport: boolean;
  viewportWidth: string;
  viewportHeight: string;
  isTiny: boolean;
  isTooSmall: boolean;
  maxWidthCap: number;
  maxHeightCap: number;
}

export const VisualizerCanvas: React.FC<VisualizerCanvasProps> = ({
  darkMode,
  computedPx,
  value,
  unit,
  needsViewport,
  viewportWidth,
  viewportHeight,
  isTiny,
  isTooSmall,
  maxWidthCap,
  maxHeightCap,
}) => {
  return (
    <div
      className={`relative w-full h-full flex items-center justify-center overflow-visible transition-all ${
        darkMode ? "bg-zinc-950" : "bg-white"
      }`}
    >
      {/* Background Dot Grid */}
      <div
        className={`absolute inset-0 opacity-40 overflow-hidden ${
          darkMode
            ? "bg-[radial-gradient(#52525b_1px,transparent_1px)]"
            : "bg-[radial-gradient(#94a3b8_1px,transparent_1px)]"
        } bg-size-[16px_16px]`}
      ></div>

      {/* Viewport size indicator badge */}
      {needsViewport && (
        <div className="absolute top-4 right-4 text-xs font-mono px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700 shadow-sm select-none z-20">
          viewport: {viewportWidth} × {viewportHeight}
        </div>
      )}

      {/* Central Element Box */}
      <div className="relative flex items-center justify-center">
        {computedPx > 0 && (
          <>
            {/* Width Guide on Top */}
            <div
              className={`absolute left-0 right-0 flex items-center justify-center select-none pointer-events-none transition-all duration-200 ${
                isTiny ? "-top-12" : "-top-7"
              }`}
            >
              <div className="h-px bg-zinc-500/60 w-full absolute"></div>
              <span className="bg-zinc-900 text-zinc-200 border border-zinc-700 text-[10px] font-mono px-2 py-0.5 rounded z-10 shadow-sm whitespace-nowrap">
                w: {Math.round(computedPx)}px
              </span>
            </div>

            {/* Height Guide on Left */}
            <div
              className={`absolute top-0 bottom-0 flex items-center justify-center select-none pointer-events-none transition-all duration-200 ${
                isTiny ? "-left-16" : "-left-12"
              }`}
            >
              <div className="w-px bg-zinc-500/60 h-full absolute"></div>
              <span className="bg-zinc-900 text-zinc-200 border border-zinc-700 text-[10px] font-mono px-2 py-0.5 rounded z-10 -rotate-90 shadow-sm whitespace-nowrap">
                h: {Math.round(computedPx)}px
              </span>
            </div>

            <div
              style={{
                width: `${Math.max(4, Math.min(computedPx, maxWidthCap))}px`,
                height: `${Math.max(4, Math.min(computedPx, maxHeightCap))}px`,
              }}
              className="rounded-xl bg-zinc-800/40 border-2 border-zinc-500 flex items-center justify-center shadow-2xl transition-all duration-300 ease-out relative group"
            >
              {!isTooSmall && (
                <div className="text-center p-2">
                  <div className="font-mono font-bold text-sm sm:text-base text-zinc-200 tracking-tight">
                    {value || 0}
                    {unit}
                  </div>
                  <div className="text-[11px] font-mono opacity-60">
                    ≈ {Math.round(computedPx)}px
                  </div>
                </div>
              )}

              {isTooSmall && (
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 select-none pointer-events-none whitespace-nowrap z-10">
                  <div className="w-2 h-px bg-zinc-500"></div>
                  <span className="bg-zinc-900 text-zinc-200 border border-zinc-700 text-[10px] font-mono px-2 py-0.5 rounded shadow-sm">
                    {value || 0}
                    {unit} (≈ {Math.round(computedPx)}px)
                  </span>
                </div>
              )}

              <div className="absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full bg-zinc-400"></div>
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-zinc-400"></div>
              <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 rounded-full bg-zinc-400"></div>
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-zinc-400"></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
