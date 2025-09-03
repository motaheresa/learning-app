"use client";
import { useState } from "react";
import { GraduationCap, Edit3, Trash2, Users, BookOpen, Check, X } from "lucide-react";

type ClassRecord = {
  id: number;
  name: string;
  studentCount?: number;
  fileCount?: number;
};

interface ClassListProps {
  classes: ClassRecord[];
  onClassUpdate?: () => void;
}

export function ClassList({ classes, onClassUpdate }: ClassListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [isLoading, setIsLoading] = useState<number | null>(null);

  const handleEdit = (cls: ClassRecord) => {
    setEditingId(cls.id);
    setEditName(cls.name);
  };

  const handleSaveEdit = async (id: number) => {
    if (!editName.trim()) return;
    
    setIsLoading(id);
    try {
      const response = await fetch(`/api/admin/classes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName.trim() }),
      });

      if (response.ok) {
        setEditingId(null);
        setEditName("");
        onClassUpdate?.();
      } else {
        console.error('Error updating class');
      }
    } catch (error) {
      console.error('Error updating class:', error);
    } finally {
      setIsLoading(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this class? All associated files will be unassigned.')) {
      setIsLoading(id);
      try {
        const response = await fetch(`/api/admin/classes/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          onClassUpdate?.();
        } else {
          console.error('Error deleting class');
        }
      } catch (error) {
        console.error('Error deleting class:', error);
      } finally {
        setIsLoading(null);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, id: number) => {
    if (e.key === 'Enter') {
      handleSaveEdit(id);
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm overflow-hidden transition-colors">
      <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-gray-100 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="truncate">Class List ({classes.length})</span>
        </h3>
      </div>

      {classes.length === 0 ? (
        <div className="p-8 sm:p-12 text-center">
          <GraduationCap className="w-12 h-12 text-slate-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-gray-300 mb-2 font-medium">No classes yet</p>
          <p className="text-slate-500 dark:text-gray-400 text-sm">Add your first class to get started</p>
        </div>
      ) : (
        <div className="divide-y divide-slate-200 dark:divide-gray-700">
          {classes.map((cls) => (
            <div 
              key={cls.id} 
              className="p-4 sm:p-6 hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              {editingId === cls.id ? (
                /* Editing Mode */
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, cls.id)}
                      className="flex-1 px-4 py-3 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-slate-900 dark:text-gray-100 transition-colors"
                      placeholder="Enter class name"
                      autoFocus
                    />
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleSaveEdit(cls.id)}
                        disabled={!editName.trim() || isLoading === cls.id}
                        className="inline-flex items-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed min-w-[80px]"
                      >
                        {isLoading === cls.id ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Check className="w-4 h-4" />
                            <span className="hidden sm:inline">Save</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        disabled={isLoading === cls.id}
                        className="inline-flex items-center gap-2 px-4 py-3 bg-slate-300 dark:bg-gray-600 hover:bg-slate-400 dark:hover:bg-gray-500 text-slate-700 dark:text-gray-200 rounded-lg font-medium transition-colors disabled:cursor-not-allowed min-w-[80px]"
                      >
                        <X className="w-4 h-4" />
                        <span className="hidden sm:inline">Cancel</span>
                      </button>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-gray-400 flex flex-col sm:flex-row gap-1">
                    <span>Press Enter to save, Escape to cancel</span>
                  </div>
                </div>
              ) : (
                /* Display Mode */
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex-shrink-0">
                      <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-slate-800 dark:text-gray-100 text-base sm:text-lg truncate">
                        {cls.name}
                      </h4>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1">
                        <span className="flex items-center gap-1 text-sm text-slate-500 dark:text-gray-400">
                          <Users className="w-4 h-4 flex-shrink-0" />
                          <span>{cls.studentCount || 0} Students</span>
                        </span>
                        <span className="flex items-center gap-1 text-sm text-slate-500 dark:text-gray-400">
                          <BookOpen className="w-4 h-4 flex-shrink-0" />
                          <span>{cls.fileCount || 0} Files</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0 justify-end">
                    <button
                      onClick={() => handleEdit(cls)}
                      disabled={isLoading === cls.id}
                      className="p-2 text-slate-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
                      title="Edit class"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(cls.id)}
                      disabled={isLoading === cls.id}
                      className="p-2 text-slate-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
                      title="Delete class"
                    >
                      {isLoading === cls.id ? (
                        <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}