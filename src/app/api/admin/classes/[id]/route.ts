// src/app/api/admin/classes/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiError, handleApiError } from "@/lib/api-utils";

// GET specific class (if needed)
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      throw new ApiError(400, "Invalid class ID");
    }

    const classItem = await prisma.class.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            files: true,
            users: true
          }
        }
      }
    });

    if (!classItem) {
      throw new ApiError(404, "Class not found");
    }

    return NextResponse.json({
      id: classItem.id,
      name: classItem.name,
      fileCount: classItem._count.files,
      studentCount: classItem._count.users
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// UPDATE class
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      throw new ApiError(400, "Invalid class ID");
    }

    const data = await req.json();
    const { name } = data;

    if (!name || name.trim() === '') {
      throw new ApiError(400, "Class name is required");
    }

    // Check if class exists
    const existingClass = await prisma.class.findUnique({
      where: { id }
    });

    if (!existingClass) {
      throw new ApiError(404, "Class not found");
    }

    // Check if another class already has this name
    const duplicateClass = await prisma.class.findFirst({
      where: {
        name: {
          equals: name.trim(),
          mode: 'insensitive'
        },
        id: {
          not: id
        }
      }
    });

    if (duplicateClass) {
      throw new ApiError(400, "Another class with this name already exists");
    }

    const updatedClass = await prisma.class.update({
      where: { id },
      data: { name: name.trim() },
      include: {
        _count: {
          select: {
            files: true,
            users: true
          }
        }
      }
    });

    return NextResponse.json({
      id: updatedClass.id,
      name: updatedClass.name,
      fileCount: updatedClass._count.files,
      studentCount: updatedClass._count.users
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE class
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      throw new ApiError(400, "Invalid class ID");
    }

    // Check if class exists
    const existingClass = await prisma.class.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            files: true,
            users: true
          }
        }
      }
    });

    if (!existingClass) {
      throw new ApiError(404, "Class not found");
    }

    // Optional: Add validation to prevent deletion of classes with content
    if (existingClass._count.files > 0) {
      throw new ApiError(400, "Cannot delete class that contains files. Please remove all files first.");
    }

    if (existingClass._count.users > 0) {
      throw new ApiError(400, "Cannot delete class that has students assigned. Please reassign students first.");
    }

    await prisma.class.delete({
      where: { id }
    });

    return NextResponse.json({ 
      success: true,
      message: "Class deleted successfully" 
    });
  } catch (error) {
    return handleApiError(error);
  }
}