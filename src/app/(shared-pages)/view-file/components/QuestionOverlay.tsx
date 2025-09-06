// src/features/pdf-viewer/components/QuestionOverlay.tsx
"use client";
import { useState } from "react";
import { X, Check, Eye, EyeOff } from "lucide-react";

type Question = {
  id: number;
  fileId: number;
  pageNumber: number;
  title: string;
  type: "MULTIPLE_CHOICE" | "COMPLETION";
  content: any;
  answer: any;
};

interface QuestionOverlayProps {
  questions: Question[];
  onClose: () => void;
  isDarkMode?: boolean;
}

export default function QuestionOverlay({ questions, onClose, isDarkMode = false }: QuestionOverlayProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{[key: number]: string}>({});
  const [showAnswers, setShowAnswers] = useState<{[key: number]: boolean}>({});

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const toggleShowAnswer = (questionId: number) => {
    setShowAnswers(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const isAnswerCorrect = (questionId: number) => {
    const userAnswer = userAnswers[questionId];
    const correctAnswer = questions.find(q => q.id === questionId)?.answer.correct;
    return userAnswer && correctAnswer && userAnswer === correctAnswer;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className={`max-w-2xl w-full max-h-[90vh] rounded-xl shadow-xl overflow-hidden ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`flex justify-between items-center p-6 border-b ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div>
            <h3 className={`text-lg font-semibold ${
              isDarkMode ? 'text-gray-100' : 'text-gray-800'
            }`}>
              Page {currentQuestion.pageNumber} Questions
            </h3>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode
                ? 'hover:bg-gray-700 text-gray-300'
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Question Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-6">
            {/* Question Title & Type */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  currentQuestion.type === 'MULTIPLE_CHOICE'
                    ? isDarkMode 
                      ? 'bg-blue-900/30 text-blue-300'
                      : 'bg-blue-100 text-blue-800'
                    : isDarkMode
                      ? 'bg-green-900/30 text-green-300' 
                      : 'bg-green-100 text-green-800'
                }`}>
                  {currentQuestion.type.replace('_', ' ')}
                </span>
              </div>
              <h4 className={`text-xl font-semibold ${
                isDarkMode ? 'text-gray-100' : 'text-gray-800'
              }`}>
                {currentQuestion.title}
              </h4>
            </div>

            {/* Question Text */}
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <p className={`${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                {currentQuestion.content.question}
              </p>
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuestion.type === "MULTIPLE_CHOICE" ? (
                <div className="space-y-2">
                  {currentQuestion.content.options?.map((option: string, index: number) => (
                    <label
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        userAnswers[currentQuestion.id] === option
                          ? isDarkMode
                            ? 'bg-blue-900/30 border-blue-600'
                            : 'bg-blue-50 border-blue-500'
                          : isDarkMode
                            ? 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                            : 'bg-white border-gray-300 hover:bg-gray-50'
                      } border`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion.id}`}
                        value={option}
                        checked={userAnswers[currentQuestion.id] === option}
                        onChange={(e) => handleAnswerSelect(currentQuestion.id, e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className={`flex-1 ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-700'
                      }`}>
                        {String.fromCharCode(65 + index)}. {option}
                      </span>
                      {userAnswers[currentQuestion.id] === option && showAnswers[currentQuestion.id] && (
                        <div className="flex items-center">
                          {isAnswerCorrect(currentQuestion.id) ? (
                            <Check className="w-5 h-5 text-green-500" />
                          ) : (
                            <X className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                      )}
                    </label>
                  ))}
                </div>
              ) : (
                <div>
                  <textarea
                    value={userAnswers[currentQuestion.id] || ""}
                    onChange={(e) => handleAnswerSelect(currentQuestion.id, e.target.value)}
                    placeholder="Type your answer here..."
                    rows={4}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-gray-200'
                        : 'bg-white border-gray-300 text-gray-800'
                    }`}
                  />
                </div>
              )}
            </div>

            {/* Show Answer Button */}
            {userAnswers[currentQuestion.id] && (
              <div className="space-y-3">
                <button
                  onClick={() => toggleShowAnswer(currentQuestion.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    showAnswers[currentQuestion.id]
                      ? isDarkMode
                        ? 'bg-gray-600 hover:bg-gray-500 text-gray-200'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      : isDarkMode
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  {showAnswers[currentQuestion.id] ? (
                    <>
                      <EyeOff className="w-4 h-4" />
                      Hide Answer
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      Show Answer
                    </>
                  )}
                </button>

                {/* Answer Display */}
                {showAnswers[currentQuestion.id] && (
                  <div className={`p-4 rounded-lg border-l-4 ${
                    isAnswerCorrect(currentQuestion.id)
                      ? isDarkMode
                        ? 'bg-green-900/20 border-green-600'
                        : 'bg-green-50 border-green-500'
                      : isDarkMode
                        ? 'bg-red-900/20 border-red-600'
                        : 'bg-red-50 border-red-500'
                  }`}>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {isAnswerCorrect(currentQuestion.id) ? (
                          <>
                            <Check className="w-5 h-5 text-green-500" />
                            <span className="font-medium text-green-600 dark:text-green-400">
                              Correct!
                            </span>
                          </>
                        ) : (
                          <>
                            <X className="w-5 h-5 text-red-500" />
                            <span className="font-medium text-red-600 dark:text-red-400">
                              Incorrect
                            </span>
                          </>
                        )}
                      </div>
                      <p className={`font-medium ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-700'
                      }`}>
                        Correct Answer: {currentQuestion.answer.correct}
                      </p>
                      {currentQuestion.answer.explanation && (
                        <p className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          <strong>Explanation:</strong> {currentQuestion.answer.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Navigation Footer */}
        <div className={`flex justify-between items-center p-6 border-t ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <button
            onClick={prevQuestion}
            disabled={currentQuestionIndex === 0}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              currentQuestionIndex === 0
                ? 'opacity-50 cursor-not-allowed'
                : isDarkMode
                  ? 'bg-gray-600 hover:bg-gray-500 text-gray-200'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            Previous
          </button>

          <div className="flex items-center gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentQuestionIndex
                    ? isDarkMode
                      ? 'bg-blue-500'
                      : 'bg-blue-600'
                    : isDarkMode
                      ? 'bg-gray-600'
                      : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              currentQuestionIndex === questions.length - 1
                ? 'opacity-50 cursor-not-allowed'
                : isDarkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}