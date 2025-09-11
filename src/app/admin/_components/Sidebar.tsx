"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
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
import { useDarkMode } from "@/hooks/useDarkMode";
import { useSession } from "@/hooks/useSession";
import { useState, useEffect } from "react";

interface SidebarProps {
  onClose?: () => void;
  isMobile?: boolean;
}

// Navigation links configuration
const navigationLinks = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: BarChart3,
    description: "Overview & Analytics",
    roles: ["ADMIN", "TEACHER", "STUDENT"]
  },
  {
    href: "/admin/files/upload",
    label: "Upload Center",
    icon: Upload,
    description: "Upload New Files",
    roles: ["ADMIN", "TEACHER"]
  },
  {
    href: "/admin/classes",
    label: "Class Management",
    icon: GraduationCap,
    description: "Manage Classes",
    roles: ["ADMIN"]
  },
  {
    href: "/admin/questions",
    label: "Questions & Answers",
    icon: HelpCircle,
    description: "Manage Q&A Content",
    roles: ["ADMIN", "TEACHER"]
  },
];

// Sidebar link component for better performance
const SidebarLink = ({ 
  link, 
  isActive, 
  onClose 
}: { 
  link: typeof navigationLinks[0]; 
  isActive: boolean; 
  onClose?: () => void; 
}) => {
  const Icon = link.icon;
  
  return (
    <Link
      href={link.href}
      onClick={onClose}
      className={`group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
        isActive
          ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shadow-sm"
          : "text-slate-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-700 hover:text-slate-800 dark:hover:text-gray-100"
      }`}
      aria-current={isActive ? "page" : undefined}
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
};

export default function Sidebar({ onClose, isMobile = false }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isDark, toggleDarkMode } = useDarkMode();
  const { user, logout } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Filter links based on user role, but show all links while loading
  const filteredLinks = navigationLinks.filter(link => 
    !user || (user.role && link.roles.includes(user.role))
  );

  const handleLogOut = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
    }
  };

  // Close sidebar when clicking outside (for mobile)
  useEffect(() => {
    if (!isMobile) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (onClose && !(event.target as Element).closest('aside')) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, onClose]);

  // Close sidebar when route changes (for mobile)
  useEffect(() => {
    if (isMobile && onClose) {
      onClose();
    }
  }, [pathname, isMobile, onClose]);

  return (
    <aside className="sticky top-0 w-full h-screen overflow-hidden bg-white dark:bg-gray-800 border-r border-slate-200 dark:border-gray-700 shadow-sm flex flex-col transition-colors z-50">
      {/* Mobile Close Button */}
        <div className="lg:hidden flex justify-end pt-4 pr-4">
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close sidebar"
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
              {!user ? "Loading..." : 
               user.role === "ADMIN" ? "Admin Portal" : 
               user.role === "TEACHER" ? "Teacher Portal" : "Student Portal"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {filteredLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
          
          return (
            <SidebarLink 
              key={link.href} 
              link={link} 
              isActive={isActive} 
              onClose={onClose} 
            />
          );
        })}

      </nav>

      {/* Dark Mode Toggle */}
      <div className="p-4 border-t border-slate-200 dark:border-gray-700 space-y-2">
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center gap-4 px-4 py-3 text-slate-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 group"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
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
          disabled={isLoggingOut}
          className="w-full flex items-center gap-4 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="p-2 rounded-lg bg-red-50 dark:bg-red-900/30 group-hover:bg-red-100 dark:group-hover:bg-red-900/50 transition-colors">
            <LogOut className="w-4 h-4" />
          </div>
          <span className="font-medium">
            {isLoggingOut ? "Signing out..." : "Sign Out"}
          </span>
        </button>
      </div>
    </aside>
  );
}