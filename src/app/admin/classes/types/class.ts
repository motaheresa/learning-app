// src/app/classes/types/class.ts
export interface ClassRecord {
  id: number;
  name: string;
  fileCount: number;
  studentCount: number;
}

export interface ClassStats {
  totalStudents: number;
  totalFiles: number;
  averageFilesPerClass: number;
  classesCount: number;
}

export interface UseAddClassFormProps {
  onAdded: () => void;
}

export interface ClassListProps {
  classes: ClassRecord[];
  onClassUpdate?: () => void;
  loading?: boolean;
  onError?: (error: string) => void;
}

export interface StatsCardsProps {
  classesCount: number;
  totalStudents?: number;
  totalFiles?: number;
  averageFilesPerClass?: number;
}