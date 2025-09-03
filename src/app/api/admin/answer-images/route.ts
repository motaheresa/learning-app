// src/app/api/admin/answer-images/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, unlink } from "fs/promises";
import { join } from "path";
import { nanoid } from "nanoid";

const UPLOAD_DIR = join(process.cwd(), "public", "uploads", "answers");

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const fileId = searchParams.get("fileId");
    const pageNumber = searchParams.get("pageNumber");

    const where: any = {};
    if (fileId) where.fileId = parseInt(fileId, 10);
    if (pageNumber) where.pageNumber = parseInt(pageNumber, 10);

    const answerImages = await prisma.answerImage.findMany({
      where,
      orderBy: { pageNumber: "asc" },
      include: {
        file: {
          select: { id: true, name: true }
        }
      }
    });

    return NextResponse.json(answerImages);
  } catch (error) {
    console.error("Error fetching answer images:", error);
    return NextResponse.json({ error: "Failed to fetch answer images" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const image = formData.get("image") as File | null;
    const fileId = formData.get("fileId") as string | null;
    const pageNumber = formData.get("pageNumber") as string | null;
    const description = formData.get("description") as string | null;

    if (!image || !fileId || !pageNumber) {
      return NextResponse.json(
        { error: "Image, fileId, and pageNumber are required" },
        { status: 400 }
      );
    }

    // Create directory if it doesn't exist
    const fs = await import("fs/promises");
    try {
      await fs.access(UPLOAD_DIR);
    } catch {
      await fs.mkdir(UPLOAD_DIR, { recursive: true });
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uniqueName = `${nanoid()}-${image.name}`;
    const filePath = join(UPLOAD_DIR, uniqueName);
    await writeFile(filePath, buffer);

    const answerImage = await prisma.answerImage.create({
      data: {
        fileId: parseInt(fileId, 10),
        pageNumber: parseInt(pageNumber, 10),
        imagePath: `/uploads/answers/${uniqueName}`,
        description: description || null,
      },
      include: {
        file: {
          select: { id: true, name: true }
        }
      }
    });

    return NextResponse.json(answerImage);
  } catch (error) {
    console.error("Error uploading answer image:", error);
    return NextResponse.json({ error: "Failed to upload answer image" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get("id") || "", 10);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid answer image ID" }, { status: 400 });
    }

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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting answer image:", error);
    return NextResponse.json({ error: "Failed to delete answer image" }, { status: 500 });
  }
}