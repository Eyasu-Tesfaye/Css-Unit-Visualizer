"use client";

import React from "react";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode }) => {
  return (
    <header
      className={`border-b px-3 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md shrink-0 ${
        darkMode
          ? "border-zinc-800 bg-zinc-950/80"
          : "border-zinc-200 bg-white/80"
      }`}
    >
      <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0 mr-2">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white font-bold text-sm shadow-sm font-mono shrink-0">
          px
        </div>
        <div className="min-w-0">
          <h1 className="text-xs sm:text-base md:text-lg font-semibold tracking-tight flex items-center gap-1.5 sm:gap-2 truncate">
            <span className="truncate">CSScope</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-zinc-800 text-zinc-300 border border-zinc-700 shrink-0">
              V1.0
            </span>
          </h1>
          <p
            className={`text-[10px] sm:text-xs truncate ${
              darkMode ? "text-zinc-400" : "text-zinc-500"
            }`}
          >
            Learn how CSS units work in real-time.
          </p>
        </div>
      </div>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`p-2 rounded-md text-xs font-medium transition-all flex items-center justify-center shrink-0 ${
          darkMode
            ? "text-zinc-300 hover:bg-zinc-800"
            : "text-zinc-700 hover:bg-zinc-100"
        }`}
        title="Toggle Theme"
      >
        {darkMode ? (
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-300"
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
            className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-700"
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
  );
};
