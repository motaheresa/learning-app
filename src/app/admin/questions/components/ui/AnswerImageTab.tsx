// src/components/questions/AnswerImageTab.tsx
import { Plus, Image, Loader2 } from "lucide-react";
import { AnswerImage } from "@/types/question";
import { AnswerImageCard } from "./AnswerImageCard";
import { LoadingState } from "@/types/question";

interface AnswerImageTabProps {
  answerImages: AnswerImage[];
  loading: LoadingState;
  onAddAnswerImage: () => void;
  onDeleteAnswerImage: (id: number) => void;
}

export const AnswerImageTab = ({
  answerImages,
  loading,
  onAddAnswerImage,
  onDeleteAnswerImage
}: AnswerImageTabProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-gray-100 flex items-center gap-2">
          <Image className="w-5 h-5" />
          Answer Images
          {loading.answerImages && <Loader2 className="w-4 h-4 animate-spin" />}
        </h3>
        <button
          onClick={onAddAnswerImage}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Answer Image
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {answerImages.length === 0 ? (
          <div className="col-span-full text-center py-12 border-2 border-dashed border-slate-200 dark:border-gray-700 rounded-lg">
            <Image className="w-12 h-12 text-slate-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-gray-400">
              {loading.answerImages ? 'Loading answer images...' : 'No answer images found'}
            </p>
            {!loading.answerImages && (
              <p className="text-sm text-slate-400 dark:text-gray-500 mt-1">
                Add your first answer image to get started
              </p>
            )}
          </div>
        ) : (
          answerImages.map((answerImage) => (
            <AnswerImageCard
              key={answerImage.id}
              answerImage={answerImage}
              onDelete={onDeleteAnswerImage}
              disabled={loading.deleting}
            />
          ))
        )}
      </div>
    </div>
  );
};