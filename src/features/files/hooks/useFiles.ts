"use client";
import { useEffect, useState } from "react";

export function useFiles() {
  const [files, setFiles] = useState<
    { id: number; name: string; path: string; class: { name: string } }[]
  >([]);

  async function load() {
    const res = await fetch("/api/admin/files");
    setFiles(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  return { files, reload: load };
}
