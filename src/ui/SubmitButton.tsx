
"use client";
import { Upload, Loader2 } from "lucide-react";

interface SubmitButtonProps {
  loading: boolean;
  disabled: boolean;
  text?: string;
  loadingText?: string;
}

export const SubmitButton = ({
  loading,
  disabled,
  text = "Upload File",
  loadingText = "Uploading..."
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
        disabled
          ? "bg-slate-300 dark:bg-gray-600 text-slate-500 dark:text-gray-400 cursor-not-allowed"
          : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl"
      }`}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        <>
          <Upload className="w-4 h-4" />
          {text}
        </>
      )}
    </button>
  );
};