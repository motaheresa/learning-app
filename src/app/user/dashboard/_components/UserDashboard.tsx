// components/UserDashboard.tsx
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader />
        <FilesSection files={files} />
      </div>
    </div>
  );
};

export default UserDashboard;