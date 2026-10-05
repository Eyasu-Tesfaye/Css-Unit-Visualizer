"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { CodeExporter } from "./CodeExporter";
import { PresetScenarios } from "./PresetScenarios";

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

const UNITS = [
  { value: "px", label: "px" },
  { value: "rem", label: "rem" },
  { value: "em", label: "em" },
  { value: "%", label: "%" },
  { value: "vw", label: "vw" },
  { value: "vh", label: "vh" },
  { value: "vmin", label: "vmin" },
  { value: "vmax", label: "vmax" },
] as const;

export const ControlPanel: React.FC<ControlPanelProps> = React.memo(
  ({
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
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const stopStepping = useCallback(() => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      timeoutRef.current = null;
      intervalRef.current = null;
    }, []);

    const startStepping = useCallback(
      (
        currentVal: string,
        setter: (val: string) => void,
        amount: number,
        minLimit = 0,
        maxLimit = Infinity,
      ) => {
        stopStepping();

        const current = parseFloat(currentVal) || 0;
        const initialUpdated = Math.min(
          maxLimit,
          Math.max(minLimit, current + amount),
        ).toString();
        setter(initialUpdated);

        let latestValue = parseFloat(initialUpdated) || 0;

        timeoutRef.current = setTimeout(() => {
          intervalRef.current = setInterval(() => {
            latestValue = Math.min(
              maxLimit,
              Math.max(minLimit, latestValue + amount),
            );
            setter(latestValue.toString());
          }, 70);
        }, 300);
      },
      [stopStepping],
    );

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsDropdownOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        stopStepping();
      };
    }, [stopStepping]);

    const renderNumberInput = useCallback(
      (
        val: string,
        setter: (v: string) => void,
        stepAmount = 1,
        minLimit = 0,
        maxLimit = Infinity,
      ) => (
        <div className="relative flex items-center">
          <input
            type="number"
            min={minLimit}
            max={maxLimit}
            step="any"
            value={val}
            onChange={(e) => {
              const v = e.target.value;
              if (v === "") {
                setter("");
                return;
              }
              const parsed = parseFloat(v) || 0;
              const clamped = Math.min(maxLimit, Math.max(minLimit, parsed));
              setter(clamped.toString());
            }}
            className={`w-full px-3 py-2 rounded-lg border font-mono text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 lg:pr-3 max-lg:pr-14 max-lg:[&::-webkit-search-cancel-button]:hidden max-lg:[&::-webkit-clear-button]:hidden max-lg:[&::-webkit-search-decoration]:hidden max-lg:[&::-webkit-search-results-button]:hidden max-lg:[&::-webkit-search-results-decoration]:hidden ${
              darkMode
                ? "bg-zinc-900 border-zinc-700 text-zinc-100 scheme-dark"
                : "bg-zinc-50 border-zinc-300 text-zinc-900 scheme-light"
            }`}
            placeholder="e.g. 2"
          />
          <div className="absolute right-1 flex lg:hidden items-center space-x-0.5 select-none">
            <button
              type="button"
              onPointerDown={(e) => {
                e.preventDefault();
                startStepping(val, setter, -stepAmount, minLimit, maxLimit);
              }}
              onPointerUp={stopStepping}
              onPointerLeave={stopStepping}
              className={`w-6 h-7 flex items-center justify-center rounded text-xs font-mono transition-colors cursor-pointer touch-none ${
                darkMode
                  ? "bg-zinc-800 text-zinc-300 active:bg-zinc-700"
                  : "bg-zinc-200 text-zinc-700 active:bg-zinc-300"
              }`}
              title="Decrease"
            >
              -
            </button>
            <button
              type="button"
              onPointerDown={(e) => {
                e.preventDefault();
                startStepping(val, setter, stepAmount, minLimit, maxLimit);
              }}
              onPointerUp={stopStepping}
              onPointerLeave={stopStepping}
              className={`w-6 h-7 flex items-center justify-center rounded text-xs font-mono transition-colors cursor-pointer touch-none ${
                darkMode
                  ? "bg-zinc-800 text-zinc-300 active:bg-zinc-700"
                  : "bg-zinc-200 text-zinc-700 active:bg-zinc-300"
              }`}
              title="Increase"
            >
              +
            </button>
          </div>
        </div>
      ),
      [darkMode, startStepping, stopStepping],
    );

    return (
      <div className="space-y-4">
        <PresetScenarios
          darkMode={darkMode}
          onSelectPreset={(preset) => {
            setValue(preset.value);
            setUnit(preset.unit);
            if (preset.root) setRootFontSize(preset.root);
            if (preset.parent) setParentFontSize(preset.parent);
            if (preset.viewportWidth) setViewportWidth(preset.viewportWidth);
          }}
        />
        <div className="grid grid-cols-3 gap-3 items-end">
          <div className="col-span-2">
            <label className="block text-xs font-medium mb-1.5 opacity-80">
              Value
            </label>
            {renderNumberInput(value, setValue)}
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5 opacity-80">
              Unit
            </label>
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className={`w-full h-9.5 px-3 rounded-lg border font-mono text-sm flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-zinc-500 cursor-pointer transition-colors ${
                  darkMode
                    ? "bg-zinc-900 border-zinc-700 text-zinc-100 hover:bg-zinc-850"
                    : "bg-zinc-50 border-zinc-300 text-zinc-900 hover:bg-zinc-100"
                }`}
              >
                <span>{unit}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 opacity-60 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <div
                  className={`absolute left-0 right-0 mt-1.5 rounded-xl border shadow-xl z-50 overflow-hidden py-1 will-change-transform ${
                    darkMode
                      ? "bg-zinc-900/95 border-zinc-700 text-zinc-100"
                      : "bg-white/95 border-zinc-200 text-zinc-900"
                  }`}
                >
                  {UNITS.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => {
                        setUnit(item.value);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left font-mono text-sm flex items-center justify-between transition-colors cursor-pointer ${
                        unit === item.value
                          ? darkMode
                            ? "bg-zinc-800 text-zinc-100 font-semibold"
                            : "bg-zinc-100 text-zinc-900 font-semibold"
                          : darkMode
                            ? "hover:bg-zinc-800/60 text-zinc-300"
                            : "hover:bg-zinc-50 text-zinc-700"
                      }`}
                    >
                      <span>{item.label}</span>
                      {unit === item.value && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

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
              {renderNumberInput(rootFontSize, setRootFontSize)}
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
              {renderNumberInput(parentFontSize, setParentFontSize)}
            </div>
          )}

          {needsViewport && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1.5 opacity-80">
                    Viewport Width
                  </label>
                  {renderNumberInput(
                    viewportWidth,
                    setViewportWidth,
                    10,
                    100,
                    2560,
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5 opacity-80">
                    Viewport Height
                  </label>
                  {renderNumberInput(
                    viewportHeight,
                    setViewportHeight,
                    10,
                    100,
                    2160,
                  )}
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
        <CodeExporter
          darkMode={darkMode}
          value={value}
          unit={unit}
          calculatedPx={conversion.px}
        />
      </div>
    );
  },
);

ControlPanel.displayName = "ControlPanel";
