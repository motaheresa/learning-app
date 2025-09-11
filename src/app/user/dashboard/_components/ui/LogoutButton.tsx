// Enhanced LogoutButton.tsx with playful styling
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
      className="p-3 rounded-2xl bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 dark:from-pink-800 dark:via-purple-800 dark:to-blue-800 hover:from-pink-300 hover:via-purple-300 hover:to-blue-300 dark:hover:from-pink-700 dark:hover:via-purple-700 dark:hover:to-blue-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 "
      aria-label="Logout"
    >
      <LogOut className="w-6 h-6 text-purple-700 dark:text-purple-300" />
      <span className="text-purple-700 dark:text-purple-300 hidden sm:inline font-semibold">
        👋 تسجيل الخروج
      </span>
    </button>
  );
};

export default LogoutButton;