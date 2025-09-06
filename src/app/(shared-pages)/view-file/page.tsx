"use client";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

const DynamicPDFViewer = dynamic(
  () => import("./components/PdfViewer").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <p>جارٍ تحميل عارض PDF...</p>,
  }
);

function ViewFileContent() {
  const params = useSearchParams();
  const filePath: string = params.get("file")!;
  const [fileId, setFileId] = useState<number | undefined>(undefined);

  useEffect(() => {
    const loadFileId = async () => {
      try {
        const response = await fetch(`/api/admin/files`);
        const files = await response.json();
        const file = files.find((f: any) => f.path === filePath);
        if (file) setFileId(file.id);
      } catch (error) {
        console.error("Error loading file ID:", error);
      }
    };

    if (filePath) loadFileId();
  }, [filePath]);

  return (
    <main className="container mx-auto">
      <DynamicPDFViewer pdf={filePath} fileId={fileId} />
    </main>
  );
}

export default function ViewFile() {
  return (
    <Suspense fallback={<p>Loading file...</p>}>
      <ViewFileContent />
    </Suspense>
  );
}
