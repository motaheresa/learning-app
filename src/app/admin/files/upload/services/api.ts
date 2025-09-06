// src/services/api.ts
export interface ClassRecord {
  id: number;
  name: string;
}

export interface UploadResponse {
  success: boolean;
  message?: string;
  fileId?: number;
}

export class ApiService {
  static async fetchClasses(): Promise<ClassRecord[]> {
    const response = await fetch("/api/admin/classes");
    
    if (!response.ok) {
      throw new Error(`Failed to fetch classes: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  }

  static async uploadFile(formData: FormData): Promise<UploadResponse> {
    const response = await fetch("/api/admin/files", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "Upload failed");
    }

    return data;
  }
}