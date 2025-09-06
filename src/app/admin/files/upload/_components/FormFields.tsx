// src/components/upload/FormFields.tsx
"use client";
import { Loader2 } from "lucide-react";

interface Class {
  id: number;
  name: string;
}

interface FormData {
  classId: string;
  priority: string;
  description: string;
  tags: string;
}

interface FormFieldsProps {
  classes: Class[];
  classesLoading: boolean;
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>) => void;
  disabled?: boolean;
}

export const FormFields = ({
  classes,
  classesLoading,
  formData,
  onInputChange,
  disabled = false
}: FormFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Class Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300">
            Select Class <span className="text-red-500">*</span>
          </label>
          <select
            name="classId"
            value={formData.classId}
            onChange={onInputChange}
            required
            disabled={classesLoading || disabled}
            className="w-full px-4 py-3 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-slate-900 dark:text-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Choose a class...</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>
          {classesLoading && (
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Loader2 className="w-3 h-3 animate-spin" />
              Loading classes...
            </div>
          )}
        </div>

        {/* File Priority */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300">
            Priority Level
          </label>
          <select
            name="priority"
            value={formData.priority}
            onChange={onInputChange}
            disabled={disabled}
            className="w-full px-4 py-3 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-slate-900 dark:text-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="normal">Normal</option>
            <option value="high">High Priority</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={onInputChange}
          rows={4}
          disabled={disabled}
          className="w-full px-4 py-3 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white dark:bg-gray-700 text-slate-900 dark:text-gray-100 placeholder-slate-500 dark:placeholder-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Add a detailed description of this file's content and purpose..."
        />
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300">
          Tags
        </label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={onInputChange}
          disabled={disabled}
          className="w-full px-4 py-3 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-slate-900 dark:text-gray-100 placeholder-slate-500 dark:placeholder-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Enter tags separated by commas (e.g., math, algebra, homework)"
        />
      </div>
    </>
  );
};