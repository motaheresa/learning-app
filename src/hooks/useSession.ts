// src/hooks/useSession.ts
"use client";

import { useState, useEffect } from "react";

interface UserSession {
  id: string;
  email: string;
  role: string;
  name?: string;
}

export function useSession() {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user data from cookie or localStorage
    const getSession = () => {
      try {
        // Check if we're in a browser environment
        if (typeof window === "undefined") return;
        
        // Try to get from localStorage first (for demo purposes)
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
          setLoading(false);
          return;
        }
        
        // Fallback to checking cookies
        const cookieValue = document.cookie
          .split("; ")
          .find(row => row.startsWith("session_user="))
          ?.split("=")[1];
        
        if (cookieValue) {
          const userData = JSON.parse(decodeURIComponent(cookieValue));
          setUser(userData);
          // Also save to localStorage for easier access
          localStorage.setItem("user", JSON.stringify(userData));
        }
      } catch (error) {
        console.error("Error parsing session:", error);
      } finally {
        setLoading(false);
      }
    };

    getSession();
  }, []);

  const logout = async () => {
    try {
      // Call your logout API
      await fetch("/api/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      // Clear client-side storage
      document.cookie = "session_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setUser(null);
    }
  };

  return { user, loading, logout };
}