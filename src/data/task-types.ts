export type Energy = "easy" | "medium" | "hard";

export type TaskType = "root" | "stage" | "leaf";

export type Task = {
  id: string;
  type: TaskType;

  title: string;
  description: string;

  energy: Energy;
  duration: { min: number; max: number };

  tags: string[];

  parentId?: string;
  order?: number;

  prerequisites?: string[];
};

export type TaskPool = {
  version: number;
  updatedAt: string;
  tasks: Task[];
};
