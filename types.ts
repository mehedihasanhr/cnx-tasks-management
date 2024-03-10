type Subtract<T extends K, K> = Omit<T, keyof K>;
type SelectedFields<T, K extends keyof T> = Pick<T, K>;

export interface Member {
  id: number;
  userId: number;
  name: string;
  avatar?: string;
  avatarFallback?: string;
}

export type TaskStatus = {
  id: number;
  title: string;
  slug: string;
  textColor: string;
  bgColor: string;
};

export interface Project {
  id: number;
  title: string;
  creatorId: number;
  dueDate: Date;
  status?: TaskStatus;
  statusId: string | number;
  tasks?: Task[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: Member;
  managerId: number;
  manager: Member;
  collaborators?: Member[];
}

export interface Task {
  id: number;
  title: string;
  taskCreatorId: number;
  assigneeId?: number;
  description?: string;
  dueDate?: Date;
  projectId?: number;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
  members: Member[];
  assignee?: Member;
  taskCreator: Member;
  project: SelectedFields<Project, "id" | "title">;
}
