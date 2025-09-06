// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define user roles for type safety
type UserRole = 'ADMIN' | 'STUDENT';

// Interface for the user session
interface UserSession {
  id: string;
  email: string;
  role: UserRole;
}

export function middleware(req: NextRequest) {
  const sessionCookie = req.cookies.get("session_user")!;
  const { pathname } = req.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ['/auth/login',"/"];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  
  // If accessing a public route, no need to check authentication
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // If no session and trying to access protected route, redirect to login
  if (!sessionCookie) {
    const loginUrl = new URL('/auth/login', req.url);
    // Add redirect parameter to send user back after login
    loginUrl.searchParams.set('callbackUrl', encodeURI(req.url));
    return NextResponse.redirect(loginUrl);
  }

  
  try {
    // Parse the session data
    const session: UserSession  & { exp?: number } = JSON.parse(sessionCookie.value);
  if (session.exp && Date.now() > session.exp) {
  const response = NextResponse.redirect(new URL('/auth/login', req.url));
  response.cookies.delete('session_user');
  return response;
}  
    // Admin routes protection
    if (pathname.startsWith('/admin')&&!pathname.includes("files")) {
      if (session.role !== 'ADMIN') {
        // If non-admin tries to access admin area, redirect to appropriate dashboard
        const redirectUrl = session.role === 'STUDENT' 
          ? '/user/dashboard' 
          : '/auth/unauthorized';
        return NextResponse.redirect(new URL(redirectUrl, req.url));
      }
    }
    
    // User routes protection
    if (pathname.startsWith('/user')) {
      if (session.role !== 'STUDENT') {
        // If non-student tries to access user area, redirect to appropriate dashboard
        const redirectUrl = session.role === 'ADMIN' 
          ? '/admin' 
          : '/auth/unauthorized';
        return NextResponse.redirect(new URL(redirectUrl, req.url));
      }
    }

    // Allow access to the requested route
    return NextResponse.next();
  } catch (error) {
    // If session parsing fails, clear invalid cookie and redirect to login
    console.error('Invalid session cookie:', error);
    const response = NextResponse.redirect(new URL('/auth/login', req.url));
    response.cookies.delete('session_user');
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};