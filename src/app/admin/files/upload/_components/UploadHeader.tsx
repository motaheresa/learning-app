// src/components/upload/UploadHeader.tsx
interface UploadHeaderProps {
  title: string;
  description: string;
}

export const UploadHeader = ({ title, description }: UploadHeaderProps) => {
  return (
    <div className="text-center sm:text-left">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-gray-100 mb-2 transition-colors">
        {title}
      </h1>
      <p className="text-slate-600 dark:text-gray-300 transition-colors">
        {description}
      </p>
    </div>
  );
};