import { ChangeEvent, FC, useState } from "react";
import { categoryMap } from "./tasks";
import { Category, Task, TaskList } from "../../types/Tasks";

export const TaskComp: FC<{
  catKey: Category;
  taskList: TaskList;
  editHandler: (task: Task) => void;
  deleteHandler: (task: Task) => void;
}> = ({ catKey, taskList, editHandler, deleteHandler }) => {
  //   console.log("Debug cat key", catKey, taskList[catKey]);

  const [editableTask, setEditableTask] = useState<Task>({
    id: 0,
    name: "",
  });

  const openEditor = (task: Task) => {
    setEditableTask(task);
  };

  const handleTaskName = (e: ChangeEvent<HTMLInputElement>) => {
    const taskCopy = structuredClone(editableTask);
    (taskCopy as Task).name = e.target.value;
    setEditableTask(taskCopy);
  };

  const onSave = () => {
    editHandler(editableTask);
  };

  return (
    <div key={categoryMap[catKey]} className={`task-list ${catKey}`}>
      <div className="task-list__header">
        <h4>{categoryMap[catKey]}</h4>
        <button>Add</button>
      </div>
      <div className="task-list__body">
        {taskList[catKey].map((task) => (
          <p className="task" key={`${categoryMap[catKey]}-${task.id}`}>
            {editableTask?.id === task.id ? (
              <>
                <input value={task.name} onChange={handleTaskName} />
                <button onClick={onSave}>Save</button>
              </>
            ) : (
              <span>{task.name}</span>
            )}
            <span>
              <button onClick={() => openEditor(task)}>Edit</button>&nbsp;
              <button onClick={() => deleteHandler(task)}>Delete</button>
            </span>
          </p>
        ))}
      </div>
    </div>
  );
};
