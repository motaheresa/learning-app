// src/app/classes/components/StatsCards.tsx
import { TrendingUp, Users, GraduationCap, BookOpen } from "lucide-react";
import { StatsCardsProps } from '../types/class';

export const StatsCards = ({ 
  classesCount, 
  totalStudents = 156, 
  totalFiles = 89, 
  averageFilesPerClass = 0 
}: StatsCardsProps) => {
  const stats = [
    {
      title: "Total Students",
      value: totalStudents,
      icon: Users,
      color: "blue",
      trend: "+12%",
      trendText: "vs last month"
    },
    {
      title: "Active Classes",
      value: classesCount,
      icon: GraduationCap,
      color: "green",
      trend: "+3",
      trendText: "new this month"
    },
    {
      title: "Total Files",
      value: totalFiles,
      icon: BookOpen,
      color: "purple",
      trend: "+8",
      trendText: "files this week"
    },
    {
      title: "Avg Files/Class",
      value: averageFilesPerClass,
      icon: BookOpen,
      color: "orange",
      trendText: "Per class average"
    }
  ];

  const colorClasses = {
    blue: {
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-600 dark:text-blue-400"
    },
    green: {
      bg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-600 dark:text-green-400"
    },
    purple: {
      bg: "bg-purple-100 dark:bg-purple-900/30",
      text: "text-purple-600 dark:text-purple-400"
    },
    orange: {
      bg: "bg-orange-100 dark:bg-orange-900/30",
      text: "text-orange-600 dark:text-orange-400"
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 border border-slate-200 dark:border-gray-700 shadow-sm transition-colors">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-slate-600 dark:text-gray-300 text-sm font-medium truncate">
                {stat.title}
              </p>
              <p className="text-2xl font-bold text-slate-800 dark:text-gray-100 mt-1 transition-colors">
                {stat.value}
              </p>
            </div>
            <div className={`p-3 ${colorClasses[stat.color as keyof typeof colorClasses].bg} rounded-lg flex-shrink-0`}>
              <stat.icon className={`w-6 h-6 ${colorClasses[stat.color as keyof typeof colorClasses].text}`} />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3 text-sm">
            {stat.trend && (
              <>
                <TrendingUp className="w-4 h-4 text-green-500 dark:text-green-400 flex-shrink-0" />
                <span className="text-green-600 dark:text-green-400 font-medium">{stat.trend}</span>
              </>
            )}
            <span className="text-slate-500 dark:text-gray-400 truncate">{stat.trendText}</span>
          </div>
        </div>
      ))}
    </div>
  );
};