// src/app/auth/login/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, message: "All fields are required" };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { success: false, message: "user not found" };
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return { success: false, message: "Invalid credentials" };
  }

  // احفظ Session بسيطة في كوكي (للتجريب)
  cookies().set(
    "session_user",
    JSON.stringify({ id: user.id, email: user.email, role: user.role }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // يوم
      path: "/",
    }
  );

  return { success: true, role: user.role,email:user.email };
}
