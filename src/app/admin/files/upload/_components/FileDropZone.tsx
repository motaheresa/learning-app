// src/components/upload/FileDropZone.tsx
"use client";
import { FileText, CloudUpload, X } from "lucide-react";
import { formatFileSize } from "@/utils/validation";

interface FileDropZoneProps {
  selectedFile: File | null;
  dragActive: boolean;
  onDrag: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: () => void;
  accept?: string;
  required?: boolean;
}

export const FileDropZone = ({
  selectedFile,
  dragActive,
  onDrag,
  onDrop,
  onFileSelect,
  onRemoveFile,
  accept = ".pdf,.doc,.docx,.ppt,.pptx",
  required = true
}: FileDropZoneProps) => {
  return (
    <div
      className={`border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition-all duration-200 ${
        dragActive
          ? "border-blue-400 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20"
          : "border-slate-300 dark:border-gray-600 hover:border-slate-400 dark:hover:border-gray-500"
      }`}
      onDragEnter={onDrag}
      onDragLeave={onDrag}
      onDragOver={onDrag}
      onDrop={onDrop}
    >
      {selectedFile ? (
        <div className="space-y-4">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
            <FileText className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="font-medium text-slate-800 dark:text-gray-100 break-all">
              {selectedFile.name}
            </p>
            <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">
              {formatFileSize(selectedFile.size)}
            </p>
          </div>
          <button
            type="button"
            onClick={onRemoveFile}
            className="inline-flex items-center gap-2 text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium transition-colors"
          >
            <X className="w-4 h-4" />
            Remove file
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="w-16 h-16 bg-slate-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto">
            <CloudUpload className="w-8 h-8 text-slate-400 dark:text-gray-500" />
          </div>
          <div>
            <p className="text-lg font-medium text-slate-800 dark:text-gray-100 mb-2">
              Drop your file here, or{" "}
              <label
                htmlFor="file-input"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer underline transition-colors"
              >
                browse
              </label>
            </p>
            <p className="text-sm text-slate-500 dark:text-gray-400">
              Supports PDF, DOC, DOCX, PPT, PPTX files up to 10MB
            </p>
          </div>
          <input
            id="file-input"
            type="file"
            name="file"
            onChange={onFileSelect}
            className="hidden"
            accept={accept}
            required={required}
          />
        </div>
      )}
    </div>
  );
};