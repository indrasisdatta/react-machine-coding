export type Category = "to_do" | "in_progress" | "completed";

export type Task = {
  id: number;
  name: string;
};

export type TaskList = Record<Category, Task[]>;
