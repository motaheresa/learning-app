// components/FilesSection.tsx
"use client";

import React, { useState, useEffect } from "react";
import { FileText } from "lucide-react";
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
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg dark:shadow-slate-900/25 overflow-hidden">
      {/* Header */}
      <div className="p-8 border-b border-slate-200/60 dark:border-slate-700/60 bg-gradient-to-r from-white to-slate-50 dark:from-slate-800 dark:to-slate-700">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                الملفات
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                {filteredFiles.length} ملف متاح
              </p>
            </div>
          </div>
          
          <FileSearch 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
          />
          
          <div className="text-slate-500 dark:text-slate-400 text-sm bg-slate-100 dark:bg-slate-700 px-4 py-2 rounded-lg">
            المجموع: {filteredFiles.length}
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