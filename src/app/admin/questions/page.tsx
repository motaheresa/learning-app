// src/app/admin/questions/page.tsx
"use client";
import { useState, useEffect } from "react";
import { Plus, HelpCircle, Image, FileText, Trash2, Edit } from "lucide-react";
import QuestionForm from "./components/QuestionForm";
import AnswerImageForm from "./components/AnswerImageForm";

type FileRecord = {
  id: number;
  name: string;
  path: string;
  class?: string;
};

type Question = {
  id: number;
  fileId: number;
  pageNumber: number;
  title: string;
  type: "MULTIPLE_CHOICE" | "COMPLETION";
  content: any;
  answer: any;
  file: { id: number; name: string };
};

type AnswerImage = {
  id: number;
  fileId: number;
  pageNumber: number;
  imagePath: string;
  description?: string;
  file: { id: number; name: string };
};

export default function QuestionManagementPage() {
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answerImages, setAnswerImages] = useState<AnswerImage[]>([]);
  const [selectedFile, setSelectedFile] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'questions' | 'answers'>('questions');
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    if (selectedFile) {
      loadQuestions();
      loadAnswerImages();
    }
  }, [selectedFile]);

  const loadFiles = async () => {
    try {
      const res = await fetch("/api/admin/files");
      const data = await res.json();
      setFiles(data);
    } catch (error) {
      console.error("Error loading files:", error);
    }
  };

  const loadQuestions = async () => {
    if (!selectedFile) return;
    try {
      const res = await fetch(`/api/admin/questions?fileId=${selectedFile}`);
      const data = await res.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error loading questions:", error);
    }
  };

  const loadAnswerImages = async () => {
    if (!selectedFile) return;
    try {
      const res = await fetch(`/api/admin/answer-images?fileId=${selectedFile}`);
      const data = await res.json();
      setAnswerImages(data);
    } catch (error) {
      console.error("Error loading answer images:", error);
    }
  };

  const handleDeleteQuestion = async (id: number) => {
    if (confirm("Are you sure you want to delete this question?")) {
      try {
        await fetch(`/api/admin/questions?id=${id}`, { method: "DELETE" });
        loadQuestions();
      } catch (error) {
        console.error("Error deleting question:", error);
      }
    }
  };

  const handleDeleteAnswerImage = async (id: number) => {
    if (confirm("Are you sure you want to delete this answer image?")) {
      try {
        await fetch(`/api/admin/answer-images?id=${id}`, { method: "DELETE" });
        loadAnswerImages();
      } catch (error) {
        console.error("Error deleting answer image:", error);
      }
    }
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

      {/* File Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-slate-200 dark:border-gray-700 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-gray-100 mb-4">
          Select PDF File
        </h3>
        <select
          value={selectedFile || ""}
          onChange={(e) => setSelectedFile(e.target.value ? parseInt(e.target.value) : null)}
          className="w-full px-4 py-3 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-slate-900 dark:text-gray-100"
        >
          <option value="">Choose a PDF file...</option>
          {files.map((file) => (
            <option key={file.id} value={file.id}>
              {file.name} {file.class && `(${file.class})`}
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
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" />
                    Questions ({questions.length})
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('answers')}
                  className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === 'answers'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Image className="w-4 h-4" />
                    Answer Images ({answerImages.length})
                  </div>
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'questions' ? (
                <div className="space-y-6">
                  {/* Add Question Button */}
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-gray-100">
                      Questions
                    </h3>
                    <button
                      onClick={() => setShowQuestionForm(true)}
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Question
                    </button>
                  </div>

                  {/* Questions List */}
                  <div className="space-y-4">
                    {questions.length === 0 ? (
                      <div className="text-center py-8 text-slate-500 dark:text-gray-400">
                        No questions added yet
                      </div>
                    ) : (
                      questions.map((question) => (
                        <div
                          key={question.id}
                          className="border border-slate-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-sm transition-shadow"
                        >
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
                              <p className="text-sm text-slate-600 dark:text-gray-300">
                                {question.content.question}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              <button
                                onClick={() => {
                                  setEditingQuestion(question);
                                  setShowQuestionForm(true);
                                }}
                                className="p-2 text-slate-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteQuestion(question.id)}
                                className="p-2 text-slate-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Add Answer Image Button */}
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-gray-100">
                      Answer Images
                    </h3>
                    <button
                      onClick={() => setShowAnswerForm(true)}
                      className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Answer Image
                    </button>
                  </div>

                  {/* Answer Images Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {answerImages.length === 0 ? (
                      <div className="col-span-full text-center py-8 text-slate-500 dark:text-gray-400">
                        No answer images added yet
                      </div>
                    ) : (
                      answerImages.map((answerImage) => (
                        <div
                          key={answerImage.id}
                          className="border border-slate-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-sm transition-shadow"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded text-xs font-medium">
                              Page {answerImage.pageNumber}
                            </span>
                            <button
                              onClick={() => handleDeleteAnswerImage(answerImage.id)}
                              className="p-1 text-slate-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <img
                            src={answerImage.imagePath}
                            alt="Answer"
                            className="w-full h-32 object-cover rounded-lg mb-2"
                          />
                          {answerImage.description && (
                            <p className="text-sm text-slate-600 dark:text-gray-300">
                              {answerImage.description}
                            </p>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Question Form Modal */}
          {showQuestionForm && (
            <QuestionForm
              fileId={selectedFile}
              question={editingQuestion}
              onClose={() => {
                setShowQuestionForm(false);
                setEditingQuestion(null);
              }}
              onSaved={() => {
                loadQuestions();
                setShowQuestionForm(false);
                setEditingQuestion(null);
              }}
            />
          )}

          {/* Answer Image Form Modal */}
          {showAnswerForm && (
            <AnswerImageForm
              fileId={selectedFile}
              onClose={() => setShowAnswerForm(false)}
              onSaved={() => {
                loadAnswerImages();
                setShowAnswerForm(false);
              }}
            />
          )}
        </>
      )}
    </div>
  );
}