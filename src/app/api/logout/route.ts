// src/app/api/logout/route.ts
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });
  // Clear cookie server-side
  response.cookies.set("session_user", "", { expires: new Date(0), path: "/" });
  // redirect("/auth/login")
  return response;
}