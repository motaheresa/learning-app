"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";

// Dark Mode Context
const DarkModeContext = createContext({
  isDark: false,
  toggleDarkMode: () => {},
});

export const useDarkMode = () => useContext(DarkModeContext);

function DarkModeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
    }
  }, []);



  const toggleDarkMode = () => setIsDark(!isDark);

  return (
    <DarkModeContext.Provider value={{ isDark, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <DarkModeProvider>
      <div className="flex min-h-screen bg-slate-50 dark:bg-gray-900 transition-colors">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <div className={`
          fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:inset-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>
        
        {/* Main Content */}
        <div className="flex flex-col flex-1 min-w-0">
          <Header onMenuClick={() => setSidebarOpen(true)} />
          <main className="p-4 sm:p-6 lg:p-8 flex-1 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </DarkModeProvider>
  );
}