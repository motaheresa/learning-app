// src/app/admin/_components/Sidebar.tsx - Updated with Questions link
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FileText,
  Upload,
  GraduationCap,
  LogOut,
  Building2,
  BarChart3,
  Settings,
  Users,
  X,
  Sun,
  Moon,
  HelpCircle
} from "lucide-react";
import { useDarkMode } from "../layout";
import axios from "axios";


interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const router=useRouter()
  const { isDark, toggleDarkMode } = useDarkMode();

  const links = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: BarChart3,
      description: "Overview & Analytics"
    },
    {
      href: "/admin/files/upload",
      label: "Upload Center",
      icon: Upload,
      description: "Upload New Files"
    },
    {
      href: "/admin/classes",
      label: "Class Management",
      icon: GraduationCap,
      description: "Manage Classes"
    },
    {
      href: "/admin/questions",
      label: "Questions & Answers",
      icon: HelpCircle,
      description: "Manage Q&A Content"
    },
    {
      href: "/admin/users",
      label: "User Management",
      icon: Users,
      description: "Manage Users"
    },
    {
      href: "/admin/settings",
      label: "Settings",
      icon: Settings,
      description: "System Configuration"
    },
  ];

  const handleLogOut=async()=>{
    try {
      await axios.post(`/api/logout`)
      router.push("/auth/login")
    } catch (error) {
      console.error(error);
      
    }
  }
  return (
    <aside className="sticky top-0 w-full h-screen bg-white dark:bg-gray-800 border-r border-slate-200 dark:border-gray-700 shadow-sm flex flex-col transition-colors">
      {/* Mobile Close Button */}
      <div className="lg:hidden flex justify-end p-4">
        <button
          onClick={onClose}
          className="p-2 rounded-lg text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Logo & Brand */}
      <div className="p-6 border-b border-slate-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-bold text-slate-800 dark:text-gray-100 truncate">
              EduManager
            </h2>
            <p className="text-sm text-slate-500 dark:text-gray-400 truncate">
              Admin Portal
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose} // Close sidebar on mobile when link is clicked
              className={`group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shadow-sm"
                  : "text-slate-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-700 hover:text-slate-800 dark:hover:text-gray-100"
              }`}
            >
              <div className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
                isActive 
                  ? "bg-blue-100 dark:bg-blue-800/50" 
                  : "bg-slate-100 dark:bg-gray-600 group-hover:bg-slate-200 dark:group-hover:bg-gray-500"
              }`}>
                <Icon className={`w-4 h-4 ${
                  isActive 
                    ? "text-blue-600 dark:text-blue-300" 
                    : "text-slate-600 dark:text-gray-300"
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className={`font-medium truncate ${
                  isActive ? "text-blue-800 dark:text-blue-200" : ""
                }`}>
                  {link.label}
                </div>
                <div className="text-xs text-slate-500 dark:text-gray-400 mt-0.5 truncate">
                  {link.description}
                </div>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Dark Mode Toggle */}
      <div className="p-4 border-t border-slate-200 dark:border-gray-700">
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center gap-4 px-4 py-3 text-slate-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 group"
        >
          <div className="p-2 rounded-lg bg-slate-100 dark:bg-gray-600 group-hover:bg-slate-200 dark:group-hover:bg-gray-500 transition-colors">
            {isDark ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </div>
          <span className="font-medium">
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>
      </div>

      {/* Logout Section */}
      <div className="p-4 border-t border-slate-200 dark:border-gray-700">
        <button
        onClick={handleLogOut}
          className="w-full cursor-pointer flex items-center gap-4 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 group"
        >
          <div className="p-2 rounded-lg bg-red-50 dark:bg-red-900/30 group-hover:bg-red-100 dark:group-hover:bg-red-900/50 transition-colors">
            <LogOut className="w-4 h-4" />
          </div>
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}