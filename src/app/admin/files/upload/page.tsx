"use client";

import { useEffect, useState } from "react";
import { Upload, FileText, Check, AlertCircle, X, CloudUpload } from "lucide-react";

type ClassRecord = {
  id: number;
  name: string;
};

export default function UploadPage() {
  const [classes, setClasses] = useState<ClassRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    async function loadClasses() {
      try {
        const res = await fetch("/api/admin/classes");
        const data = await res.json();
        setClasses(data);
      } catch (error) {
        console.error('Failed to load classes:', error);
      }
    }
    loadClasses();
  }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (isValidFileType(file)) {
        setSelectedFile(file);
      } else {
        alert('Please upload a valid file type (PDF, DOC, DOCX, PPT, PPTX)');
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const isValidFileType = (file: File) => {
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ];
    return validTypes.includes(file.type);
  };

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setUploadStatus("idle");

    try {
      const formData = new FormData(e.currentTarget);

      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      const response = await fetch("/api/admin/files", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        e.currentTarget.reset();
        setSelectedFile(null);
        setUploadStatus("success");
        setTimeout(() => setUploadStatus("idle"), 5000);
      } else {
        setUploadStatus("error");
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus("error");
    } finally {
      setLoading(false);
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-gray-100 mb-2 transition-colors">
          Upload Center
        </h1>
        <p className="text-slate-600 dark:text-gray-300 transition-colors">
          Upload new educational resources to your library
        </p>
      </div>

      {/* Upload Form */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm overflow-hidden transition-colors">
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-gray-100 flex items-center gap-2 transition-colors">
            <Upload className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            File Upload
          </h2>
        </div>

        <form onSubmit={handleUpload} className="p-4 sm:p-6 space-y-6">
          {/* File Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition-all duration-200 ${
              dragActive
                ? "border-blue-400 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-slate-300 dark:border-gray-600 hover:border-slate-400 dark:hover:border-gray-500"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {selectedFile ? (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                  <FileText className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-slate-800 dark:text-gray-100 break-all">
                    {selectedFile.name}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedFile(null)}
                  className="inline-flex items-center gap-2 text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium transition-colors"
                >
                  <X className="w-4 h-4" />
                  Remove file
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-slate-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto">
                  <CloudUpload className="w-8 h-8 text-slate-400 dark:text-gray-500" />
                </div>
                <div>
                  <p className="text-lg font-medium text-slate-800 dark:text-gray-100 mb-2">
                    Drop your file here, or{" "}
                    <label
                      htmlFor="file-input"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer underline transition-colors"
                    >
                      browse
                    </label>
                  </p>
                  <p className="text-sm text-slate-500 dark:text-gray-400">
                    Supports PDF, DOC, DOCX, PPT, PPTX files up to 10MB
                  </p>
                </div>
                <input
                  id="file-input"
                  type="file"
                  name="file"
                  onChange={handleFileSelect}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                  required
                />
              </div>
            )}
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Class Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300">
                Select Class <span className="text-red-500">*</span>
              </label>
              <select
                name="classId"
                required
                className="w-full px-4 py-3 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-slate-900 dark:text-gray-100 transition-colors"
              >
                <option value="">Choose a class...</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>

            {/* File Priority */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300">
                Priority Level
              </label>
              <select
                name="priority"
                className="w-full px-4 py-3 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-slate-900 dark:text-gray-100 transition-colors"
              >
                <option value="normal">Normal</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              className="w-full px-4 py-3 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white dark:bg-gray-700 text-slate-900 dark:text-gray-100 placeholder-slate-500 dark:placeholder-gray-400 transition-colors"
              placeholder="Add a detailed description of this file's content and purpose..."
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300">
              Tags
            </label>
            <input
              type="text"
              name="tags"
              className="w-full px-4 py-3 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-slate-900 dark:text-gray-100 placeholder-slate-500 dark:placeholder-gray-400 transition-colors"
              placeholder="Enter tags separated by commas (e.g., math, algebra, homework)"
            />
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-gray-700">
            <div className="text-sm text-slate-500 dark:text-gray-400">* Required fields</div>

            <button
              type="submit"
              disabled={loading || !selectedFile}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                loading || !selectedFile
                  ? "bg-slate-300 dark:bg-gray-600 text-slate-500 dark:text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl"
              }`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Upload File
                </>
              )}
            </button>
          </div>
        </form>

        {/* Status Messages */}
        {uploadStatus === "success" && (
          <div className="mx-4 sm:mx-6 mb-4 sm:mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-3 transition-colors">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-green-800 dark:text-green-300 font-medium">
                File uploaded successfully!
              </p>
              <p className="text-green-700 dark:text-green-400 text-sm mt-1">
                Your file has been added to the library.
              </p>
            </div>
          </div>
        )}

        {uploadStatus === "error" && (
          <div className="mx-4 sm:mx-6 mb-4 sm:mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3 transition-colors">
            <div className="w-8 h-8 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-red-800 dark:text-red-300 font-medium">Upload failed</p>
              <p className="text-red-700 dark:text-red-400 text-sm mt-1">
                Please try again or contact support if the issue persists.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Upload Guidelines */}
      <div className="bg-slate-100 dark:bg-gray-800 rounded-xl p-4 sm:p-6 transition-colors">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-gray-100 mb-4">
          Upload Guidelines
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-sm">
          <div>
            <h4 className="font-medium text-slate-700 dark:text-gray-200 mb-2">
              Supported Formats
            </h4>
            <ul className="text-slate-600 dark:text-gray-300 space-y-1">
              <li>• PDF documents (.pdf)</li>
              <li>• Word documents (.doc, .docx)</li>
              <li>• PowerPoint presentations (.ppt, .pptx)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-slate-700 dark:text-gray-200 mb-2">
              Best Practices
            </h4>
            <ul className="text-slate-600 dark:text-gray-300 space-y-1">
              <li>• Use descriptive file names</li>
              <li>• Add detailed descriptions</li>
              <li>• Assign appropriate class categories</li>
              <li>• Maximum file size: 10MB</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}