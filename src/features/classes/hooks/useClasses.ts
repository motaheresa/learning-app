"use client";
import { useEffect, useState } from "react";

export function useClasses() {
  const [classes, setClasses] = useState<{ id: number; name: string }[]>([]);

  async function load() {
    const res = await fetch("/api/admin/classes");
    setClasses(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  return { classes, reload: load };
}
