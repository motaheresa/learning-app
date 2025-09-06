export const getFiles = async () => {
  const res = await fetch("/api/admin/files", {
    next: {
      revalidate: 3600, // 1h
    },
  });
  const data = await res.json();
  return data
};
