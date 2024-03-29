export interface Project {
  id: number;
  projectOwner: string;
  prjectName: string;
  description: string;
  users: User[];
}

export interface User {
  id: number;
  userClerkId?: string | null;
  name: string;
  createdAt: string;
  updatedAt: string;
  projectId: number;
  role: string;
}
