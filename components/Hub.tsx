"use client";

import React, { useState, useEffect, useMemo } from "react";

interface Settings {
  rootFontSize: number;
  parentFontSize: number;
  viewportWidth: number;
  viewportHeight: number;
}

function convertToPixels(val: string, unit: string, settings: Settings) {
  const num = parseFloat(val);
  if (isNaN(num) || num < 0) return { px: 0, formula: "Invalid value" };

  const { rootFontSize, parentFontSize, viewportWidth, viewportHeight } =
    settings;

  switch (unit) {
    case "px":
      return {
        px: num,
        formula: `${num}px is an absolute unit. It never changes regardless of screen size or font settings.`,
      };
    case "rem": {
      const computed = num * rootFontSize;
      return {
        px: computed,
        formula: `${num}rem × ${rootFontSize}px (root font size) = ${computed}px`,
      };
    }
    case "em": {
      const computed = num * parentFontSize;
      return {
        px: computed,
        formula: `${num}em × ${parentFontSize}px (parent font size) = ${computed}px`,
      };
    }
    case "%": {
      const computed = (num / 100) * viewportWidth;
      return {
        px: computed,
        formula: `${num}% of viewport width (${viewportWidth}px) = ${computed.toFixed(1)}px`,
      };
    }
    case "vw": {
      const computed = (num / 100) * viewportWidth;
      return {
        px: computed,
        formula: `${num}vw is ${num}% of viewport width (${viewportWidth}px) = ${computed.toFixed(1)}px`,
      };
    }
    case "vh": {
      const computed = (num / 100) * viewportHeight;
      return {
        px: computed,
        formula: `${num}vh is ${num}% of viewport height (${viewportHeight}px) = ${computed.toFixed(1)}px`,
      };
    }
    case "vmin": {
      const minDim = Math.min(viewportWidth, viewportHeight);
      const computed = (num / 100) * minDim;
      return {
        px: computed,
        formula: `${num}vmin is ${num}% of smaller viewport dimension (${minDim}px) = ${computed.toFixed(1)}px`,
      };
    }
    case "vmax": {
      const maxDim = Math.max(viewportWidth, viewportHeight);
      const computed = (num / 100) * maxDim;
      return {
        px: computed,
        formula: `${num}vmax is ${num}% of larger viewport dimension (${maxDim}px) = ${computed.toFixed(1)}px`,
      };
    }
    default:
      return { px: num, formula: `${num}px` };
  }
}

function getUnitDescription(unit: string) {
  switch (unit) {
    case "px":
      return "Pixels (px) are fixed units. 1px is always 1 pixel on a standard screen. Great for precise borders, but doesn't scale for accessibility.";
    case "rem":
      return "Root EM (rem) is relative to the root font size of the website (usually <html>, which defaults to 16px). Essential for accessible web design!";
    case "em":
      return "EM is relative to the font size of the *parent* element. If a parent element has a 20px font, 1.5em equals 30px.";
    case "%":
      return "Percentages (%) scale relative to the width of the parent container holding the element.";
    case "vw":
      return "Viewport Width (vw) scales based on the browser window width. 1vw is equal to 1% of the total screen width.";
    case "vh":
      return "Viewport Height (vh) scales based on the browser window height. 1vh is equal to 1% of the total screen height.";
    case "vmin":
      return "Viewport Minimum (vmin) scales based on whichever viewport dimension is smaller (width or height).";
    case "vmax":
      return "Viewport Maximum (vmax) scales based on whichever viewport dimension is larger (width or height).";
    default:
      return "";
  }
}

const Screen = () => {
  const [darkMode, setDarkMode] = useState(true);

  const [value, setValue] = useState("2");
  const [unit, setUnit] = useState("rem");
  const [rootFontSize, setRootFontSize] = useState("16");
  const [parentFontSize, setParentFontSize] = useState("16");
  const [viewportWidth, setViewportWidth] = useState("1440");
  const [viewportHeight, setViewportHeight] = useState("900");

  const settings = useMemo(() => {
    const parseVal = (val: string, fallback: number) => {
      const parsed = parseFloat(val);
      return isNaN(parsed) ? fallback : Math.max(0, parsed);
    };

    return {
      rootFontSize: parseVal(rootFontSize, 16),
      parentFontSize: parseVal(parentFontSize, 16),
      viewportWidth: parseVal(viewportWidth, 1440),
      viewportHeight: parseVal(viewportHeight, 900),
    };
  }, [rootFontSize, parentFontSize, viewportWidth, viewportHeight]);

  const conversion = useMemo(() => {
    return convertToPixels(value, unit, settings);
  }, [value, unit, settings]);

  const needsRoot = unit === "rem";
  const needsParent = unit === "em";
  const needsViewport = ["vw", "vh", "vmin", "vmax", "%"].includes(unit);

  const computedPx = conversion.px;
  const isTooSmall = computedPx < 50;
  const isTiny = computedPx < 70; // Triggers expanded guide offset to prevent small overlap

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-200 ${darkMode ? "bg-zinc-950 text-zinc-100" : "bg-zinc-50 text-zinc-900"}`}
    >
      <header
        className={`border-b px-6 py-4 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md ${darkMode ? "border-zinc-800 bg-zinc-950/80" : "border-zinc-200 bg-white/80"}`}
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white font-bold text-sm shadow-sm font-mono">
            px
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight uppercase flex items-center gap-2">
              CSS UNIT VISUALIZER
              <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-zinc-800 text-zinc-300 border border-zinc-700">
                V1.0
              </span>
            </h1>
            <p
              className={`text-xs ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}
            >
              Learn how CSS units work in real-time.
            </p>
          </div>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-2 ${
            darkMode
              ? " text-zinc-300 hover:bg-zinc-800"
              : " text-zinc-700 hover:bg-zinc-100"
          }`}
          title="Toggle Theme"
        >
          {darkMode ? (
            <svg
              className="w-6 h-6 text-zinc-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-zinc-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </button>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div
          className={`lg:col-span-4 rounded-xl border p-5 shadow-sm transition-colors ${darkMode ? "bg-zinc-900/50 border-zinc-800" : "bg-white border-zinc-200"}`}
        >
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-700/30">
            <h2 className="text-sm font-semibold tracking-wide uppercase text-zinc-400">
              Control Panel
            </h2>
            <span className="text-xs font-mono opacity-70">
              Interactive Inputs
            </span>
          </div>

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
                      v === ""
                        ? ""
                        : Math.max(0, parseFloat(v) || 0).toString(),
                    );
                  }}
                  className={`w-full px-3 py-2 rounded-lg border font-mono text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 ${
                    darkMode
                      ? "bg-zinc-950 border-zinc-700 text-zinc-100"
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
                      ? "bg-zinc-950 border-zinc-700 text-zinc-100"
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
              className={`p-3 rounded-lg border text-xs leading-relaxed ${darkMode ? "bg-blue-950/30 border-blue-800/50 text-blue-200" : "bg-blue-50 border-blue-200 text-blue-900"}`}
            >
              <div className="font-semibold mb-1 flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                <span>💡 Concept Guide: {unit}</span>
              </div>
              {getUnitDescription(unit)}
            </div>

            <div
              className={`pt-4 border-t space-y-4 transition-all ${darkMode ? "border-zinc-800" : "border-zinc-100"}`}
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
                        v === ""
                          ? ""
                          : Math.max(0, parseFloat(v) || 0).toString(),
                      );
                    }}
                    className={`w-full px-3 py-2 rounded-lg border font-mono text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 ${
                      darkMode
                        ? "bg-zinc-950 border-zinc-700 text-zinc-100"
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
                        v === ""
                          ? ""
                          : Math.max(0, parseFloat(v) || 0).toString(),
                      );
                    }}
                    className={`w-full px-3 py-2 rounded-lg border font-mono text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 ${
                      darkMode
                        ? "bg-zinc-950 border-zinc-700 text-zinc-100"
                        : "bg-zinc-50 border-zinc-300 text-zinc-900"
                    }`}
                  />
                </div>
              )}

              {needsViewport && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-xs font-medium opacity-80">
                          Viewport Width
                        </label>
                      </div>
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
                            ? "bg-zinc-950 border-zinc-700 text-zinc-100"
                            : "bg-zinc-50 border-zinc-300 text-zinc-900"
                        }`}
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-xs font-medium opacity-80">
                          Viewport Height
                        </label>
                      </div>
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
                            ? "bg-zinc-950 border-zinc-700 text-zinc-100"
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
              className={`mt-6 p-4 rounded-xl border ${darkMode ? "bg-zinc-950/70 border-zinc-800" : "bg-zinc-100/70 border-zinc-200"}`}
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
                className={`mt-2 text-xs font-mono p-2 rounded border ${darkMode ? "bg-zinc-900 border-zinc-800 text-zinc-300" : "bg-white border-zinc-200 text-zinc-600"}`}
              >
                {conversion.formula}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`lg:col-span-8 rounded-xl border p-5 md:p-8 flex flex-col justify-between shadow-sm transition-colors ${darkMode ? "bg-zinc-900/50 border-zinc-800" : "bg-white border-zinc-200"}`}
        >
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-700/30">
            <div>
              <h2 className="text-sm font-semibold tracking-wide uppercase text-zinc-400">
                Visualizer
              </h2>
              <p
                className={`text-xs ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}
              >
                Real-time dimensional preview with measurement guides
              </p>
            </div>
          </div>

          {/* Stationary Visualizer Window */}
          <div
            className={`relative w-full h-120 rounded-xl border flex items-center justify-center overflow-hidden p-8 transition-all ${
              darkMode
                ? "bg-zinc-950 border-zinc-800"
                : "bg-zinc-100/70 border-zinc-200"
            }`}
          >
            {/* Background Dot Grid */}
            <div
              className={`absolute inset-0 opacity-40 ${
                darkMode
                  ? "bg-[radial-gradient(#52525b_1px,transparent_1px)]"
                  : "bg-[radial-gradient(#94a3b8_1px,transparent_1px)]"
              } bg-size-[16px_16px]`}
            ></div>

            {/* Viewport size indicator badge */}
            {needsViewport && (
              <div className="absolute top-4 left-4 text-xs font-mono px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700 shadow-sm select-none z-10">
                viewport: {settings.viewportWidth} × {settings.viewportHeight}
              </div>
            )}

            {/* Central Element Box (Hidden entirely if value is 0) */}
            <div className="relative flex items-center justify-center">
              {computedPx > 0 && (
                <>
                  {/* Separate plane: Width Guide on Top (Dynamically expands outward when box is tiny) */}
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

                  {/* Separate plane: Height Guide on Left (Dynamically expands outward when box is tiny) */}
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
                      width: `${Math.max(4, Math.min(computedPx, 460))}px`,
                      height: `${Math.max(4, Math.min(computedPx, 340))}px`,
                    }}
                    className={`rounded-lg bg-zinc-800/40 border-2 border-zinc-500 flex items-center justify-center shadow-lg transition-all duration-300 ease-out relative group`}
                  >
                    {/* Render inner text if box is large enough (>= 50px) */}
                    {!isTooSmall && (
                      <div className="text-center p-2">
                        <div className="font-mono font-bold text-xs md:text-sm text-zinc-200 tracking-tight">
                          {value || 0}
                          {unit}
                        </div>
                        <div className="text-[10px] font-mono opacity-60">
                          ≈ {Math.round(computedPx)}px
                        </div>
                      </div>
                    )}

                    {/* Render external label to the right if box is too small (< 50px) */}
                    {isTooSmall && (
                      <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 select-none pointer-events-none whitespace-nowrap z-10">
                        <div className="w-2 h-px bg-zinc-500"></div>
                        <span className="bg-zinc-900 text-zinc-200 border border-zinc-700 text-[10px] font-mono px-2 py-0.5 rounded shadow-sm">
                          {value || 0}
                          {unit} (≈ {Math.round(computedPx)}px)
                        </span>
                      </div>
                    )}

                    <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-zinc-500"></div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-zinc-500"></div>
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-zinc-500"></div>
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-zinc-500"></div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Screen;
