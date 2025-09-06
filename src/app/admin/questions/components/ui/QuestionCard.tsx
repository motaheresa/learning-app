// src/components/questions/QuestionCard.tsx
import { Edit, Trash2, FileText } from "lucide-react";
import { Question } from "@/types/question";

interface QuestionCardProps {
  question: Question;
  onEdit: (question: Question) => void;
  onDelete: (id: number) => void;
  disabled?: boolean;
}

export const QuestionCard = ({ question, onEdit, onDelete, disabled = false }: QuestionCardProps) => {
  return (
    <div className="border border-slate-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded text-xs font-medium">
              Page {question.pageNumber}
            </span>
            <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs font-medium">
              {question.type.replace('_', ' ')}
            </span>
          </div>
          <h4 className="font-semibold text-slate-800 dark:text-gray-100 mb-2">
            {question.title}
          </h4>
          <p className="text-sm text-slate-600 dark:text-gray-300 mb-3">
            {question.content.question}
          </p>
          {question.type === "MULTIPLE_CHOICE" && question.content.options && (
            <div className="space-y-1 mb-3">
              {question.content.options.map((option, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-slate-500 dark:text-gray-400">
                  <FileText className="w-3 h-3" />
                  <span>{String.fromCharCode(65 + index)}. {option}</span>
                </div>
              ))}
            </div>
          )}
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
            <p className="text-sm font-medium text-green-800 dark:text-green-300 mb-1">
              Correct Answer: {question.answer.correct}
            </p>
            {question.answer.explanation && (
              <p className="text-sm text-green-700 dark:text-green-400">
                {question.answer.explanation}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <button
            onClick={() => onEdit(question)}
            disabled={disabled}
            className="p-2 text-slate-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Edit question"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(question.id)}
            disabled={disabled}
            className="p-2 text-slate-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Delete question"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};