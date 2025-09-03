"use client";
import AddClassForm from "@/features/classes/components/AddClassForm";
import { ClassList } from "@/features/classes/components/ClassList";
import { useClasses } from "@/features/classes/hooks/useClasses";
import { GraduationCap, TrendingUp, Users, BookOpen } from "lucide-react";

export default function ClassesPage() {
  const { classes, reload } = useClasses();

  // Mock data for demonstration
  const stats = {
    totalStudents: 156,
    activeClasses: classes.length,
    totalFiles: 89,
    averageFilesPerClass: classes.length > 0 ? Math.round(89 / classes.length) : 0
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-gray-100 mb-2 transition-colors">
          Class Management
        </h1>
        <p className="text-slate-600 dark:text-gray-300 transition-colors">
          Organize and manage your educational classes
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Students Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 border border-slate-200 dark:border-gray-700 shadow-sm transition-colors">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-slate-600 dark:text-gray-300 text-sm font-medium truncate">
                Total Students
              </p>
              <p className="text-2xl font-bold text-slate-800 dark:text-gray-100 mt-1 transition-colors">
                {stats.totalStudents}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex-shrink-0">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 dark:text-green-400 flex-shrink-0" />
            <span className="text-green-600 dark:text-green-400 font-medium">+12%</span>
            <span className="text-slate-500 dark:text-gray-400 truncate">vs last month</span>
          </div>
        </div>

        {/* Active Classes Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 border border-slate-200 dark:border-gray-700 shadow-sm transition-colors">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-slate-600 dark:text-gray-300 text-sm font-medium truncate">
                Active Classes
              </p>
              <p className="text-2xl font-bold text-slate-800 dark:text-gray-100 mt-1 transition-colors">
                {stats.activeClasses}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg flex-shrink-0">
              <GraduationCap className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 dark:text-green-400 flex-shrink-0" />
            <span className="text-green-600 dark:text-green-400 font-medium">+3</span>
            <span className="text-slate-500 dark:text-gray-400 truncate">new this month</span>
          </div>
        </div>

        {/* Total Files Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 border border-slate-200 dark:border-gray-700 shadow-sm transition-colors">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-slate-600 dark:text-gray-300 text-sm font-medium truncate">
                Total Files
              </p>
              <p className="text-2xl font-bold text-slate-800 dark:text-gray-100 mt-1 transition-colors">
                {stats.totalFiles}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex-shrink-0">
              <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 dark:text-green-400 flex-shrink-0" />
            <span className="text-green-600 dark:text-green-400 font-medium">+8</span>
            <span className="text-slate-500 dark:text-gray-400 truncate">files this week</span>
          </div>
        </div>

        {/* Average Files per Class Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 border border-slate-200 dark:border-gray-700 shadow-sm transition-colors">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-slate-600 dark:text-gray-300 text-sm font-medium truncate">
                Avg Files/Class
              </p>
              <p className="text-2xl font-bold text-slate-800 dark:text-gray-100 mt-1 transition-colors">
                {stats.averageFilesPerClass}
              </p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex-shrink-0">
              <BookOpen className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3 text-sm">
            <span className="text-slate-500 dark:text-gray-400">Per class average</span>
          </div>
        </div>
      </div>

      {/* Add Class Form */}
      <AddClassForm onAdded={reload} />
      
      {/* Class List */}
      <ClassList classes={classes} onClassUpdate={reload} />
    </div>
  );
}