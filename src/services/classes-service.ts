// src/services/classes-service.ts
import { prisma } from '@/lib/prisma';

export class ClassesService {
  static async getAllClasses() {
    return prisma.class.findMany();
  }

  static async createClass(name: string) {
    if (!name || name.trim() === '') {
      throw new Error("Name is required");
    }

    return prisma.class.create({
      data: { name: name.trim() },
    });
  }

  static async deleteClass(id: number) {
    return prisma.class.delete({ 
      where: { id } 
    });
  }
}