// src/components/upload/UploadForm.tsx
"use client";
import { FormFields } from "./FormFields";
import { SubmitButton } from "@/ui/SubmitButton";
import { FileDropZone } from "./FileDropZone";

interface UploadFormProps {
  selectedFile: File | null;
  dragActive: boolean;
  classes: any[];
  classesLoading: boolean;
  formData: any;
  loading: boolean;
  onDrag: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const UploadForm = ({
  selectedFile,
  dragActive,
  classes,
  classesLoading,
  formData,
  loading,
  onDrag,
  onDrop,
  onFileSelect,
  onRemoveFile,
  onInputChange,
  onSubmit
}: UploadFormProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm overflow-hidden transition-colors">
      <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-gray-100 flex items-center gap-2 transition-colors">
          <span className="w-5 h-5 text-blue-600 dark:text-blue-400">📤</span>
          File Upload
        </h2>
      </div>

      <form onSubmit={onSubmit} className="p-4 sm:p-6 space-y-6">
        <FileDropZone
          selectedFile={selectedFile}
          dragActive={dragActive}
          onDrag={onDrag}
          onDrop={onDrop}
          onFileSelect={onFileSelect}
          onRemoveFile={onRemoveFile}
        />

        <FormFields
          classes={classes}
          classesLoading={classesLoading}
          formData={formData}
          onInputChange={onInputChange}
          disabled={loading}
        />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-gray-700">
          <div className="text-sm text-slate-500 dark:text-gray-400">* Required fields</div>
          
          <SubmitButton
            loading={loading}
            disabled={loading || !selectedFile || !formData.classId}
          />
        </div>

        <div className="text-xs text-slate-500 dark:text-gray-400 bg-slate-50 dark:bg-gray-700/50 rounded-lg p-3">
          <p className="font-medium mb-1">Tips for uploading files:</p>
          <ul className="space-y-1 ml-2">
            <li>• Use clear, descriptive file names</li>
            <li>• Add detailed descriptions for better organization</li>
            <li>• Assign files to appropriate classes</li>
            <li>• Maximum file size: 10MB</li>
          </ul>
        </div>
      </form>
    </div>
  );
};