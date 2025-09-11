"use client";

import React, { useState, useEffect } from "react";
import { FileText, Sparkles } from "lucide-react";
import FileSearch from "./ui/FileSearch";
import FileGrid from "./ui/FileGrid";
import EmptyState from "./ui/EmptyState";
import { File } from "../_types";

interface FilesSectionProps {
  files: File[];
}

const FilesSection = ({ files }: FilesSectionProps) => {
  const [filteredFiles, setFilteredFiles] = useState<File[]>(files);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter files based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredFiles(files);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = files.filter(file => 
      file.name.toLowerCase().includes(query) || 
      (file.description && file.description.toLowerCase().includes(query)) ||
      (file.class && file.class.toLowerCase().includes(query))
    );
    
    setFilteredFiles(filtered);
  }, [searchQuery, files]);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 backdrop-blur-xl rounded-3xl border-2 border-blue-200/50 dark:border-purple-700/50 shadow-2xl dark:shadow-purple-900/40 overflow-hidden animate-scale-in">
      {/* Enhanced Header with animations */}
      <div className="p-4 md:p-8 border-b-2 border-purple-200/60 dark:border-purple-700/60 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 dark:from-pink-900/20 dark:via-purple-900/20 dark:to-blue-900/20 relative overflow-hidden">
        {/* Floating sparkles */}
        <Sparkles className="absolute top-2 right-2 md:top-4 md:right-4 w-4 h-4 md:w-6 md:h-6 text-yellow-400 animate-twinkle" />
        <Sparkles className="absolute top-4 left-4 md:top-8 md:left-8 w-3 h-3 md:w-4 md:h-4 text-pink-400 animate-twinkle" style={{animationDelay: '1s'}} />
        <Sparkles className="absolute bottom-2 right-1/3 md:bottom-4 md:right-1/3 w-3 h-3 md:w-5 md:h-5 text-blue-400 animate-twinkle" style={{animationDelay: '0.5s'}} />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-4 relative z-10">
          <div className="flex items-center space-x-3 md:space-x-4 space-x-reverse animate-slide-in-up">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl hover:rotate-12 transition-all duration-300 ">
              <FileText className="w-5 h-5 md:w-8 md:h-8 text-white animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl md:text-3xl font-black text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text animate-gradient">
                📁 الملفات
              </h2>
              <p className="text-purple-600 dark:text-purple-400 text-sm md:text-lg font-semibold">
                🎈 {filteredFiles.length} ملف متاح للاستمتاع
              </p>
            </div>
          </div>
          
          <div className="animate-slide-in-up w-full md:w-auto" style={{animationDelay: '0.2s'}}>
            <FileSearch 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
            />
          </div>
          
          <div className="text-purple-600 dark:text-purple-400 text-sm md:text-lg font-bold bg-gradient-to-r from-yellow-200 via-pink-200 to-blue-200 dark:from-yellow-900/40 dark:via-pink-900/40 dark:to-blue-900/40 px-4 py-2 md:px-6 md:py-3 rounded-2xl shadow-lg ">
            🌟 المجموع: {filteredFiles.length}
          </div>
        </div>
      </div>

      {/* Content */}
      {filteredFiles.length === 0 ? (
        <EmptyState 
          hasSearchQuery={!!searchQuery} 
          clearSearch={() => setSearchQuery("")} 
        />
      ) : (
        <FileGrid files={filteredFiles} />
      )}
    </div>
  );
};

export default FilesSection;