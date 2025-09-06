// src/app/api/admin/questions/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { QuestionsService } from "@/services/questions-service";
import { ApiError, handleApiError } from "@/lib/api-utils";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      throw new ApiError(400, "Invalid question ID");
    }

    const data = await req.json();
    const { pageNumber, title, type, content, answer } = data;

    if (!pageNumber || !title || !type || !content || !answer) {
      throw new ApiError(400, "All fields are required");
    }

    const question = await QuestionsService.updateQuestion(id, {
      pageNumber,
      title,
      type,
      content,
      answer
    });

    return NextResponse.json(question);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      throw new ApiError(400, "Invalid question ID");
    }

    await QuestionsService.deleteQuestion(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}