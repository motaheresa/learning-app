// /api/admin/files/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Original GET function remains unchanged
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const classId = searchParams.get("classId");

    const files = await prisma.file.findMany({
      where: classId ? { classId: parseInt(classId, 10) } : {},
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(files);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 });
  }
}

// ✨ UPDATED POST FUNCTION: Uploads file to Cloudinary
export async function POST(req: Request) {
  console.log(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  process.env.CLOUDINARY_API_KEY,
  process.env.CLOUDINARY_API_SECRET,)
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const classIdRaw = formData.get("classId") as string | null;
    const description = formData.get("description") as string | null;

    const classId = classIdRaw ? parseInt(classIdRaw, 10) : null;

    if (!file || !classId) {
      return NextResponse.json(
        { error: "File and classId are required" },
        { status: 400 }
      );
    }

    // Convert the file to a buffer, then to a base64 string
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileBase64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Upload the file to Cloudinary
   const uploadResult = await cloudinary.uploader.upload(fileBase64, {
      folder: 'educational-files',
      resource_type: "raw", // Automatically detects file type (e.g., pdf)
      access_mode: "public", // Make the file publicly accessible
    });

    // Create a new file record in the database with the Cloudinary URL
    const newFile = await prisma.file.create({
      data: {
        name: file.name,
        path: uploadResult.secure_url, // Store the Cloudinary URL
        classId,
        description: description || null,
      },
    });

    return NextResponse.json(newFile);
  } catch (err) {
    console.error('Cloudinary upload or database operation failed:', err);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

// ✨ UPDATED DELETE FUNCTION: Deletes file from Cloudinary
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get("id") || "", 10);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const file = await prisma.file.findUnique({ where: { id } });
    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
    
    // Extract the public ID from the Cloudinary URL
    const publicIdWithExtension = file.path.split('/').pop();
    const publicId = publicIdWithExtension.split('.')[0];
    
    // Delete the file from Cloudinary using its public ID
    await cloudinary.uploader.destroy(`nextjs-pdfs/${publicId}`);

    // Delete the file record from the database
    await prisma.file.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Cloudinary deletion or database operation failed:', err);
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    );
  }
}