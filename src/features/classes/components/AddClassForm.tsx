"use client";
import { useState } from "react";
import { Plus, GraduationCap } from "lucide-react";

interface AddClassFormProps {
  onAdded: () => void;
}

export default function AddClassForm({ onAdded }: AddClassFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/admin/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: name.trim(), 
          description: description.trim() || undefined 
        }),
      });

      if (response.ok) {
        setName("");
        setDescription("");
        onAdded();
      } else {
        const errorData = await response.text();
        setError(errorData || "Failed to create class. Please try again.");
      }
    } catch (error) {
      console.error('Error adding class:', error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm transition-colors">
      <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-gray-100 flex items-center gap-2 transition-colors">
          <Plus className="w-5 h-5 text-green-600 dark:text-green-400" />
          Add New Class
        </h3>
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-800 dark:text-red-300 text-sm">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Class Name Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 transition-colors">
              Class Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <GraduationCap className="w-5 h-5 text-slate-400 dark:text-gray-500" />
              </div>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError(null); // Clear error on input change
                }}
                placeholder="Enter class name"
                className="w-full pl-11 pr-4 py-3 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-slate-900 dark:text-gray-100 placeholder-slate-500 dark:placeholder-gray-400 transition-colors"
                required
                maxLength={100}
                disabled={loading}
              />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-slate-500 dark:text-gray-400">
                Maximum 100 characters
              </p>
              <span className="text-xs text-slate-500 dark:text-gray-400">
                {name.length}/100
              </span>
            </div>
          </div>
          
          {/* Description Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 transition-colors">
              Description
            </label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description (optional)"
              className="w-full px-4 py-3 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-slate-900 dark:text-gray-100 placeholder-slate-500 dark:placeholder-gray-400 transition-colors"
              maxLength={200}
              disabled={loading}
            />
            <div className="flex justify-between items-center">
              <p className="text-xs text-slate-500 dark:text-gray-400">
                Optional description
              </p>
              <span className="text-xs text-slate-500 dark:text-gray-400">
                {description.length}/200
              </span>
            </div>
          </div>
        </div>

        {/* Submit Button Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-slate-200 dark:border-gray-700">
          <div className="text-sm text-slate-500 dark:text-gray-400">
            * Required fields
          </div>
          
          <button
            type="submit"
            disabled={loading || !name.trim()}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              loading || !name.trim()
                ? "bg-slate-300 dark:bg-gray-600 text-slate-500 dark:text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl"
            }`}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Adding...</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Add Class</span>
              </>
            )}
          </button>
        </div>

        {/* Form Help Text */}
        <div className="text-xs text-slate-500 dark:text-gray-400 bg-slate-50 dark:bg-gray-700/50 rounded-lg p-3">
          <p className="font-medium mb-1">Tips for creating classes:</p>
          <ul className="space-y-1 ml-2">
            <li>• Use clear, descriptive names (e.g., "Math Grade 10", "Biology Advanced")</li>
            <li>• Add descriptions to help identify the class purpose</li>
            <li>• Classes can be edited or deleted later if needed</li>
          </ul>
        </div>
      </form>
    </div>
  );
}