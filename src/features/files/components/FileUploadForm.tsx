"use client";
import { useState, useEffect } from "react";

type Class = { id: number; name: string };

export default function FileUploadForm({ onUploaded }: { onUploaded: () => void }) {
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClass, setSelectedClass] = useState("");

  useEffect(() => {
    fetch("/api/admin/classes").then((res) => res.json()).then(setClasses);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    await fetch("/api/admin/files", { method: "POST", body: formData });
    form.reset();
    onUploaded();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded">
      <input type="file" name="file" required className="block" />
      <textarea
        name="description"
        placeholder="Description (optional)"
        className="border p-2 rounded w-full"
      />
      <select
        name="classId"
        value={selectedClass}
        onChange={(e) => setSelectedClass(e.target.value)}
        required
        className="border p-2 rounded w-full"
      >
        <option value="">Select class</option>
        {classes.map((cls) => (
          <option key={cls.id} value={cls.id}>{cls.name}</option>
        ))}
      </select>
      <button className="bg-green-600 text-white px-4 py-2 rounded">Upload</button>
    </form>
  );
}
