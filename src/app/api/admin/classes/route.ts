import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all classes
export async function GET() {
  const classes = await prisma.class.findMany();
  return NextResponse.json(classes);
}

// POST create new class
export async function POST(req: Request) {
  const data = await req.json();
  if (!data.name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const newClass = await prisma.class.create({
    data: { name: data.name },
  });

  return NextResponse.json(newClass);
}

// DELETE class by ID
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  await prisma.class.delete({ where: { id: Number(id) } });
  return NextResponse.json({ success: true });
}
