"use client";

import React from "react";
import FileCard from "./FileCard";
import { File } from "../../_types";

interface FileGridProps {
  files: File[];
}

const FileGrid = ({ files }: FileGridProps) => {
  return (
    <div className="p-4 md:p-8 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {files.map((file, index) => (
          <FileCard key={file.id} file={file} index={index} />
        ))}
      </div>
    </div>
  );
};

export default FileGrid;