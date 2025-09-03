"use client";

import { useEffect, useState } from "react";
import { Bell, Search, User, Clock, Calendar, Menu } from "lucide-react";
import { useDarkMode } from "../layout";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [searchOpen, setSearchOpen] = useState(false);
  const { isDark } = useDarkMode();

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }));
      setDate(now.toLocaleDateString('en-US', { 
        weekday: 'long',
        month: 'short', 
        day: 'numeric' 
      }));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-slate-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8 py-4 shadow-sm transition-colors">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
            Dashboard
          </h1>
          
          {/* Desktop Search Bar */}
          <div className="relative hidden lg:flex">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search files, classes..."
              className="pl-10 pr-4 py-2 w-80 bg-slate-50 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 dark:text-gray-100 placeholder-slate-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="lg:hidden p-2 text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Date & Time */}
          <div className="hidden xl:flex items-center gap-4 text-sm text-slate-600 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="font-medium">{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="font-mono">{time}</span>
            </div>
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-slate-600 dark:text-gray-300 hover:text-slate-800 dark:hover:text-gray-100 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-gray-700">
            <div className="hidden sm:block text-right">
              <div className="text-sm font-semibold text-slate-800 dark:text-gray-100">
                Admin User
              </div>
              <div className="text-xs text-slate-500 dark:text-gray-400">
                Administrator
              </div>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {searchOpen && (
        <div className="lg:hidden mt-4 pt-4 border-t border-slate-200 dark:border-gray-700">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search files, classes..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 dark:text-gray-100 placeholder-slate-500 dark:placeholder-gray-400"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile Date/Time */}
      <div className="xl:hidden mt-4 pt-4 border-t border-slate-200 dark:border-gray-700 flex items-center justify-center gap-6 text-sm text-slate-600 dark:text-gray-300">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span className="font-medium">{date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span className="font-mono">{time}</span>
        </div>
      </div>
    </header>
  );
}