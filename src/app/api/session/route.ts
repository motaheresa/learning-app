// app/api/session/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

interface UserSession {
  id: string;
  email: string;
  role: string;
  name?: string;
}

export async function GET() {
  try {
    const cookie = cookies().get("session_user")?.value;
    if (!cookie) {
      return NextResponse.json({ user: null });
    }

    const user: UserSession = JSON.parse(cookie);
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Session API error:", error);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
