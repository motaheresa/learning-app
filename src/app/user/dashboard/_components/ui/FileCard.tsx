// components/FileCard.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Eye, FileText } from "lucide-react";
import { File } from "@/types";

interface FileCardProps {
  file: File;
  index: number;
}

const FileCard = ({ file, index }: FileCardProps) => {
  return (
    <div
      className="group relative bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm rounded-2xl border border-slate-200/80 dark:border-slate-600/80 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-xl dark:hover:shadow-slate-900/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50/30 dark:to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative p-6">
        {/* File Icon */}
        <div className="flex items-start justify-between mb-6">
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-slate-700 opacity-90"></div>
          </div>
          
          {/* File Date */}
          {file.createdAt && (
            <div className="text-xs text-slate-500 dark:text-slate-400 text-left">
              {new Date(file.createdAt).toLocaleDateString('ar-SA')}
            </div>
          )}
        </div>
        
        {/* File Name */}
        <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-3 text-lg line-clamp-2 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-200">
          {file.name}
        </h3>
        
        {/* Class Badge */}
        {file.class && (
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/40 dark:to-green-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold rounded-full border border-emerald-200 dark:border-emerald-700">
              {file.class}
            </span>
          </div>
        )}
        
        {/* Description */}
        {file.description && (
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">
            {file.description}
          </p>
        )}
        
        {/* Action Buttons */}
        <div className="flex flex-col gap-3 pt-4 border-t border-slate-100 dark:border-slate-600">
          {/* View File Button */}
          <Link
            href={{
              pathname: "/view-file",
              query: { file: file.path },
            }}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg group-hover:shadow-blue-500/25"
          >
            <Eye className="w-4 h-4" />
            عرض الملف
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FileCard;