// src/components/upload/UploadGuidelines.tsx
export const UploadGuidelines = () => {
  return (
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
  );
};