// src/app/classes/hooks/useClasses.ts
import { useState, useCallback } from 'react';
import { ClassesService } from '../services/classes-service';
import { ClassRecord } from '../types/class';

export const useClasses = () => {
  const [classes, setClasses] = useState<ClassRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ClassesService.getAllClasses();
      setClasses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load classes');
      console.error('Error loading classes:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { classes, loading, error, reload };
};