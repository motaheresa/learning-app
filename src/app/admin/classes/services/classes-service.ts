// src/app/classes/services/classes-service.ts
import { ClassRecord } from '../types/class';
import { ApiError } from '@/lib/api-utils';

export class ClassesService {
  static async getAllClasses(): Promise<ClassRecord[]> {
    const response = await fetch("/api/admin/classes", {
      cache: 'no-store' // Prevent caching for fresh data
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new ApiError(response.status, errorData.error || `Failed to fetch classes: ${response.status}`);
    }
    
    return response.json();
  }

  static async createClass(name: string): Promise<ClassRecord> {
    const response = await fetch("/api/admin/classes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new ApiError(response.status, errorData.error || "Failed to create class");
    }

    return response.json();
  }

  static async updateClass(id: number, name: string): Promise<ClassRecord> {
    const response = await fetch(`/api/admin/classes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new ApiError(response.status, errorData.error || "Failed to update class");
    }

    return response.json();
  }

  static async deleteClass(id: number): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`/api/admin/classes/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new ApiError(response.status, errorData.error || "Failed to delete class");
    }

    return response.json();
  }
}