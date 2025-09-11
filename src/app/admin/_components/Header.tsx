"use client";

import { useEffect, useState, useCallback, memo } from "react";
import { Bell, Search, User, Clock, Calendar, Menu, X } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useSession } from "@/hooks/useSession";

interface HeaderProps {
  onMenuClick: () => void;
}

// Memoized component to prevent unnecessary re-renders
const DateTimeDisplay = memo(() => {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
      setDate(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        })
      );
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Desktop Date/Time */}
      <div className="hidden md:flex items-center gap-4 text-sm text-slate-600 dark:text-gray-300">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 flex-shrink-0" />
          <span className="font-medium hidden lg:inline">{date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 flex-shrink-0" />
          <span className="font-mono">{time}</span>
        </div>
      </div>

      {/* Mobile Date/Time - Only shown when search is not open */}
      <div className="md:hidden flex items-center gap-4 text-sm text-slate-600 dark:text-gray-300">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 flex-shrink-0" />
          <span className="font-mono">{time}</span>
        </div>
      </div>
    </>
  );
});

DateTimeDisplay.displayName = "DateTimeDisplay";

// Search component to reduce duplication
const SearchBar = ({ isMobile = false, autoFocus = false, onClose }: { 
  isMobile?: boolean; 
  autoFocus?: boolean;
  onClose?: () => void;
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchValue);
    if (onClose) onClose();
  }, [searchValue, onClose]);

  if (isMobile) {
    return (
      <div className="lg:hidden w-full absolute left-0 top-full mt-1 px-4 py-2 bg-white dark:bg-gray-800 border-b border-slate-200 dark:border-gray-700 shadow-md">
        <form onSubmit={handleSearch} className="relative w-full flex items-center">
          <div className="relative w-full flex items-center">
            <Search className="w-4 h-4 absolute left-3 text-slate-400 dark:text-gray-500" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search files, classes..."
              className="w-full pl-10 pr-12 py-2 bg-slate-50 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 dark:text-gray-100 placeholder-slate-500 dark:placeholder-gray-400"
              autoFocus={autoFocus}
            />
            <button
            aria-label="close"
              type="button"
              onClick={onClose}
              className="absolute right-3 p-1 text-slate-400 dark:text-gray-500 hover:text-slate-600 dark:hover:text-gray-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <form className="relative hidden lg:flex flex-1 max-w-md mx-4">
      <div className="relative w-full">
        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-gray-500" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search files, classes..."
          className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 dark:text-gray-100 placeholder-slate-500 dark:placeholder-gray-400"
        />
      </div>
    </form>
  );
};

export default function Header({ onMenuClick }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const { isDark } = useDarkMode();
  const { user } = useSession();

  // Close search when clicking outside (for mobile)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchOpen && !(event.target as Element).closest('.mobile-search-container')) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchOpen]);

  // Close search when pressing Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [searchOpen]);

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-slate-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8 py-3 shadow-sm transition-colors sticky top-0 z-40">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Left Section */}
        <div className="flex items-center gap-3 sm:gap-4 flex-1">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent whitespace-nowrap">
            Dashboard
          </h1>
          
          {/* Desktop Search Bar */}
          <SearchBar />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="lg:hidden p-2 text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label={searchOpen ? "Close search" : "Open search"}
          >
            {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </button>

          <DateTimeDisplay />

          {/* Notifications - Hidden on small mobile */}
          <button 
            className="relative p-2 text-slate-600 dark:text-gray-300 hover:text-slate-800 dark:hover:text-gray-100 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg transition-colors hidden xs:block"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-slate-200 dark:border-gray-700">
            <div className="hidden sm:block text-right">
              <div className="text-sm font-semibold text-slate-800 dark:text-gray-100 whitespace-nowrap">
                {user?.name || user?.email || "User"}
              </div>
              <div className="text-xs text-slate-500 dark:text-gray-400 capitalize">
                {user?.role?.toLowerCase() || "user"}
              </div>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {searchOpen && (
        <div className="mobile-search-container">
          <SearchBar isMobile autoFocus onClose={() => setSearchOpen(false)} />
        </div>
      )}
    </header>
  );
}