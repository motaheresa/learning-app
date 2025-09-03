"use client"
// src/app/page.tsx
import dynamic from 'next/dynamic';
const DynamicPDFViewer = dynamic(
  () => import('@/features/pdf-viewer').then(mod => mod.PDFViewer),
  { 
    ssr: false,
    loading: () => <p>جارٍ تحميل عارض PDF...</p>
  }
);

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">عارض PDF التفاعلي</h1>
      <DynamicPDFViewer pdf="/example.pdf" />
    </main>
  );
}