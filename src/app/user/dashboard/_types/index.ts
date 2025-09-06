// types/index.ts
export interface File {
  id: string;
  name: string;
  path: string;
  class?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserSession {
  id: string;
  email: string;
  role: string;
  name?: string;
}