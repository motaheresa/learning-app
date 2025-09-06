// src/app/admin/classes/page.tsx
"use client";
import { useState, useEffect } from "react";
import { AlertCircle, Loader2, GraduationCap } from "lucide-react";
import { useClasses, useClassStats } from "./_hooks";
import { AddClassForm, ClassList, StatsCards } from "./_components";

export default function ClassesPage() {
  const { classes, loading, error, reload } = useClasses();
  const { stats, loading: statsLoading, error: statsError } = useClassStats();

  useEffect(() => {
    reload();
  }, [reload]);

  const handleClassAdded = () => {
    reload();
  };

  const handleClassUpdate = () => {
    reload();
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

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-800 dark:text-red-300 font-medium">Error</p>
            <p className="text-red-700 dark:text-red-400 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Stats Overview */}
      {statsLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-slate-200 dark:border-gray-700 shadow-sm animate-pulse">
              <div className="h-4 bg-slate-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-slate-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
              <div className="h-3 bg-slate-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : statsError ? (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <p className="text-yellow-800 dark:text-yellow-300 text-sm">
            Stats unavailable: {statsError}
          </p>
        </div>
      ) : (
        <StatsCards
          classesCount={stats.classesCount}
          totalStudents={stats.totalStudents}
          totalFiles={stats.totalFiles}
          averageFilesPerClass={stats.averageFilesPerClass}
        />
      )}

      {/* Add Class Form */}
      <AddClassForm onAdded={handleClassAdded} />
      
      {/* Class List */}
      <ClassList 
        classes={classes} 
        onClassUpdate={handleClassUpdate}
        loading={loading}
      />
    </div>
  );
}