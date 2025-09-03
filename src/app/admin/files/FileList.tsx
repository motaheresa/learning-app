"use client";
import Link from "next/link";
import { useState } from "react";
import { FileText, Eye, Trash2, ExternalLink, Loader2 } from "lucide-react";

type FileRecord = {
  id: number;
  name: string;
  path: string;
  className: string;
  fileSize?: string;
  uploadDate?: string;
  description?: string;
};

interface FileListProps {
  files: FileRecord[];
  onDelete: (id: number) => void;
}

export default function FileList({ files, onDelete }: FileListProps) {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this file? This action cannot be undone.')) {
      setDeletingId(id);
      try {
        await onDelete(id);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'ppt':
      case 'pptx':
        return '📊';
      default:
        return '📁';
    }
  };

  const truncateFileName = (name: string, maxLength: number = 50) => {
    if (name.length <= maxLength) return name;
    const extension = name.split('.').pop();
    const nameWithoutExt = name.substring(0, name.lastIndexOf('.'));
    const truncated = nameWithoutExt.substring(0, maxLength - extension!.length - 4) + '...';
    return `${truncated}.${extension}`;
  };

  if (files.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm p-8 sm:p-12 text-center transition-colors">
        <FileText className="w-12 h-12 text-slate-300 dark:text-gray-600 mx-auto mb-4" />
        <p className="text-slate-600 dark:text-gray-300 mb-2 font-medium">No files found</p>
        <p className="text-slate-500 dark:text-gray-400 text-sm">Upload your first file to get started</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm overflow-hidden transition-colors">
      <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-gray-100 flex items-center gap-2 transition-colors">
          <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Files ({files.length})
        </h3>
      </div>

      <div className="divide-y divide-slate-200 dark:divide-gray-700">
        {files.map((file) => (
          <div 
            key={file.id} 
            className="p-4 sm:p-6 hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* File Info */}
              <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0 flex-1">
                <div className="flex-shrink-0 text-2xl">
                  {getFileIcon(file.name)}
                </div>
                
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                    <h4 className="font-semibold text-slate-800 dark:text-gray-100 text-sm sm:text-base break-all sm:break-normal">
                      <span className="sm:hidden">{truncateFileName(file.name, 30)}</span>
                      <span className="hidden sm:inline">{truncateFileName(file.name, 60)}</span>
                    </h4>
                    {file.fileSize && (
                      <span className="text-xs text-slate-500 dark:text-gray-400 bg-slate-100 dark:bg-gray-700 px-2 py-1 rounded-full flex-shrink-0">
                        {file.fileSize}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
                    <span className="inline-flex items-center gap-1 text-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                      <span className="text-slate-600 dark:text-gray-300 font-medium">
                        {file.className}
                      </span>
                    </span>
                    
                    {file.uploadDate && (
                      <span className="text-xs text-slate-500 dark:text-gray-400">
                        {file.uploadDate}
                      </span>
                    )}
                  </div>
                  
                  {file.description && (
                    <p className="text-sm text-slate-500 dark:text-gray-400 mt-2 line-clamp-2">
                      {file.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0 justify-end sm:justify-start">
                <Link
                  href={{ pathname: "/view-file", query: { file: file.path } }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors shadow-sm"
                >
                  <Eye className="w-4 h-4" />
                  <span className="hidden sm:inline">View</span>
                  <ExternalLink className="w-3 h-3 sm:hidden" />
                </Link>
                
                <button
                  onClick={() => handleDelete(file.id)}
                  disabled={deletingId === file.id}
                  className="inline-flex items-center gap-2 p-2 text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                  title="Delete file"
                >
                  {deletingId === file.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}