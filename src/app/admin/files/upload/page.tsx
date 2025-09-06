// src/components/UploadPage.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUploadForm } from "./hooks/useUploadForm";
import { UploadHeader } from "./_components/UploadHeader";
import { UploadForm } from "./_components/UploadForm";
import { StatusMessage } from "@/ui/StatusMessage";
import { UploadGuidelines } from "./_components/UploadGuidelines";

export default function UploadPage() {
  const router = useRouter();
  const {
    classes,
    classesLoading,
    loading,
    uploadStatus,
    errorMessage,
    dragActive,
    selectedFile,
    formData,
    loadClasses,
    handleInputChange,
    handleDrag,
    handleDrop,
    handleFileSelect,
    removeFile,
    handleUpload
  } = useUploadForm();

  useEffect(() => {
    loadClasses();
  }, [loadClasses]);

  useEffect(() => {
    if (uploadStatus === "success") {
      const timer = setTimeout(() => router.push("/admin"), 1500);
      return () => clearTimeout(timer);
    }
  }, [uploadStatus, router]);

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
      <UploadHeader
        title="Upload Center"
        description="Upload new educational resources to your library"
      />

      {errorMessage && (
        <StatusMessage
          type="error"
          message={errorMessage}
          onClose={() => {}}
        />
      )}

      <UploadForm
        selectedFile={selectedFile}
        dragActive={dragActive}
        classes={classes}
        classesLoading={classesLoading}
        formData={formData}
        loading={loading}
        onDrag={handleDrag}
        onDrop={handleDrop}
        onFileSelect={handleFileSelect}
        onRemoveFile={removeFile}
        onInputChange={handleInputChange}
        onSubmit={handleUpload}
      />

      {uploadStatus === "success" && (
        <StatusMessage
          type="success"
          message="File uploaded successfully!"
          details="Your file has been added to the library. Redirecting to dashboard..."
        />
      )}

      {uploadStatus === "error" && (
        <StatusMessage
          type="error"
          message="Upload failed"
          details={errorMessage || "Please try again or contact support if the issue persists."}
        />
      )}

      <UploadGuidelines />
    </div>
  );
}