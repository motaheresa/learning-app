// src/services/files-service.ts
import { prisma } from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export class FilesService {
  static async getFiles(classId?: number) {
    return prisma.file.findMany({
      where: classId ? { classId } : {},
      orderBy: { createdAt: "desc" },
    });
  }

  static async uploadFile(
    file: File, 
    classId: number, 
    description?: string
  ) {
    if (!file || !classId) {
      throw new Error("File and classId are required");
    }

    // Convert the file to a buffer, then to a base64 string
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileBase64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Upload the file to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(fileBase64, {
      folder: 'educational-files',
      resource_type: "raw",
      access_mode: "public",
    });

    // Create database record
    return prisma.file.create({
      data: {
        name: file.name,
        path: uploadResult.secure_url,
        classId,
        description: description || null,
      },
    });
  }

  static async deleteFile(id: number) {
    const file = await prisma.file.findUnique({ where: { id } });
    if (!file) {
      throw new Error("File not found");
    }
    
    // Extract the public ID from the Cloudinary URL
    const publicIdWithExtension = file.path.split('/').pop();
    const publicId = publicIdWithExtension?.split('.')[0];
    
    if (publicId) {
      // Delete the file from Cloudinary
      await cloudinary.uploader.destroy(`educational-files/${publicId}`);
    }

    // Delete from database
    await prisma.file.delete({ where: { id } });

    return { success: true };
  }
}