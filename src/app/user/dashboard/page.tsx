// app/dashboard/page.tsx (Server Component)
import { Metadata } from "next";
import UserDashboard from "./_components/UserDashboard";

interface PageProps {
  searchParams: Promise<{ class?: string }>;
}

export const metadata: Metadata = {
  title: "لوحة التحكم",
  description: "إدارة ملفاتك والوصول إليها بسهولة",
};

async function getFiles(classId?: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL!}/api/admin/files?classId=${classId || ""}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch files");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching files:", error);
    return [];
  }
}

export default async function DashboardPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const classId = params.class;
  const files = await getFiles(classId);

  return <UserDashboard files={files} classId={classId} />;
}