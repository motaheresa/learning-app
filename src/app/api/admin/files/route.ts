import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, unlink } from "fs/promises";
import { join } from "path";
import { nanoid } from "nanoid";

const UPLOAD_DIR = join(process.cwd(), "public", "uploads");

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

export async function POST(req: Request) {
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

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uniqueName = `${nanoid()}-${file.name}`;
    const filePath = join(UPLOAD_DIR, uniqueName);
    await writeFile(filePath, buffer);

    const newFile = await prisma.file.create({
      data: {
        name: file.name,
        path: `/uploads/${uniqueName}`,
        classId,
        description: description || null,
      },
    });

    return NextResponse.json(newFile);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to upload file", err },
      { status: 500 }
    );
  }
}

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

    const absolutePath = join(process.cwd(), "public", file.path);
    await unlink(absolutePath).catch(() => {});

    await prisma.file.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    );
  }
}
