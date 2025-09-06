// src/utils/validation.ts
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const ACCEPTED_FILE_TYPES = {
  "application/pdf": [".pdf"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
  "application/vnd.ms-powerpoint": [".ppt"],
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
};

export const MAX_DESCRIPTION_LENGTH = 1000;
export const MAX_TAGS_LENGTH = 200;
export const ALLOWED_TAG_CHARACTERS = /^[a-zA-Z0-9\s,.-]+$/;

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateFile = (file: File): ValidationResult => {
  const errors: string[] = [];

  // Validate file type
  if (!Object.keys(ACCEPTED_FILE_TYPES).includes(file.type)) {
    errors.push("Please upload a valid file type (PDF, DOC, DOCX, PPT, PPTX)");
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    errors.push(`File size exceeds the maximum limit of 10MB. Your file is ${formatFileSize(file.size)}.`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateFormData = (formData: any): ValidationResult => {
  const errors: string[] = [];

  // Validate classId
  if (!formData.classId || formData.classId.trim() === "") {
    errors.push("Class selection is required");
  }

  // Validate description length
  if (formData.description && formData.description.length > MAX_DESCRIPTION_LENGTH) {
    errors.push(`Description cannot exceed ${MAX_DESCRIPTION_LENGTH} characters`);
  }

  // Validate tags format
  if (formData.tags && !ALLOWED_TAG_CHARACTERS.test(formData.tags)) {
    errors.push("Tags can only contain letters, numbers, spaces, commas, dots, and hyphens");
  }

  // Validate tags length
  if (formData.tags && formData.tags.length > MAX_TAGS_LENGTH) {
    errors.push(`Tags cannot exceed ${MAX_TAGS_LENGTH} characters`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};