// src/services/questions-service.ts
import { prisma } from '@/lib/prisma';

export class QuestionsService {
  static async getQuestions(filters: { fileId?: number; pageNumber?: number }) {
    return prisma.question.findMany({
      where: filters,
      orderBy: { pageNumber: "asc" },
      include: {
        file: {
          select: { id: true, name: true }
        }
      }
    });
  }

  static async createQuestion(data: {
    fileId: number;
    pageNumber: number;
    title: string;
    type: string;
    content: string;
    answer: string;
  }) {
    const { fileId, pageNumber, title, type, content, answer } = data;

    if (!fileId || !pageNumber || !title || !type || !content || !answer) {
      throw new Error("All fields are required");
    }

    return prisma.question.create({
      data: {
        fileId,
        pageNumber,
        title,
        type,
        content,
        answer
      },
      include: {
        file: {
          select: { id: true, name: true }
        }
      }
    });
  }

  static async updateQuestion(id: number, data: {
    pageNumber: number;
    title: string;
    type: string;
    content: string;
    answer: string;
  }) {
    const { pageNumber, title, type, content, answer } = data;

    if (!pageNumber || !title || !type || !content || !answer) {
      throw new Error("All fields are required");
    }

    return prisma.question.update({
      where: { id },
      data: {
        pageNumber,
        title,
        type,
        content,
        answer
      },
      include: {
        file: {
          select: { id: true, name: true }
        }
      }
    });
  }

  static async deleteQuestion(id: number) {
    await prisma.question.delete({
      where: { id }
    });

    return { success: true };
  }
}