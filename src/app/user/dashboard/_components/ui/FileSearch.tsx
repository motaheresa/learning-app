"use client";

import React from "react";
import { Search, Sparkles } from "lucide-react";

interface FileSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const FileSearch = ({ searchQuery, setSearchQuery }: FileSearchProps) => {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-500 w-4 h-4 md:w-6 md:h-6 animate-pulse" />
      <Sparkles className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400 w-3 h-3 md:w-5 md:h-5 animate-twinkle" />
      <input
        type="text"
        placeholder="🔍 ابحث عن ملف..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-12 py-2 md:pl-12 md:pr-14 md:py-4 bg-gradient-to-r from-white via-pink-50 to-purple-50 dark:from-slate-700 dark:via-purple-900/30 dark:to-blue-900/30 rounded-2xl border-2 border-pink-200 dark:border-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-400 text-purple-800 dark:text-purple-200 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm md:text-base"
        dir="rtl"
      />
    </div>
  );
};

export default FileSearch;