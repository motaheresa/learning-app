// src/components/questions/AnswerImageCard.tsx
import { Trash2, Eye } from "lucide-react";
import { AnswerImage } from "../../types/question";

interface AnswerImageCardProps {
  answerImage: AnswerImage;
  onDelete: (id: number) => void;
  disabled?: boolean;
}

export const AnswerImageCard = ({ answerImage, onDelete, disabled = false }: AnswerImageCardProps) => {
  return (
    <div className="border border-slate-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded text-xs font-medium">
          Page {answerImage.pageNumber}
        </span>
        <button
          onClick={() => onDelete(answerImage.id)}
          disabled={disabled}
          className="p-1 text-slate-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Delete answer image"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <div className="relative group">
        <img
          src={answerImage.imagePath}
          alt={answerImage.description || "Answer image"}
          className="w-full h-32 object-cover rounded-lg mb-2"
        />
        <a
          href={answerImage.imagePath}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 rounded-lg"
          title="View full image"
        >
          <Eye className="w-6 h-6 text-white" />
        </a>
      </div>
      {answerImage.description && (
        <p className="text-sm text-slate-600 dark:text-gray-300 mt-2">
          {answerImage.description}
        </p>
      )}
      <p className="text-xs text-slate-500 dark:text-gray-400 mt-2">
        Added: {new Date(answerImage.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};