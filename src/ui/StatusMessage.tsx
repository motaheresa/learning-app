// src/components/upload/StatusMessage.tsx
import { Check, AlertCircle } from "lucide-react";

interface StatusMessageProps {
  type: "success" | "error";
  message: string;
  details?: string;
  onClose?: () => void;
}

export const StatusMessage = ({ type, message, details, onClose }: StatusMessageProps) => {
  const styles = {
    success: {
      container: "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800",
      icon: "text-green-600 dark:text-green-400",
      text: "text-green-800 dark:text-green-300",
      details: "text-green-700 dark:text-green-400"
    },
    error: {
      container: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800",
      icon: "text-red-600 dark:text-red-400",
      text: "text-red-800 dark:text-red-300",
      details: "text-red-700 dark:text-red-400"
    }
  };

  const style = styles[type];

  return (
    <div className={`mx-4 sm:mx-6 mb-4 sm:mb-6 p-4 rounded-lg flex items-start gap-3 transition-colors ${style.container}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${style.icon}`}>
        {type === "success" ? (
          <Check className="w-4 h-4" />
        ) : (
          <AlertCircle className="w-4 h-4" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className={`font-medium ${style.text}`}>
          {message}
        </p>
        {details && (
          <p className={`text-sm mt-1 ${style.details}`}>
            {details}
          </p>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={`text-sm ${style.text} hover:opacity-70`}
        >
          ✕
        </button>
      )}
    </div>
  );
};