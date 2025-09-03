// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  
  const session = req.cookies.get("session_user");

  // Protect dashboard and homepage
  if (!session && (req.nextUrl.pathname.startsWith("/admin") || req.nextUrl.pathname === "/")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next(); // <-- important to continue if no redirect
}
export const config = {
  matcher: ["/:path*", "/"], 
};
