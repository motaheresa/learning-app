"use client";

import React from "react";
import { FileText, Frown, Search } from "lucide-react";

interface EmptyStateProps {
  hasSearchQuery: boolean;
  clearSearch: () => void;
}

const EmptyState = ({ hasSearchQuery, clearSearch }: EmptyStateProps) => {
  return (
    <div className="p-8 md:p-16 text-center animate-fade-in">
      <div className="relative ">
        <div className="w-20 h-20 md:w-32 md:h-32 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 dark:from-pink-800 dark:via-purple-800 dark:to-blue-800 rounded-full mx-auto mb-6 md:mb-8 flex items-center justify-center shadow-2xl animate-wiggle">
          {hasSearchQuery ? (
            <Search className="w-10 h-10 md:w-16 md:h-16 text-purple-500 dark:text-purple-400" />
          ) : (
            <FileText className="w-10 h-10 md:w-16 md:h-16 text-purple-500 dark:text-purple-400" />
          )}
        </div>
        
        {/* Floating decorative elements */}
        <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-4 h-4 md:w-8 md:h-8 bg-pink-400 rounded-full opacity-60 animate-float"></div>
        <div className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 w-3 h-3 md:w-6 md:h-6 bg-blue-400 rounded-full opacity-50 animate-float-delayed"></div>
        <div className="absolute top-1/2 -left-4 md:-left-8 w-2 h-2 md:w-4 md:h-4 bg-yellow-400 rounded-full opacity-70 animate-bounce"></div>
        <div className="absolute top-1/4 -right-4 md:-right-8 w-3 h-3 md:w-5 md:h-5 bg-green-400 rounded-full opacity-60 animate-pulse"></div>
      </div>
      
      <div className="animate-slide-in-up">
        <h3 className="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300 mb-3 md:mb-4 flex items-center justify-center gap-2">
          {hasSearchQuery ? (
            <>
              <Frown className="w-5 h-5 md:w-6 md:h-6" />
              😔 لا توجد نتائج بحث
            </>
          ) : (
            <>
              📂 لا توجد ملفات
            </>
          )}
        </h3>
        
        <p className="text-purple-600 dark:text-purple-400 mb-4 md:mb-6 text-base md:text-xl font-medium">
          {hasSearchQuery ? "🔍 جرب استخدام كلمات بحث أخرى" : "🎈 لم يتم العثور على أي ملفات في هذا القسم"}
        </p>
        
        {hasSearchQuery && (
          <button 
            onClick={clearSearch}
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 animate-pulse text-sm md:text-base"
          >
            ✨ مسح البحث
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;