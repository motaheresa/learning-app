// src/app/admin/questions/components/AnswerImageForm.tsx
"use client";
import { useState } from "react";
import { X, Upload, Image } from "lucide-react";

interface AnswerImageFormProps {
  fileId: number;
  onClose: () => void;
  onSaved: () => void;
}

export default function AnswerImageForm({ fileId, onClose, onSaved }: AnswerImageFormProps) {
  const [formData, setFormData] = useState({
    pageNumber: 1,
    description: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("image", selectedFile);
      formDataToSend.append("fileId", fileId.toString());
      formDataToSend.append("pageNumber", formData.pageNumber.toString());
      formDataToSend.append("description", formData.description);

      const response = await fetch("/api/admin/answer-images", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        onSaved();
      } else {
        console.error("Failed to upload answer image");
      }
    } catch (error) {
      console.error("Error uploading answer image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-gray-100">
            Add Answer Image
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Page Number */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
              Page Number
            </label>
            <input
              type="number"
              min="1"
              value={formData.pageNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, pageNumber: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-slate-900 dark:text-gray-100"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
              Answer Image
            </label>
            <div className="border-2 border-dashed border-slate-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-slate-400 dark:hover:border-gray-500 transition-colors">
              {preview ? (
                <div className="space-y-4">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-w-full h-48 object-contain mx-auto rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      setPreview(null);
                    }}
                    className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <div>
                  <Image className="w-12 h-12 text-slate-400 dark:text-gray-500 mx-auto mb-4" />
                  <p className="text-slate-600 dark:text-gray-400 mb-2">
                    Click to upload an answer image
                  </p>
                  <p className="text-sm text-slate-500 dark:text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              placeholder="Brief description of the answer image..."
              className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-slate-900 dark:text-gray-100"
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t border-slate-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !selectedFile}
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Upload Image
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}