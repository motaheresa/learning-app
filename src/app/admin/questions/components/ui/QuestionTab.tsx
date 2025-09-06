// src/components/questions/QuestionTab.tsx
import { Plus, HelpCircle, Loader2 } from "lucide-react";
import { Question,LoadingState } from "../../types/question";
import { QuestionCard } from "./QuestionCard";

interface QuestionTabProps {
  questions: Question[];
  loading: LoadingState;
  onAddQuestion: () => void;
  onEditQuestion: (question: Question) => void;
  onDeleteQuestion: (id: number) => void;
}

export const QuestionTab = ({
  questions,
  loading,
  onAddQuestion,
  onEditQuestion,
  onDeleteQuestion
}: QuestionTabProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-gray-100 flex items-center gap-2">
          <HelpCircle className="w-5 h-5" />
          Questions
          {loading.questions && <Loader2 className="w-4 h-4 animate-spin" />}
        </h3>
        <button
          onClick={onAddQuestion}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Question
        </button>
      </div>

      <div className="space-y-4">
        {questions.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-gray-700 rounded-lg">
            <HelpCircle className="w-12 h-12 text-slate-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-gray-400">
              {loading.questions ? 'Loading questions...' : 'No questions found'}
            </p>
            {!loading.questions && (
              <p className="text-sm text-slate-400 dark:text-gray-500 mt-1">
                Add your first question to get started
              </p>
            )}
          </div>
        ) : (
          questions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              onEdit={onEditQuestion}
              onDelete={onDeleteQuestion}
              disabled={loading.deleting}
            />
          ))
        )}
      </div>
    </div>
  );
};