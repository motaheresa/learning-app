// src/utils/validation.ts
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

export const ACCEPTED_FILE_TYPES = {
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'application/vnd.ms-powerpoint': ['.ppt'],
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
  'application/vnd.ms-excel': ['.xls'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
  'text/plain': ['.txt'],
};

export const MAX_DESCRIPTION_LENGTH = 1000;
export const MAX_TAGS_LENGTH = 200;
export const MAX_FILENAME_LENGTH = 255;
export const ALLOWED_TAG_CHARACTERS = /^[a-zA-Z0-9\s,.-]+$/;
export const ALLOWED_FILENAME_CHARACTERS = /^[a-zA-Z0-9\s_\-().]+$/;

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface FileValidationResult extends ValidationResult {
  fileType?: string;
  fileSize?: number;
}

export const validateFile = (file: File): FileValidationResult => {
  const errors: string[] = [];

  // Validate file type
  if (!Object.keys(ACCEPTED_FILE_TYPES).includes(file.type)) {
    const acceptedExtensions = Object.values(ACCEPTED_FILE_TYPES)
      .flat()
      .join(', ');
    errors.push(`File type not supported. Accepted formats: ${acceptedExtensions}`);
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    errors.push(`File size exceeds the maximum limit of ${formatFileSize(MAX_FILE_SIZE)}. Your file is ${formatFileSize(file.size)}.`);
  }

  // Validate file name
  if (file.name.length > MAX_FILENAME_LENGTH) {
    errors.push(`File name cannot exceed ${MAX_FILENAME_LENGTH} characters`);
  }

  if (!ALLOWED_FILENAME_CHARACTERS.test(file.name)) {
    errors.push('File name contains invalid characters. Only letters, numbers, spaces, underscores, hyphens, and parentheses are allowed.');
  }

  return {
    isValid: errors.length === 0,
    errors,
    fileType: file.type,
    fileSize: file.size
  };
};

export const validateFormData = (formData: any): ValidationResult => {
  const errors: string[] = [];

  // Validate classId
  if (!formData.classId || formData.classId.toString().trim() === "") {
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

  // Validate priority
  if (formData.priority && !['normal', 'high', 'urgent'].includes(formData.priority)) {
    errors.push("Invalid priority level");
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

export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

export const isFileTypeAccepted = (fileType: string): boolean => {
  return Object.keys(ACCEPTED_FILE_TYPES).includes(fileType);
};

export const getAcceptedExtensions = (): string[] => {
  return Object.values(ACCEPTED_FILE_TYPES).flat();
};

export const getAcceptedExtensionsString = (): string => {
  return getAcceptedExtensions().join(', ');
};

export const validateFileName = (filename: string): ValidationResult => {
  const errors: string[] = [];

  if (filename.length > MAX_FILENAME_LENGTH) {
    errors.push(`File name cannot exceed ${MAX_FILENAME_LENGTH} characters`);
  }

  if (!ALLOWED_FILENAME_CHARACTERS.test(filename)) {
    errors.push('File name contains invalid characters');
  }

  if (filename.trim() === '') {
    errors.push('File name cannot be empty');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const sanitizeFileName = (filename: string): string => {
  // Remove invalid characters and trim
  return filename
    .replace(/[^a-zA-Z0-9\s_\-().]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

export const validateFileUpload = (file: File, formData: any): ValidationResult => {
  const fileValidation = validateFile(file);
  const formValidation = validateFormData(formData);

  const allErrors = [...fileValidation.errors, ...formValidation.errors];

  return {
    isValid: allErrors.length === 0,
    errors: allErrors
  };
};

// Helper function to check if a file is an image
export const isImageFile = (fileType: string): boolean => {
  return fileType.startsWith('image/');
};

// Helper function to check if a file is a document
export const isDocumentFile = (fileType: string): boolean => {
  return fileType.startsWith('application/') || fileType === 'text/plain';
};

// Get file type category
export const getFileCategory = (fileType: string): string => {
  if (isImageFile(fileType)) return 'image';
  if (isDocumentFile(fileType)) return 'document';
  if (fileType.startsWith('video/')) return 'video';
  if (fileType.startsWith('audio/')) return 'audio';
  return 'other';
};

// Generate a safe file name with timestamp
export const generateSafeFileName = (originalName: string): string => {
  const extension = getFileExtension(originalName);
  const baseName = originalName.replace(`.${extension}`, '');
  const sanitizedBaseName = sanitizeFileName(baseName);
  const timestamp = Date.now();
  
  return `${sanitizedBaseName}-${timestamp}.${extension}`;
};

// Validate multiple files
export const validateMultipleFiles = (files: File[]): ValidationResult => {
  const errors: string[] = [];
  let totalSize = 0;

  files.forEach((file, index) => {
    const fileValidation = validateFile(file);
    if (!fileValidation.isValid) {
      errors.push(`File ${index + 1} (${file.name}): ${fileValidation.errors.join(', ')}`);
    }
    totalSize += file.size;
  });

  // Check total size if needed (e.g., for batch uploads)
  if (totalSize > MAX_FILE_SIZE * 5) { // 5x individual limit for batches
    errors.push(`Total upload size exceeds ${formatFileSize(MAX_FILE_SIZE * 5)}`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Rate limiting helper (for client-side validation)
export const createRateLimiter = (limit: number, interval: number) => {
  let attempts = 0;
  let lastAttemptTime = 0;

  return () => {
    const now = Date.now();
    
    if (now - lastAttemptTime > interval) {
      attempts = 0;
      lastAttemptTime = now;
    }

    attempts++;
    
    return attempts <= limit;
  };
};