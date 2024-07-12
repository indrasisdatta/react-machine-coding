import { TaskList } from "../../types/Tasks";

export const tasksList: TaskList = {
  to_do: [
    { id: 1, name: "Task 1" },
    { id: 2, name: "Task 2" },
    { id: 3, name: "Task 3" },
  ],
  in_progress: [
    { id: 4, name: "Task 4" },
    { id: 5, name: "Task 5" },
  ],
  completed: [{ id: 6, name: "Task 6" }],
};

export const categoryMap = {
  to_do: "To Do",
  in_progress: "In Progress",
  completed: "Completed",
};
