// src/app/api/admin/questions/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const fileId = searchParams.get("fileId");
    const pageNumber = searchParams.get("pageNumber");

    const where: any = {};
    if (fileId) where.fileId = parseInt(fileId, 10);
    if (pageNumber) where.pageNumber = parseInt(pageNumber, 10);

    const questions = await prisma.question.findMany({
      where,
      orderBy: { pageNumber: "asc" },
      include: {
        file: {
          select: { id: true, name: true }
        }
      }
    });

    return NextResponse.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { fileId, pageNumber, title, type, content, answer } = data;

    if (!fileId || !pageNumber || !title || !type || !content || !answer) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const question = await prisma.question.create({
      data: {
        fileId: parseInt(fileId, 10),
        pageNumber: parseInt(pageNumber, 10),
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

    return NextResponse.json(question);
  } catch (error) {
    console.error("Error creating question:", error);
    return NextResponse.json({ error: "Failed to create question" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get("id") || "", 10);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid question ID" }, { status: 400 });
    }

    await prisma.question.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting question:", error);
    return NextResponse.json({ error: "Failed to delete question" }, { status: 500 });
  }
}