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
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/session", { cache: "no-store" });
        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  const logout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      setUser(null);
    }
  };

  return { user, loading, logout };
}
