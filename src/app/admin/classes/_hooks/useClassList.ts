// src/app/classes/hooks/useClassList.ts
import { useState } from 'react';
import { ClassesService } from '../services/classes-service';
import { ClassRecord } from '../types/class';

interface UseClassListProps {
  onClassUpdate?: () => void;
  onError?: (error: string) => void;
}

export const useClassList = ({ onClassUpdate, onError }: UseClassListProps) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [isLoading, setIsLoading] = useState<number | null>(null);

  const handleEdit = (cls: ClassRecord) => {
    setEditingId(cls.id);
    setEditName(cls.name);
  };

  const handleSaveEdit = async (id: number) => {
    if (!editName.trim()) return;
    
    setIsLoading(id);
    try {
      await ClassesService.updateClass(id, editName.trim());
      setEditingId(null);
      setEditName("");
      onClassUpdate?.();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update class';
      onError?.(errorMessage);
      console.error('Error updating class:', error);
    } finally {
      setIsLoading(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this class? This action cannot be undone.')) {
      return;
    }

    setIsLoading(id);
    try {
      const result = await ClassesService.deleteClass(id);
      onClassUpdate?.();
      // Show success message if needed
      console.log(result.message);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete class';
      
      // Handle specific error cases
      if (errorMessage.includes('files') || errorMessage.includes('students')) {
        onError?.(errorMessage + ' Please remove all associated content first.');
      } else {
        onError?.(errorMessage);
      }
      
      console.error('Error deleting class:', error);
    } finally {
      setIsLoading(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, id: number) => {
    if (e.key === 'Enter') {
      handleSaveEdit(id);
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return {
    editingId,
    editName,
    setEditName,
    isLoading,
    handleEdit,
    handleSaveEdit,
    handleCancelEdit,
    handleDelete,
    handleKeyPress
  };
};