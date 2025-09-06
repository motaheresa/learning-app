// src/app/api/admin/files/route.ts
import { NextRequest, NextResponse } from "next/server";
import { FilesService } from "@/services/files-service";
import { ApiError, handleApiError, parseQueryParams } from "@/lib/api-utils";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const filters = parseQueryParams(searchParams, {
      classId: 'number'
    });

    const files = await FilesService.getFiles(filters.classId);
    
    return NextResponse.json(files);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const classId = parseInt(formData.get("classId") as string, 10);
    const description = formData.get("description") as string | null;

    if (!file || isNaN(classId)) {
      throw new ApiError(400, "File and classId are required");
    }

    const newFile = await FilesService.uploadFile(file, classId, description);
    return NextResponse.json(newFile);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get("id") || "", 10);

    if (isNaN(id)) {
      throw new ApiError(400, "Invalid file ID");
    }

    await FilesService.deleteFile(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}