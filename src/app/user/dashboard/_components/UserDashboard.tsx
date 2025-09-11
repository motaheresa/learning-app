"use client";

import React from "react";
import DashboardHeader from "./DashboardHeader";
import FilesSection from "./FilesSection";
import { useSession } from "@/hooks/useSession";
import { File } from "../_types";

interface UserDashboardProps {
  files: File[];
  classId?: string;
}

const UserDashboard = ({ files, classId }: UserDashboardProps) => {
  const { loading: sessionLoading } = useSession();

  if (sessionLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 dark:from-pink-900 dark:via-purple-900 dark:to-blue-900 flex items-center justify-center relative overflow-hidden p-4">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-16 h-16 md:w-32 md:h-32 bg-pink-300 rounded-full blur-3xl opacity-30 animate-float"></div>
          <div className="absolute top-3/4 right-1/4 w-20 h-20 md:w-40 md:h-40 bg-purple-300 rounded-full blur-3xl opacity-20 animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/3 w-12 h-12 md:w-24 md:h-24 bg-blue-300 rounded-full blur-2xl opacity-25 animate-bounce"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-4 border-transparent border-t-pink-500 border-r-purple-500 border-b-blue-500 mb-4"></div>
          <p className="text-purple-600 font-semibold text-base md:text-lg animate-pulse">🎈 جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 via-blue-100 to-green-100 dark:from-pink-900/30 dark:via-purple-900/30 dark:via-blue-900/30 dark:to-green-900/30 p-4 md:p-6 relative overflow-hidden" dir="rtl">
      {/* Animated background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-10 h-10 md:w-20 md:h-20 bg-pink-300 rounded-full blur-2xl opacity-20 animate-float"></div>
        <div className="absolute top-32 right-20 w-8 h-8 md:w-16 md:h-16 bg-purple-300 rounded-full blur-xl opacity-25 animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/3 w-12 h-12 md:w-24 md:h-24 bg-blue-300 rounded-full blur-2xl opacity-15 animate-bounce"></div>
        <div className="absolute bottom-32 right-1/4 w-10 h-10 md:w-18 md:h-18 bg-yellow-300 rounded-full blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-1/2 right-10 w-8 h-8 md:w-14 md:h-14 bg-green-300 rounded-full blur-lg opacity-30 animate-float-delayed"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <DashboardHeader />
        <FilesSection files={files} />
      </div>
    </div>
  );
};

export default UserDashboard;