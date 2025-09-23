import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Salma Academy",
    template: "%s | Salma Academy"
  },
  description: "Salma Academy is a cutting-edge learning platform that empowers students and educators with AI-powered tools, interactive classrooms, and personalized learning experiences. Join thousands of students achieving academic excellence",
  keywords: [    "learning management system",
    "online education",
    "virtual classroom",
    "student portal",
    "academic platform",
    "e-learning",
    "education technology",
    "digital learning",
    "course management",
    "student dashboard",
    "teacher tools",
    "academic performance",
    "interactive learning",
    "educational platform",
    "school management"],
  authors: [{ name: "Eng~Mohamed Taher Team" }],
  creator: "Eng~Mohamed Taher",
  publisher: "Eng~Mohamed Taher",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <ThemeProvider>
        {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}