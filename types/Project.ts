// Project.ts
export interface Project {
  id: number;
  createdAt: string;
  updatedAt: string;
  owner: string;
  name: string;
  description: string;
  members: string[];
}
