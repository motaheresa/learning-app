
// src/app/api/admin/answer-images/route.ts

import { NextRequest, NextResponse } from "next/server";
import { ApiError, handleApiError, parseQueryParams } from "@/lib/api-utils";
import { AnswerImagesService } from "@/services/answer-images-service";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const filters = parseQueryParams(searchParams, {
      fileId: 'number',
      pageNumber: 'number'
    });

    const answerImages = await AnswerImagesService.getAnswerImages(filters);
    return NextResponse.json(answerImages);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  console.log("Cloudinary config:", {
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? "set" : "missing",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "set" : "missing",
});
  try {
    const formData = await req.formData();
    const image = formData.get("image") as File | null;
    const fileId = parseInt(formData.get("fileId") as string, 10);
    const pageNumber = parseInt(formData.get("pageNumber") as string, 10);
    const description = formData.get("description") as string | null;

    if (!image || isNaN(fileId) || isNaN(pageNumber)) {
      throw new ApiError(400, "Image, fileId, and pageNumber are required");
    }

    const answerImage = await AnswerImagesService.createAnswerImage(
      image,
      fileId,
      pageNumber,
      description
    );

    return NextResponse.json(answerImage);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get("id") || "", 10);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid answer image ID");
    }

    await AnswerImagesService.deleteAnswerImage(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}