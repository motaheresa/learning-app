// src/app/api/admin/classes/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiError, handleApiError } from "@/lib/api-utils";

// GET all classes
export async function GET() {
  try {
    const classes = await prisma.class.findMany({
      include: {
        _count: {
          select: {
            files: true,
            users: true,
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    // Format the response to include counts
    const formattedClasses = classes.map(cls => ({
      id: cls.id,
      name: cls.name,
      fileCount: cls._count.files,
      studentCount: cls._count.users
    }));

    return NextResponse.json(formattedClasses);
  } catch (error) {
    return handleApiError(error);
  }
}

// POST create new class
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name } = data;

    if (!name || name.trim() === '') {
      throw new ApiError(400, "Class name is required");
    }

    // Check if class already exists
    const existingClass = await prisma.class.findFirst({
      where: {
        name: {
          equals: name.trim(),
          mode: 'insensitive'
        }
      }
    });

    if (existingClass) {
      throw new ApiError(400, "A class with this name already exists");
    }

    const newClass = await prisma.class.create({
      data: { 
        name: name.trim()
      },
    });

    return NextResponse.json({
      id: newClass.id,
      name: newClass.name,
      fileCount: 0,
      studentCount: 0
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// IMPORTANT: Do NOT add DELETE method here
// DELETE should only be handled in /api/admin/classes/[id]/route.ts