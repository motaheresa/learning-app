// Enhanced ThemeToggle.tsx with playful styling
"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-2xl bg-gradient-to-r from-yellow-200 via-orange-200 to-pink-200 dark:from-blue-800 dark:via-purple-800 dark:to-indigo-800 hover:from-yellow-300 hover:via-orange-300 hover:to-pink-300 dark:hover:from-blue-700 dark:hover:via-purple-700 dark:hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 "
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? (
        <Sun className="w-6 h-6 text-yellow-600 animate-spin-slow" />
      ) : (
        <Moon className="w-6 h-6 text-blue-700 animate-pulse" />
      )}
    </button>
  );
};

export default ThemeToggle;