"use client";
import { useEffect, useState } from "react";

export default function UserFilesPage() {
  const [files, setFiles] = useState<
    { id: number; name: string; path: string; class: { name: string } }[]
  >([]);

  // لاحقاً هتربط الـ classId من session أو query
  const userClassId = 1;

  useEffect(() => {
    fetch(`/api/admin/files?classId=${userClassId}`)
      .then((res) => res.json())
      .then(setFiles);
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Files</h1>
      <ul className="space-y-2">
        {files.map((file) => (
          <li key={file.id} className="border p-2 rounded">
            <a href={file.path} target="_blank" rel="noopener noreferrer">
              {file.name}
            </a>{" "}
            {/* <span className="text-sm text-gray-500">({file.class.name})</span> */}
          </li>
        ))}
      </ul>
    </div>
  );
}
