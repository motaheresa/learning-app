export default function FileList({
  files,
  onDeleted,
}: {
  files: { id: number; name: string; path: string; className: string }[];
  onDeleted: () => void;
}) {
  async function handleDelete(id: number) {
    await fetch(`/api/admin/files?id=${id}`, { method: "DELETE" });
    onDeleted();
  }

  return (
    <ul className="space-y-2">
      {files.map((file) => (
        <li
          key={file.id}
          className="flex justify-between items-center border p-2 rounded"
        >
          <span>
            {file.name}{" "}
            <span className="text-sm text-gray-500">({file.className})</span>
          </span>
          <button
            onClick={() => handleDelete(file.id)}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
