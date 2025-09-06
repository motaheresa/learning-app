// src/lib/api-utils.ts
import { NextResponse } from 'next/server';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const handleApiError = (error: unknown) => {
  console.error('API Error:', error);
  
  if (error instanceof ApiError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  
  if (error instanceof Error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
  
  return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
};

export const validateRequiredFields = (data: any, fields: string[]): string[] => {
  const missingFields: string[] = [];
  
  fields.forEach(field => {
    if (!data[field] || data[field].toString().trim() === '') {
      missingFields.push(field);
    }
  });
  
  return missingFields;
};

export const parseQueryParams = (searchParams: URLSearchParams, params: Record<string, string>) => {
  const result: Record<string, any> = {};
  
  Object.entries(params).forEach(([key, type]) => {
    const value = searchParams.get(key);
    if (value) {
      switch (type) {
        case 'number':
          result[key] = parseInt(value, 10);
          break;
        case 'boolean':
          result[key] = value === 'true';
          break;
        default:
          result[key] = value;
      }
    }
  });
  
  return result;
};