import { useEffect, useState } from "react";
import { tasksList } from "./tasks";
import { Category, Task, TaskList } from "../../types/Tasks";
import "./trello.css";
import { TaskComp } from "./Task";
// import { TaskComp } from "./TaskComp";

const Trello = () => {
  const [taskList, setTaskList] = useState<TaskList>();

  useEffect(() => {
    setTaskList(tasksList);
  }, []);

  const addHandler = (task: Task, catKey: Category) => {
    const taskListCopy = structuredClone(taskList) as TaskList;
    const catTasks = (taskListCopy as TaskList)[catKey];
    task.id = Number(catTasks[catTasks.length - 1].id) + 1;
    (taskListCopy as TaskList)[catKey]?.push(task);
    setTaskList(taskListCopy);
  };

  const editHandler = (task: Task, catKey: Category) => {
    if (task?.id) {
      const taskListCopy = structuredClone(taskList);
      (taskListCopy as TaskList)[catKey]?.map((currTask) => {
        if (currTask.id === task.id) {
          currTask.name = task.name;
        }
      });
      setTaskList(taskListCopy);
    }
  };

  const deleteHandler = (task: Task, catKey: Category) => {
    const c = confirm("Delete this task?");
    if (!c) return;
    if (task?.id) {
      const taskListCopy = structuredClone(taskList) as TaskList;
      taskListCopy[catKey] = taskListCopy[catKey].filter(
        (t) => t.id !== task.id
      );
      setTaskList(taskListCopy);
    }
  };

  return (
    <div className="task-container">
      {taskList &&
        Object.keys(taskList)?.length > 0 &&
        Object.keys(taskList).map((catKey) => (
          <TaskComp
            key={catKey}
            catKey={catKey as Category}
            taskList={taskList}
            setTaskList={setTaskList}
            addHandler={addHandler}
            editHandler={editHandler}
            deleteHandler={deleteHandler}
          />
        ))}
    </div>
  );
};

export default Trello;
