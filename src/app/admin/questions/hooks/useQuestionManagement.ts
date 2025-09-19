// src/hooks/useQuestionManagement.ts
import { useState, useCallback } from 'react';
import { FileRecord, Question, AnswerImage, LoadingState } from '@/types/question';

export const useQuestionManagement = () => {
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answerImages, setAnswerImages] = useState<AnswerImage[]>([]);
  const [selectedFile, setSelectedFile] = useState<number | null>(null);
  const [loading, setLoading] = useState<LoadingState>({
    files: false,
    questions: false,
    answerImages: false,
    deleting: false
  });
  const [error, setError] = useState<string | null>(null);

  const loadFiles = useCallback(async () => {
    setLoading(prev => ({ ...prev, files: true }));
    setError(null);
    try {
      const res = await fetch("/api/admin/files");
      if (!res.ok) throw new Error('Failed to load files');
      const data = await res.json();
      setFiles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load files');
    } finally {
      setLoading(prev => ({ ...prev, files: false }));
    }
  }, []);

  const loadQuestions = useCallback(async (fileId: number) => {
    setLoading(prev => ({ ...prev, questions: true }));
    setError(null);
    try {
      const res = await fetch(`/api/admin/questions?fileId=${fileId}`);
      if (!res.ok) throw new Error('Failed to load questions');
      const data = await res.json();
      setQuestions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load questions');
    } finally {
      setLoading(prev => ({ ...prev, questions: false }));
    }
  }, []);

  const loadAnswerImages = useCallback(async (fileId: number) => {
    setLoading(prev => ({ ...prev, answerImages: true }));
    setError(null);
    try {
      const res = await fetch(`/api/admin/answer-images?fileId=${fileId}`);
      if (!res.ok) throw new Error('Failed to load answer images');
      const data = await res.json();
      console.log(data);
      
      setAnswerImages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load answer images');
    } finally {
      setLoading(prev => ({ ...prev, answerImages: false }));
    }
  }, []);

  const deleteQuestion = useCallback(async (id: number) => {
    setLoading(prev => ({ ...prev, deleting: true }));
    setError(null);
    try {
      const res = await fetch(`/api/admin/questions?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error('Failed to delete question');
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete question');
      return false;
    } finally {
      setLoading(prev => ({ ...prev, deleting: false }));
    }
  }, []);

  const deleteAnswerImage = useCallback(async (id: number) => {
    setLoading(prev => ({ ...prev, deleting: true }));
    setError(null);
    try {
      const res = await fetch(`/api/admin/answer-images?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error('Failed to delete answer image');
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete answer image');
      return false;
    } finally {
      setLoading(prev => ({ ...prev, deleting: false }));
    }
  }, []);

  return {
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
  };
};