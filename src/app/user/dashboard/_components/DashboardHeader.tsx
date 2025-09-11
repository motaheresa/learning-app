"use client";

import React, { useState, useEffect } from "react";
import { FileText, Calendar, Clock, Star, Heart } from "lucide-react";
import ThemeToggle from "./ui/ThemeToggle";
import LogoutButton from "./ui/LogoutButton";
import { useSession } from "@/hooks/useSession";

const DashboardHeader = () => {
  const { user } = useSession();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Format date in Arabic
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // Format time in Arabic
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(date);
  };

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mb-6 md:mb-8 animate-bounce-in">
      {/* Floating decorative elements */}
      <div className="absolute top-10 left-10 w-6 h-6 md:w-8 md:h-8 bg-pink-400 rounded-full animate-float opacity-60"></div>
      <div className="absolute top-32 right-20 w-5 h-5 md:w-6 md:h-6 bg-yellow-400 rounded-full animate-float-delayed opacity-70"></div>
      <div className="absolute top-20 right-1/3 w-3 h-3 md:w-4 md:h-4 bg-green-400 rounded-full animate-bounce opacity-50"></div>
      
      <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 dark:from-purple-900/40 dark:via-pink-900/30 dark:to-blue-900/40 backdrop-blur-xl rounded-3xl border-2 border-pink-200/50 dark:border-purple-700/50 shadow-2xl dark:shadow-purple-900/25 p-4 md:p-8 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-10 h-10 md:w-16 md:h-16 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="absolute top-8 right-8 w-8 h-8 md:w-12 md:h-12 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-4 left-1/3 w-6 h-6 md:w-8 md:h-8 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-8 right-1/4 w-7 h-7 md:w-10 md:h-10 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 relative z-10">
          <div className="animate-slide-in-right w-full md:w-auto">
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <h1 className="text-2xl md:text-4xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent animate-gradient">
                لوحة التحكم
              </h1>
              <Star className="w-5 h-5 md:w-8 md:h-8 text-yellow-500 animate-spin-slow" />
              <Heart className="w-4 h-4 md:w-6 md:h-6 text-pink-500 animate-heartbeat" />
            </div>
            <p className="text-purple-700 dark:text-purple-300 text-base md:text-xl font-semibold mb-3 md:mb-4">
              🎉 إدارة ملفاتك والوصول إليها بسهولة 🎉
            </p>
            
            {/* Enhanced Date and Time Display */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-6 mt-3 md:mt-4">
              <div className="flex items-center gap-2 md:gap-3 text-purple-600 dark:text-purple-400 bg-white/60 dark:bg-purple-900/30 rounded-2xl px-3 py-1 md:px-4 md:py-2 shadow-lg">
                <Calendar className="w-4 h-4 md:w-6 md:h-6 text-pink-500" />
                <span className="font-semibold text-sm md:text-base">{formatDate(currentDateTime)}</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3 text-purple-600 dark:text-purple-400 bg-white/60 dark:bg-purple-900/30 rounded-2xl px-3 py-1 md:px-4 md:py-2 shadow-lg" style={{animationDelay: '0.5s'}}>
                <Clock className="w-4 h-4 md:w-6 md:h-6 text-blue-500" />
                <span className="font-semibold text-sm md:text-base">{formatTime(currentDateTime)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between w-full md:w-auto space-x-3 md:space-x-4 space-x-reverse animate-slide-in-left">
            {/* Enhanced User Info */}
            {user && (
              <div className="flex flex-col items-end bg-white/70 dark:bg-purple-900/40 rounded-2xl p-2 md:p-4 shadow-lg ">
                <span className="text-purple-800 dark:text-purple-200 font-bold text-sm md:text-lg">
                  👋 {user.name || user.email}
                </span>
                <span className="text-purple-600 dark:text-purple-400 text-xs md:text-sm font-medium">
                  {user.role === 'ADMIN' ? '👑 مدير' : '🎓 مستخدم'}
                </span>
              </div>
            )}
            
            <div className="flex gap-2 md:gap-3">
              {/* <ThemeToggle /> */}
              <LogoutButton />
            </div>
            
            <div className="hidden md:flex items-center space-x-4 space-x-reverse">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-2xl  hover:animate-spin-slow transition-all duration-300">
                <FileText className="w-6 h-6 md:w-10 md:h-10 text-white animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;