"use client";

import React from "react";
import Link from "next/link";
import { Eye, FileText, Star } from "lucide-react";
import { File } from "../../_types";

interface FileCardProps {
  file: File;
  index: number;
}

const FileCard = ({ file, index }: FileCardProps) => {
  return (
    <div
      className="group relative bg-gradient-to-br from-white via-pink-50 to-purple-50 dark:from-slate-800 dark:via-purple-900/20 dark:to-blue-900/20 backdrop-blur-sm rounded-3xl border-2 border-pink-200/80 dark:border-purple-600/80 hover:border-pink-400 dark:hover:border-purple-400 hover:shadow-2xl dark:hover:shadow-purple-900/60 transition-all duration-500 hover:-translate-y-2 hover:rotate-1 overflow-hidden animate-fade-in-up"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100/20 via-purple-100/20 to-blue-100/20 dark:from-pink-900/10 dark:via-purple-900/10 dark:to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Floating stars */}
      <Star className="absolute top-2 right-2 w-3 h-3 md:w-4 md:h-4 text-yellow-400 opacity-0 group-hover:opacity-100 animate-twinkle transition-opacity duration-300" />
      <Star className="absolute top-4 left-4 w-2 h-2 md:w-3 md:h-3 text-pink-400 opacity-0 group-hover:opacity-100 animate-twinkle transition-opacity duration-300" style={{animationDelay: '0.5s'}} />
      
      <div className="relative p-4 md:p-6">
        {/* Enhanced File Icon */}
        <div className="flex items-start justify-between mb-4 md:mb-6">
          <div className="relative">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-2xl group-hover:shadow-pink-500/50 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 ">
              <FileText className="w-5 h-5 md:w-8 md:h-8 text-white animate-pulse" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 md:w-6 md:h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 md:border-3 border-white dark:border-slate-700 opacity-90 animate-heartbeat"></div>
          </div>
          
          {/* Enhanced File Date */}
          {file.createdAt && (
            <div className="text-xs text-purple-600 dark:text-purple-400 text-left bg-white/60 dark:bg-purple-900/30 px-2 py-1 md:px-3 md:py-1 rounded-full font-semibold">
              📅 {new Date(file.createdAt).toLocaleDateString('ar-SA')}
            </div>
          )}
        </div>
        
        {/* Enhanced File Name */}
        <h3 className="font-black text-purple-800 dark:text-purple-200 mb-3 md:mb-4 text-base md:text-xl line-clamp-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">
          📄 {file.name}
        </h3>
        
        {/* Enhanced Class Badge */}
        {file.class && (
          <div className="mb-3 md:mb-4">
            <span className="inline-flex items-center px-3 py-1 md:px-4 md:py-2 bg-gradient-to-r from-emerald-200 via-green-200 to-teal-200 dark:from-emerald-900/60 dark:via-green-900/60 dark:to-teal-900/60 text-emerald-800 dark:text-emerald-200 text-xs md:text-sm font-bold rounded-2xl border-2 border-emerald-300 dark:border-emerald-600 shadow-lg animate-wiggle">
              🎓 {file.class}
            </span>
          </div>
        )}
        
        {/* Enhanced Description */}
        {file.description && (
          <p className="text-purple-700 dark:text-purple-400 text-xs md:text-sm mb-4 md:mb-6 line-clamp-3 leading-relaxed font-medium">
            ✨ {file.description}
          </p>
        )}
        
        {/* Enhanced Action Button */}
        <div className="flex flex-col gap-2 md:gap-3 pt-3 md:pt-4 border-t-2 border-pink-200 dark:border-purple-600">
          <Link
            href={{
              pathname: "/view-file",
              query: { file: file.path },
            }}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 md:gap-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white font-bold py-2 md:py-4 px-4 md:px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 text-sm md:text-base"
          >
            👀 عرض الملف
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FileCard;