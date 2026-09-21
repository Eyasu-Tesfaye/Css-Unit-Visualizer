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
  if (isNaN(num)) return { px: 0, formula: "Invalid value" };

  const { rootFontSize, parentFontSize, viewportWidth, viewportHeight } =
    settings;

  switch (unit) {
    case "px":
      return {
        px: num,
        formula: `${num}px is an absolute unit.`,
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

const Screen = () => {
  const [darkMode, setDarkMode] = useState(true);

  const [value, setValue] = useState("2");
  const [unit, setUnit] = useState("rem");
  const [rootFontSize, setRootFontSize] = useState("16");
  const [parentFontSize, setParentFontSize] = useState("16");
  const [viewportWidth, setViewportWidth] = useState("1440");
  const [viewportHeight, setViewportHeight] = useState("900");

  const settings = useMemo(
    () => ({
      rootFontSize: parseFloat(rootFontSize) || 16,
      parentFontSize: parseFloat(parentFontSize) || 16,
      viewportWidth: parseFloat(viewportWidth) || 1440,
      viewportHeight: parseFloat(viewportHeight) || 900,
    }),
    [rootFontSize, parentFontSize, viewportWidth, viewportHeight],
  );

  const conversion = useMemo(() => {
    return convertToPixels(value, unit, settings);
  }, [value, unit, settings]);

  const needsRoot = unit === "rem";
  const needsParent = unit === "em";

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-200 ${darkMode ? "bg-zinc-950 text-zinc-100" : "bg-zinc-50 text-zinc-900"}`}
    >
      {}
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
                v1.0
              </span>
            </h1>
            <p
              className={`text-xs ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}
            >
              See CSS units in action.
            </p>
          </div>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all flex items-center gap-2 ${
            darkMode
              ? "bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              : "bg-white border-zinc-300 text-zinc-700 hover:bg-zinc-100 shadow-sm"
          }`}
          title="Toggle Theme"
        >
          {darkMode ? (
            <>
              <svg
                className="w-3.5 h-3.5 text-zinc-300"
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
              <span>Dark Mode</span>
            </>
          ) : (
            <>
              <svg
                className="w-3.5 h-3.5 text-zinc-700"
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
              <span>Light Mode</span>
            </>
          )}
        </button>
      </header>

      {}
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
                  step="any"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
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

            <div
              className={`pt-4 border-t space-y-4 transition-all ${darkMode ? "border-zinc-800" : "border-zinc-100"}`}
            >
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                Context Settings
              </p>

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
                    value={rootFontSize}
                    onChange={(e) => setRootFontSize(e.target.value)}
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
                    value={parentFontSize}
                    onChange={(e) => setParentFontSize(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border font-mono text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 ${
                      darkMode
                        ? "bg-zinc-950 border-zinc-700 text-zinc-100"
                        : "bg-zinc-50 border-zinc-300 text-zinc-900"
                    }`}
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-medium opacity-80">
                      Viewport Width
                    </label>
                  </div>
                  <input
                    type="number"
                    value={viewportWidth}
                    onChange={(e) => setViewportWidth(e.target.value)}
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
                    value={viewportHeight}
                    onChange={(e) => setViewportHeight(e.target.value)}
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
                  min="320"
                  max="3840"
                  step="10"
                  value={viewportWidth}
                  onChange={(e) => setViewportWidth(e.target.value)}
                  className="w-full accent-zinc-500 cursor-pointer"
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
                  min="320"
                  max="3840"
                  step="10"
                  value={viewportHeight}
                  onChange={(e) => setViewportHeight(e.target.value)}
                  className="w-full accent-zinc-500 cursor-pointer"
                />
              </div>
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

        {}
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
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700">
                {Math.round(conversion.px)}px computed
              </span>
            </div>
          </div>

          <div
            className={`relative w-full h-112.5 rounded-xl border flex items-center justify-center overflow-hidden p-8 transition-all ${
              darkMode
                ? "bg-zinc-950 border-zinc-800"
                : "bg-zinc-100/70 border-zinc-200"
            }`}
          >
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#a1a1aa_1px,transparent_1px)] bg-size-[16px_16px]"></div>

            {["vw", "vh", "vmin", "vmax", "%"].includes(unit) && (
              <div className="absolute inset-4 border border-dashed border-zinc-500/30 rounded-lg pointer-events-none flex flex-col justify-between p-2">
                <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                  <span>
                    Viewport: {viewportWidth} × {viewportHeight}
                  </span>
                  <span>{unit} reference</span>
                </div>
                <div className="self-end text-[10px] font-mono text-zinc-400">
                  100{unit} scale
                </div>
              </div>
            )}

            <div className="relative flex items-center justify-center">
              <div className="absolute -top-7 left-0 right-0 flex items-center justify-center select-none pointer-events-none">
                <div className="h-px bg-zinc-500/60 w-full absolute"></div>
                <span className="bg-zinc-800 text-zinc-200 border border-zinc-700 text-[10px] font-mono px-2 py-0.5 rounded-full z-10 shadow-sm">
                  w: {Math.round(conversion.px)}px
                </span>
              </div>

              <div className="absolute -left-9 top-0 bottom-0 flex items-center justify-center select-none pointer-events-none">
                <div className="w-px bg-zinc-500/60 h-full absolute"></div>
                <span className="bg-zinc-800 text-zinc-200 border border-zinc-700 text-[10px] font-mono px-2 py-0.5 rounded-full z-10 shadow-sm -rotate-90 whitespace-nowrap">
                  h: {Math.round(conversion.px)}px
                </span>
              </div>

              <div
                style={{
                  width: `${Math.max(12, Math.min(conversion.px, 400))}px`,
                  height: `${Math.max(12, Math.min(conversion.px, 300))}px`,
                }}
                className={`rounded-lg bg-zinc-800/40 border-2 border-zinc-500 flex items-center justify-center shadow-lg transition-all duration-300 ease-out relative group`}
              >
                <div className="text-center p-2">
                  <div className="font-mono font-bold text-xs md:text-sm text-zinc-200 tracking-tight">
                    {value || 0}
                    {unit}
                  </div>
                  <div className="text-[10px] font-mono opacity-60">
                    ≈ {Math.round(conversion.px)}px
                  </div>
                </div>

                <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-zinc-500"></div>
                <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-zinc-500"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-zinc-500"></div>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-zinc-500"></div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs opacity-70 gap-2 pt-4 border-t border-zinc-700/30">
            <div>
              <span>
                Box dimensions are clamped for preview display if exceeding
                canvas bounds.
              </span>
            </div>
            <div className="font-mono">
              CSS Unit Visualizer • Built with React & Tailwind CSS
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Screen;
