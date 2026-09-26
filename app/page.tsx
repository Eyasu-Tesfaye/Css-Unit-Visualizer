"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { ControlPanel } from "@/components/ControlPanel";
import { VisualizerCanvas } from "@/components/VisualizerCanvas";

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

export default function Page() {
  const [darkMode, setDarkMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
  const isTiny = computedPx < 70;

  const isMobile = windowWidth < 640;
  const maxWidthCap = isMobile ? 320 : 520;
  const maxHeightCap = isMobile ? 480 : 380;

  return (
    <div
      className={`h-screen w-screen flex flex-col font-sans transition-colors duration-200 overflow-hidden ${
        darkMode ? "bg-zinc-950 text-zinc-100" : "bg-zinc-50 text-zinc-900"
      }`}
    >
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="flex-1 flex relative overflow-hidden">
        {/* Mobile Backdrop */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="absolute inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-xs transition-opacity"
          />
        )}

        <aside
          className={`absolute lg:relative z-40 inset-y-0 left-0 w-80 sm:w-96 border-r flex flex-col transition-all duration-300 ease-in-out shadow-2xl lg:shadow-none shrink-0 ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:w-0 lg:border-r-0 lg:overflow-hidden"
          } ${
            darkMode
              ? "bg-zinc-950/95 border-zinc-800 backdrop-blur-md"
              : "bg-white/95 border-zinc-200 backdrop-blur-md"
          }`}
        >
          <div className="p-4 sm:p-5 pb-3 flex items-center justify-between border-b border-zinc-700/30">
            <h2 className="text-xs sm:text-sm font-semibold tracking-wide uppercase text-zinc-400">
              Control Panel
            </h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-zinc-400 hover:text-zinc-100 p-1 rounded"
            >
              ✕
            </button>
          </div>

          <div className="p-4 sm:p-5 flex-1 overflow-y-auto">
            <ControlPanel
              darkMode={darkMode}
              value={value}
              setValue={setValue}
              unit={unit}
              setUnit={setUnit}
              rootFontSize={rootFontSize}
              setRootFontSize={setRootFontSize}
              parentFontSize={parentFontSize}
              setParentFontSize={setParentFontSize}
              viewportWidth={viewportWidth}
              setViewportWidth={setViewportWidth}
              viewportHeight={viewportHeight}
              setViewportHeight={setViewportHeight}
              conversion={conversion}
              unitDescription={getUnitDescription(unit)}
              needsRoot={needsRoot}
              needsParent={needsParent}
              needsViewport={needsViewport}
            />
          </div>
        </aside>

        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`absolute top-4 z-40 p-2 rounded-r-lg border-y border-r shadow-xl transition-all duration-300 flex items-center justify-center ${
            isSidebarOpen ? "left-80 sm:left-96" : "left-0"
          } ${
            darkMode
              ? "bg-zinc-900 border-zinc-700 text-zinc-200 hover:bg-zinc-800"
              : "bg-white border-zinc-300 text-zinc-800 hover:bg-zinc-100"
          }`}
          title={
            isSidebarOpen ? "Collapse Control Panel" : "Expand Control Panel"
          }
        >
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${
              isSidebarOpen ? "" : "rotate-180"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <main className="flex-1 flex flex-col relative overflow-auto items-center justify-center w-full h-full">
          <VisualizerCanvas
            darkMode={darkMode}
            computedPx={computedPx}
            value={value}
            unit={unit}
            needsViewport={needsViewport}
            viewportWidth={viewportWidth}
            viewportHeight={viewportHeight}
            isTiny={isTiny}
            isTooSmall={isTooSmall}
            maxWidthCap={maxWidthCap}
            maxHeightCap={maxHeightCap}
          />
        </main>
      </div>
    </div>
  );
}
