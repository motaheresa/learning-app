// src/app/api/admin/questions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { QuestionsService } from "@/services/questions-service";
import { ApiError, handleApiError, parseQueryParams } from "@/lib/api-utils";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const filters = parseQueryParams(searchParams, {
      fileId: 'number',
      pageNumber: 'number'
    });

    const questions = await QuestionsService.getQuestions(filters);
    return NextResponse.json(questions);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { fileId, pageNumber, title, type, content, answer } = data;

    if (!fileId || !pageNumber || !title || !type || !content || !answer) {
      throw new ApiError(400, "All fields are required");
    }

    const question = await QuestionsService.createQuestion({
      fileId,
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

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get("id") || "", 10);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid question ID");
    }

    await QuestionsService.deleteQuestion(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}