// src/app/admin/questions/components/QuestionForm.tsx
"use client";
import { useState, useEffect } from "react";
import { X, Plus, Minus } from "lucide-react";

type Question = {
  id: number;
  fileId: number;
  pageNumber: number;
  title: string;
  type: "MULTIPLE_CHOICE" | "COMPLETION";
  content: any;
  answer: any;
};

interface QuestionFormProps {
  fileId: number;
  question?: Question | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function QuestionForm({ fileId, question, onClose, onSaved }: QuestionFormProps) {
  const [formData, setFormData] = useState({
    pageNumber: 1,
    title: "",
    type: "MULTIPLE_CHOICE" as "MULTIPLE_CHOICE" | "COMPLETION",
    questionText: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    explanation: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (question) {
      setFormData({
        pageNumber: question.pageNumber,
        title: question.title,
        type: question.type,
        questionText: question.content.question || "",
        options: question.type === "MULTIPLE_CHOICE" ? question.content.options || ["", "", "", ""] : ["", "", "", ""],
        correctAnswer: question.answer.correct || "",
        explanation: question.answer.explanation || "",
      });
    }
  }, [question]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const content = {
        question: formData.questionText,
        ...(formData.type === "MULTIPLE_CHOICE" && { options: formData.options.filter(opt => opt.trim()) })
      };

      const answer = {
        correct: formData.correctAnswer,
        explanation: formData.explanation,
      };

      const payload = {
        fileId,
        pageNumber: formData.pageNumber,
        title: formData.title,
        type: formData.type,
        content,
        answer,
      };

      const url = question ? `/api/admin/questions/${question.id}` : "/api/admin/questions";
      const method = question ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        onSaved();
      } else {
        console.error("Failed to save question");
      }
    } catch (error) {
      console.error("Error saving question:", error);
    } finally {
      setLoading(false);
    }
  };

  const addOption = () => {
    setFormData(prev => ({
      ...prev,
      options: [...prev.options, ""]
    }));
  };

  const removeOption = (index: number) => {
    if (formData.options.length > 2) {
      setFormData(prev => ({
        ...prev,
        options: prev.options.filter((_, i) => i !== index)
      }));
    }
  };

  const updateOption = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.map((opt, i) => i === index ? value : opt)
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-gray-100">
            {question ? "Edit Question" : "Add Question"}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                Page Number
              </label>
              <input
                type="number"
                min="1"
                value={formData.pageNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, pageNumber: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-slate-900 dark:text-gray-100"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                Question Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as "MULTIPLE_CHOICE" | "COMPLETION" }))}
                className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-slate-900 dark:text-gray-100"
              >
                <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                <option value="COMPLETION">Completion</option>
              </select>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
              Question Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-slate-900 dark:text-gray-100"
              required
            />
          </div>

          {/* Question Text */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
              Question Text
            </label>
            <textarea
              value={formData.questionText}
              onChange={(e) => setFormData(prev => ({ ...prev, questionText: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-slate-900 dark:text-gray-100"
              required
            />
          </div>

          {/* Multiple Choice Options */}
          {formData.type === "MULTIPLE_CHOICE" && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300">
                  Answer Options
                </label>
                <button
                  type="button"
                  onClick={addOption}
                  className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  <Plus className="w-4 h-4" />
                  Add Option
                </button>
              </div>
              <div className="space-y-2">
                {formData.options.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-sm text-slate-500 dark:text-gray-400 w-6">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      placeholder={`Option ${String.fromCharCode(65 + index)}`}
                      className="flex-1 px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-slate-900 dark:text-gray-100"
                    />
                    {formData.options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeOption(index)}
                        className="p-2 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Correct Answer */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
              Correct Answer
            </label>
            {formData.type === "MULTIPLE_CHOICE" ? (
              <select
                value={formData.correctAnswer}
                onChange={(e) => setFormData(prev => ({ ...prev, correctAnswer: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-slate-900 dark:text-gray-100"
                required
              >
                <option value="">Select correct answer...</option>
                {formData.options.filter(opt => opt.trim()).map((option, index) => (
                  <option key={index} value={option}>
                    {String.fromCharCode(65 + index)}. {option}
                  </option>
                ))}
              </select>
            ) : (
              <textarea
                value={formData.correctAnswer}
                onChange={(e) => setFormData(prev => ({ ...prev, correctAnswer: e.target.value }))}
                rows={2}
                placeholder="Enter the correct answer..."
                className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-slate-900 dark:text-gray-100"
                required
              />
            )}
          </div>

          {/* Explanation */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
              Explanation (Optional)
            </label>
            <textarea
              value={formData.explanation}
              onChange={(e) => setFormData(prev => ({ ...prev, explanation: e.target.value }))}
              rows={3}
              placeholder="Explain why this is the correct answer..."
              className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-slate-900 dark:text-gray-100"
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t border-slate-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                question ? "Update Question" : "Create Question"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}