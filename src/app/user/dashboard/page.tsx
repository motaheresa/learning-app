import { Eye, FileText, Volume2 } from "lucide-react";
import { SearchParams } from "next/dist/server/request/search-params";
import Link from "next/link";
import React from "react";

const UserDashboard = async ({ searchParams }: SearchParams) => {
  const classId = await searchParams?.class;

  const files = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}/api/admin/files?classId=${classId}`,
    {
      priority: "high",
      next: { revalidate: 3600 },
    }
  ).then((res) => res.json().then((data) => data));
  console.log(files);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg dark:shadow-slate-900/25 p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent mb-2">
                  لوحة التحكم
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                  إدارة ملفاتك والوصول إليها بسهولة
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-4 space-x-reverse">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <FileText className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Files Section */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg dark:shadow-slate-900/25 overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b border-slate-200/60 dark:border-slate-700/60 bg-gradient-to-r from-white to-slate-50 dark:from-slate-800 dark:to-slate-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                    الملفات
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    {files.length} ملف متاح
                  </p>
                </div>
              </div>
              <div className="text-slate-500 dark:text-slate-400 text-sm bg-slate-100 dark:bg-slate-700 px-4 py-2 rounded-lg">
                المجموع: {files.length}
              </div>
            </div>
          </div>

          {/* Content */}
          {files.length === 0 ? (
            <div className="p-16 text-center">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-inner">
                  <FileText className="w-12 h-12 text-slate-400 dark:text-slate-500" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-slate-300 dark:bg-slate-600 rounded-full opacity-60"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-slate-200 dark:bg-slate-700 rounded-full opacity-40"></div>
              </div>
              <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-3">
                لا توجد ملفات
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mb-2 text-lg">
                لم يتم العثور على أي ملفات في هذا القسم
              </p>
              <p className="text-slate-400 dark:text-slate-500 text-sm max-w-md mx-auto">
                جرب تعديل البحث أو المرشحات للعثور على الملفات المطلوبة
              </p>
            </div>
          ) : (
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {files.map((file, index) => (
                  <div
                    key={file.id}
                    className="group relative bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm rounded-2xl border border-slate-200/80 dark:border-slate-600/80 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-xl dark:hover:shadow-slate-900/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50/30 dark:to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative p-6">
                      {/* File Icon */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="relative">
                          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                            <FileText className="w-7 h-7 text-white" />
                          </div>
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-slate-700 opacity-90"></div>
                        </div>
                      </div>
                      
                      {/* File Name */}
                      <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-3 text-lg line-clamp-2 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-200">
                        {file.name}
                      </h3>
                      
                      {/* Class Badge */}
                      {file.class && (
                        <div className="mb-4">
                          <span className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/40 dark:to-green-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold rounded-full border border-emerald-200 dark:border-emerald-700">
                            {file.class}
                          </span>
                        </div>
                      )}
                      
                      {/* Description */}
                      {file.description && (
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                          {file.description}
                        </p>
                      )}
                      
                      {/* Action Buttons */}
                      <div className="flex flex-col gap-3 pt-4 border-t border-slate-100 dark:border-slate-600">
                        {/* View File Button */}
                        <Link
                          href={{
                            pathname: "/view-file",
                            query: { file: file.path },
                          }}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg group-hover:shadow-blue-500/25"
                        >
                          <Eye className="w-4 h-4" />
                          عرض الملف
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;