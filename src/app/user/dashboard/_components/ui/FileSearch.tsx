// components/FileSearch.tsx
"use client";

import React from "react";
import { Search } from "lucide-react";

interface FileSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const FileSearch = ({ searchQuery, setSearchQuery }: FileSearchProps) => {
  return (
    <div className="relative flex-1 max-w-md">
      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
      <input
        type="text"
        placeholder="ابحث عن ملف..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 dark:text-slate-200"
        dir="rtl"
      />
    </div>
  );
};

export default FileSearch;