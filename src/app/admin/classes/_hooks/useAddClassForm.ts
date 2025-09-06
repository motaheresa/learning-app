// src/app/classes/hooks/useAddClassForm.ts
import { useState } from 'react';
import { ClassesService } from '../services/classes-service';
import { UseAddClassFormProps } from '../types/class';

export const useAddClassForm = ({ onAdded }: UseAddClassFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setError(null);
    
    try {
      await ClassesService.createClass(name.trim(), description.trim() || undefined);
      setName("");
      setDescription("");
      onAdded();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create class. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    name,
    setName,
    description,
    setDescription,
    loading,
    error,
    handleSubmit,
    clearError
  };
};