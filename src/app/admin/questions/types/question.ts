// src/types/question.ts
export interface FileRecord {
  id: number;
  name: string;
  path: string;
  description?: string;
  classId: number;
  className?: string;
  createdAt: string;
  updatedAt?: string;
  fileType: string;
  size?: number;
}

export interface Question {
  id: number;
  fileId: number;
  pageNumber: number;
  title: string;
  type: "MULTIPLE_CHOICE" | "COMPLETION";
  content: {
    question: string;
    options?: string[];
  };
  answer: {
    correct: string;
    explanation?: string;
  };
  file: {
    id: number;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AnswerImage {
  id: number;
  fileId: number;
  pageNumber: number;
  imagePath: string;
  description?: string;
  file: {
    id: number;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export type QuestionType = "MULTIPLE_CHOICE" | "COMPLETION";

export interface LoadingState {
  files: boolean;
  questions: boolean;
  answerImages: boolean;
  deleting: boolean;
}