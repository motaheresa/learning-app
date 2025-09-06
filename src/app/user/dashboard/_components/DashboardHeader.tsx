// components/DashboardHeader.tsx
"use client";

import React, { useState, useEffect } from "react";
import { FileText, Calendar, Clock } from "lucide-react";
import ThemeToggle from "./ui/ThemeToggle";
import LogoutButton from "./ui/LogoutButton";
import { useSession } from "@/hooks/useSession";

const DashboardHeader = () => {
  const { user } = useSession();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Format date in Arabic
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // Format time in Arabic
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(date);
  };

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mb-8">
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg dark:shadow-slate-900/25 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent mb-2">
              لوحة التحكم
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              إدارة ملفاتك والوصول إليها بسهولة
            </p>
            
            {/* Date and Time Display */}
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(currentDateTime)}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Clock className="w-5 h-5" />
                <span>{formatTime(currentDateTime)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 space-x-reverse">
            {/* User Info */}
            {user && (
              <div className="hidden md:flex flex-col items-end mr-4">
                <span className="text-slate-700 dark:text-slate-300 font-medium">
                  {user.name || user.email}
                </span>
                <span className="text-slate-500 dark:text-slate-400 text-sm">
                  {user.role === 'admin' ? 'مدير' : 'مستخدم'}
                </span>
              </div>
            )}
            
            <ThemeToggle />
            <LogoutButton />
            
            <div className="hidden md:flex items-center space-x-4 space-x-reverse">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;