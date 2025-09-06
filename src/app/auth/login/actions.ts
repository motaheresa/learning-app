"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs"; // Using bcryptjs for better compatibility
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Define types for our login data
interface LoginData {
  email: string;
  password: string;
}

interface UserSession {
  id: string;
  email: string;
  role: string;
}

export async function loginAction(formData: FormData): Promise<{
  success: boolean;
  message?: string;
  role?: string;
  email?: string;
}> {
  try {
    const rawData: LoginData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    // Validate input
    if (!rawData.email || !rawData.password) {
      return { success: false, message: "All fields are required" };
    }

    if (!rawData.email.includes("@")) {
      return { success: false, message: "Please provide a valid email" };
    }

    // Find user
    const user = await prisma.user.findUnique({ 
      where: { email: rawData.email.trim().toLowerCase() } 
    });
    
    if (!user) {
      // Don't reveal that the user doesn't exist for security
      return { success: false, message: "Invalid credentials" };
    }

    // Verify password
    const isValid = await bcrypt.compare(rawData.password, user.password);
    if (!isValid) {
      return { success: false, message: "Invalid credentials" };
    }

    // Create session
    const sessionData: UserSession = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    cookies().set("session_user", JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
      sameSite: "lax",
    });

    return { 
      success: true, 
      role: user.role, 
      email: user.email 
    };

  } catch (error) {
    console.error("Login action error:", error);
    return { 
      success: false, 
      message: "An unexpected error occurred. Please try again." 
    };
  }
}