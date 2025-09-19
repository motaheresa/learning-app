// src/app/admin/questions/page.tsx
"use client";
import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { useQuestionManagement } from "./hooks/useQuestionManagement";
import { QuestionTab, AnswerImageTab, SearchFilter } from "./components/ui";
import QuestionForm from "./components/QuestionForm";
import AnswerImageForm from "./components/AnswerImageForm";
import { Question } from "./types/question";

export default function QuestionManagementPage() {
  const {
    files,
    questions,
    answerImages,
    selectedFile,
    loading,
    error,
    setSelectedFile,
    loadFiles,
    loadQuestions,
    loadAnswerImages,
    deleteQuestion,
    deleteAnswerImage
  } = useQuestionManagement();

  const [activeTab, setActiveTab] = useState<'questions' | 'answers'>('questions');
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPage, setFilterPage] = useState<number | ''>('');

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  useEffect(() => {
    if (selectedFile) {
      loadQuestions(selectedFile);
      loadAnswerImages(selectedFile);
    }
  }, [selectedFile, loadQuestions, loadAnswerImages]);

  const filteredQuestions = questions.filter(question =>
    question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.content.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (filterPage !== '' && question.pageNumber === filterPage)
  );

  console.log(answerImages);
  
  let filteredAnswerImages = answerImages.filter(image =>
    image.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (filterPage !== '' && image.pageNumber === filterPage)
  );
  filteredAnswerImages=filteredAnswerImages.length===0?answerImages:filteredAnswerImages
  console.log(filteredAnswerImages);
  

  const handleDeleteQuestion = async (id: number) => {
    if (confirm("Are you sure you want to delete this question?")) {
      const success = await deleteQuestion(id);
      if (success && selectedFile) {
        loadQuestions(selectedFile);
      }
    }
  };

  const handleDeleteAnswerImage = async (id: number) => {
    if (confirm("Are you sure you want to delete this answer image?")) {
      const success = await deleteAnswerImage(id);
      if (success && selectedFile) {
        loadAnswerImages(selectedFile);
      }
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterPage('');
  };

  const getSearchPlaceholder = () => {
    return activeTab === 'questions' 
      ? 'Search questions...' 
      : 'Search answer images...';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-gray-100 mb-2">
          Question & Answer Management
        </h1>
        <p className="text-slate-600 dark:text-gray-300">
          Add questions and answer images to your PDF files
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-800 dark:text-red-300 font-medium">Error</p>
            <p className="text-red-700 dark:text-red-400 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* File Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-slate-200 dark:border-gray-700 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-gray-100 mb-4">
          Select PDF File
        </h3>
        <select
          value={selectedFile || ""}
          onChange={(e) => setSelectedFile(e.target.value ? parseInt(e.target.value) : null)}
          className="w-full px-4 py-3 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-slate-900 dark:text-gray-100"
          disabled={loading.files}
        >
          <option value="">Choose a PDF file...</option>
          {files.map((file) => (
            <option key={file.id} value={file.id}>
              {file.name} {file.className && `(${file.className})`}
            </option>
          ))}
        </select>
      </div>

      {selectedFile && (
        <>
          {/* Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm">
            <div className="border-b border-slate-200 dark:border-gray-700">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('questions')}
                  className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === 'questions'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-300'
                  }`}
                >
                  Questions ({questions.length})
                </button>
                <button
                  onClick={() => setActiveTab('answers')}
                  className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === 'answers'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-300'
                  }`}
                >
                  Answer Images ({answerImages.length})
                </button>
              </nav>
            </div>

            <div className="p-6">
              {/* Search and Filter */}
              <SearchFilter
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                filterPage={filterPage}
                onFilterPageChange={setFilterPage}
                onClearFilters={clearFilters}
                placeholder={getSearchPlaceholder()}
              />

              {activeTab === 'questions' ? (
                <QuestionTab
                  questions={filteredQuestions}
                  loading={loading}
                  onAddQuestion={() => setShowQuestionForm(true)}
                  onEditQuestion={setEditingQuestion}
                  onDeleteQuestion={handleDeleteQuestion}
                />
              ) : (
                <AnswerImageTab
                  answerImages={filteredAnswerImages}
                  loading={loading}
                  onAddAnswerImage={() => setShowAnswerForm(true)}
                  onDeleteAnswerImage={handleDeleteAnswerImage}
                />
              )}
            </div>
          </div>

          {/* Modals */}
          {showQuestionForm && (
            <QuestionForm
              fileId={selectedFile}
              question={editingQuestion}
              onClose={() => {
                setShowQuestionForm(false);
                setEditingQuestion(null);
              }}
              onSaved={() => {
                if (selectedFile) {
                  loadQuestions(selectedFile);
                }
                setShowQuestionForm(false);
                setEditingQuestion(null);
              }}
            />
          )}

          {showAnswerForm && (
            <AnswerImageForm
              fileId={selectedFile}
              onClose={() => setShowAnswerForm(false)}
              onSaved={() => {
                if (selectedFile) {
                  loadAnswerImages(selectedFile);
                }
                setShowAnswerForm(false);
              }}
            />
          )}
        </>
      )}
    </div>
  );
}