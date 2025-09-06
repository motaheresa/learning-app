// src/utils/fileProcessor.ts
import { validateFile } from './validation';

export interface FileProcessingResult {
  file: File | null;
  errors: string[];
}

export class FileProcessor {
  static handleFileSelect(file: File): FileProcessingResult {
    const validation = validateFile(file);
    
    return {
      file: validation.isValid ? file : null,
      errors: validation.errors
    };
  }

  static handleDragDrop(e: React.DragEvent): FileProcessingResult {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      return this.handleFileSelect(e.dataTransfer.files[0]);
    }

    return { file: null, errors: [] };
  }

  static createFormData(
    file: File, 
    classId: string, 
    priority: string, 
    description: string, 
    tags: string
  ): FormData {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("classId", classId);
    formData.append("priority", priority);
    formData.append("description", description);
    formData.append("tags", tags);

    return formData;
  }
}