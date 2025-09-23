// hooks/useDarkMode.ts
"use client";

import { useState, useEffect } from "react";

export function useDarkMode() {
  const [isDark, setIsDark] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Check if we're in a browser environment
    if (typeof window === "undefined") return;
    
    // Check if dark mode is enabled in localStorage 
    const savedTheme = localStorage.getItem("theme");    
    const initialTheme = (savedTheme=="light")? false : true;
    
    setIsDark(initialTheme);
    if (initialTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (typeof window === "undefined") return;
    
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return { isDark: isMounted ? isDark : false, toggleDarkMode };
}