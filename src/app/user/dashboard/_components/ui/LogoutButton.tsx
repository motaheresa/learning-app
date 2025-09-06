// components/LogoutButton.tsx
"use client";

import React from "react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/useSession";

const LogoutButton = () => {
  const router = useRouter();
  const { logout } = useSession();

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex items-center gap-2"
      aria-label="Logout"
    >
      <LogOut className="w-5 h-5 text-slate-700 dark:text-slate-300" />
      <span className="text-slate-700 dark:text-slate-300 hidden sm:inline">
        تسجيل الخروج
      </span>
    </button>
  );
};

export default LogoutButton;