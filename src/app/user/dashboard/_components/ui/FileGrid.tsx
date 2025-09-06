// components/FileGrid.tsx
"use client";

import React from "react";
import FileCard from "./FileCard";
import { File } from "@/types";

interface FileGridProps {
  files: File[];
}

const FileGrid = ({ files }: FileGridProps) => {
  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {files.map((file, index) => (
          <FileCard key={file.id} file={file} index={index} />
        ))}
      </div>
    </div>
  );
};

export default FileGrid;