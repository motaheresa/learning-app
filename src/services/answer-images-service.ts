// src/services/answer-images-service.ts
import { prisma } from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export class AnswerImagesService {
  static async getAnswerImages(filters: { fileId?: number; pageNumber?: number }) {
    return prisma.answerImage.findMany({
      where: filters,
      orderBy: { pageNumber: 'asc' },
      include: {
        file: { select: { id: true, name: true } },
      },
    });
  }

  static async createAnswerImage(
    image: File,
    fileId: number,
    pageNumber: number,
    description?: string
  ) {
    if (!image || !fileId || !pageNumber) {
      throw new Error('Image, fileId, and pageNumber are required');
    }

    // Convert File → Buffer
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload directly to Cloudinary
    const result: any = await new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          folder: 'answers',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      Readable.from(buffer).pipe(upload);
    });

    // Save only Cloudinary URL + public_id in DB
    return prisma.answerImage.create({
      data: {
        fileId,
        pageNumber,
        imagePath: result.secure_url, // <-- cloudinary URL instead of local path
        description: description || null,
      },
      include: {
        file: { select: { id: true, name: true } },
      },
    });
  }

  static async deleteAnswerImage(id: number) {
    const answerImage = await prisma.answerImage.findUnique({ where: { id } });

    if (answerImage) {
      // If you stored public_id, you can also delete from Cloudinary
      // await cloudinary.uploader.destroy(answerImage.publicId);

      await prisma.answerImage.delete({ where: { id } });
    }

    return { success: true };
  }
}
