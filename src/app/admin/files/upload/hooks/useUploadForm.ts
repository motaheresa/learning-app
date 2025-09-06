// src/hooks/useUploadForm.ts
import { useState, useCallback } from 'react';
import { FileProcessor } from '../utils/fileProcessor';
import { validateFormData } from '../utils/validation';
import { ApiService } from '../services/api';


export const useUploadForm = () => {
  const [classes, setClasses] = useState<ApiService[]>([]);
  const [classesLoading, setClassesLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    classId: '',
    priority: 'normal',
    description: '',
    tags: '',
  });

  const loadClasses = useCallback(async () => {
    try {
      setClassesLoading(true);
      const data = await ApiService.fetchClasses();
      setClasses(data);
    } catch (error) {
      console.error('Failed to load classes:', error);
      setErrorMessage('Failed to load classes. Please refresh the page.');
    } finally {
      setClassesLoading(false);
    }
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    setDragActive(false);
    setErrorMessage('');
    
    const result = FileProcessor.handleDragDrop(e);
    setSelectedFile(result.file);
    
    if (result.errors.length > 0) {
      setErrorMessage(result.errors[0]);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    
    if (e.target.files && e.target.files[0]) {
      const result = FileProcessor.handleFileSelect(e.target.files[0]);
      setSelectedFile(result.file);
      
      if (result.errors.length > 0) {
        setErrorMessage(result.errors[0]);
      }
      
      e.target.value = '';
    }
  }, []);

  const removeFile = useCallback(() => {
    setSelectedFile(null);
    setErrorMessage('');
  }, []);

  const handleUpload = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setErrorMessage("Please select a file to upload");
      return;
    }

    // Validate form data
    const formValidation = validateFormData(formData);
    if (!formValidation.isValid) {
      setErrorMessage(formValidation.errors[0]);
      return;
    }

    setLoading(true);
    setUploadStatus('uploading');
    setErrorMessage('');

    try {
      const uploadFormData = FileProcessor.createFormData(
        selectedFile,
        formData.classId,
        formData.priority,
        formData.description,
        formData.tags
      );

      await ApiService.uploadFile(uploadFormData);
      
      setUploadStatus('success');
      setSelectedFile(null);
      setFormData({
        classId: '',
        priority: 'normal',
        description: '',
        tags: '',
      });
      
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [selectedFile, formData]);

  return {
    classes,
    classesLoading,
    loading,
    uploadStatus,
    errorMessage,
    dragActive,
    selectedFile,
    formData,
    loadClasses,
    handleInputChange,
    handleDrag,
    handleDrop,
    handleFileSelect,
    removeFile,
    handleUpload
  };
};