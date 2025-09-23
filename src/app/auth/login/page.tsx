"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "./actions";
import Link from "next/link";

interface LoginResponse {
  success: boolean;
  message?: string;
  role?: string;
  email?: string;
}

export default function LoginPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const res: LoginResponse = await loginAction(formData);
      
      if (res.success && res.role && res.email) {
        if (res.role === "ADMIN") {
          router.push("/admin");
        } else if (res.role === "STUDENT") {
          const classMatch = res.email.match(/class(\d+)/);
          const classNumber = classMatch ? classMatch[1] : "1";
          router.push(`/user/dashboard?class=${classNumber}`);
        }
      } else {
        setError(res.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Card with modern shadow and border */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 p-8">
          {/* Logo/Brand Area */}
          <div className="text-center mb-8">
            <div className="w-fit px-6 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span style={{fontFamily:"fantasy"}} className="text-2xl font-bold text-white">MRS SALMA</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-3 animate-pulse"></div>
              <span className="text-red-700 text-sm font-medium">{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-200 bg-white/50 p-4 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 outline-none"
                  required
                  disabled={isLoading}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                {/* <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                  Forgot password?
                </Link> */}
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full border border-gray-200 bg-white/50 p-4 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 outline-none"
                  required
                  disabled={isLoading}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed relative overflow-hidden"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          {/* <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white/80 text-gray-500">New to our platform?</span>
            </div>
          </div> */}

          {/* Sign Up Link */}
          {/* <div className="text-center">
            <Link 
              href="/auth/signup" 
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors inline-flex items-center"
            >
              Create an account
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div> */}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            © 2025 MRS SALMA. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}