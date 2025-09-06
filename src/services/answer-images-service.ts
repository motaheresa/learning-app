// src/services/answer-images-service.ts
import { prisma } from '@/lib/prisma';
import { writeFile, unlink, access, mkdir } from 'fs/promises';
import { join } from 'path';
import { nanoid } from 'nanoid';

const UPLOAD_DIR = join(process.cwd(), "public", "uploads", "answers");

export class AnswerImagesService {
  static async getAnswerImages(filters: { fileId?: number; pageNumber?: number }) {
    return prisma.answerImage.findMany({
      where: filters,
      orderBy: { pageNumber: "asc" },
      include: {
        file: {
          select: { id: true, name: true }
        }
      }
    });
  }

  static async createAnswerImage(
    image: File, 
    fileId: number, 
    pageNumber: number, 
    description?: string
  ) {
    // Validate inputs
    if (!image || !fileId || !pageNumber) {
      throw new Error("Image, fileId, and pageNumber are required");
    }

    // Create directory if it doesn't exist
    try {
      await access(UPLOAD_DIR);
    } catch {
      await mkdir(UPLOAD_DIR, { recursive: true });
    }

    // Process and save the image
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uniqueName = `${nanoid()}-${image.name}`;
    const filePath = join(UPLOAD_DIR, uniqueName);
    await writeFile(filePath, buffer);

    // Create database record
    return prisma.answerImage.create({
      data: {
        fileId,
        pageNumber,
        imagePath: `/uploads/answers/${uniqueName}`,
        description: description || null,
      },
      include: {
        file: {
          select: { id: true, name: true }
        }
      }
    });
  }

  static async deleteAnswerImage(id: number) {
    const answerImage = await prisma.answerImage.findUnique({
      where: { id }
    });

    if (answerImage) {
      // Delete the file from filesystem
      const absolutePath = join(process.cwd(), "public", answerImage.imagePath);
      await unlink(absolutePath).catch(() => {});
      
      // Delete from database
      await prisma.answerImage.delete({
        where: { id }
      });
    }

    return { success: true };
  }
}