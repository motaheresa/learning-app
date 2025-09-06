// components/EmptyState.tsx
"use client";

import React from "react";
import { FileText } from "lucide-react";

interface EmptyStateProps {
  hasSearchQuery: boolean;
  clearSearch: () => void;
}

const EmptyState = ({ hasSearchQuery, clearSearch }: EmptyStateProps) => {
  return (
    <div className="p-16 text-center">
      <div className="relative">
        <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-inner">
          <FileText className="w-12 h-12 text-slate-400 dark:text-slate-500" />
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-slate-300 dark:bg-slate-600 rounded-full opacity-60"></div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-slate-200 dark:bg-slate-700 rounded-full opacity-40"></div>
      </div>
      <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-3">
        {hasSearchQuery ? "لا توجد نتائج بحث" : "لا توجد ملفات"}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 mb-2 text-lg">
        {hasSearchQuery ? "جرب استخدام كلمات بحث أخرى" : "لم يتم العثور على أي ملفات في هذا القسم"}
      </p>
      {hasSearchQuery && (
        <button 
          onClick={clearSearch}
          className="text-blue-600 dark:text-blue-400 hover:underline mt-4"
        >
          مسح البحث
        </button>
      )}
    </div>
  );
};

export default EmptyState;