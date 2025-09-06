// src/app/classes/hooks/useClassStats.ts
import { useState, useEffect } from 'react';
import { ClassesService } from '../services/classes-service';
import { ClassStats } from '../types/class';

export const useClassStats = () => {
  const [stats, setStats] = useState<ClassStats>({
    totalStudents: 0,
    totalFiles: 0,
    averageFilesPerClass: 0,
    classesCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const classes = await ClassesService.getAllClasses();
        
        const classesCount = classes.length;
        const totalFiles = classes.reduce((sum, cls) => sum + cls.fileCount, 0);
        const totalStudents = classes.reduce((sum, cls) => sum + cls.studentCount, 0);
        const averageFilesPerClass = classesCount > 0 ? Math.round(totalFiles / classesCount) : 0;

        setStats({
          totalStudents,
          totalFiles,
          averageFilesPerClass,
          classesCount
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load statistics');
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};