import { ChangeEvent, FC, useState } from "react";
import { categoryMap } from "./tasks";
import { Category, Task, TaskList } from "../../types/Tasks";

export const TaskComp: FC<{
  catKey: Category;
  taskList: TaskList;
  addHandler: (task: Task, catKey: Category) => void;
  editHandler: (task: Task, catKey: Category) => void;
  deleteHandler: (task: Task, catKey: Category) => void;
}> = ({ catKey, taskList, addHandler, editHandler, deleteHandler }) => {
  //   console.log("Debug cat key", catKey, taskList[catKey]);

  const [editableTask, setEditableTask] = useState<Task>({
    id: 0,
    name: "",
  });

  const [newTask, setNewTask] = useState({
    id: 0,
    name: "",
    cat: "",
  });

  const addTask = () => {
    setNewTask({
      id: 0,
      name: "",
      cat: catKey,
    });
  };

  const openEditor = (task: Task) => {
    setEditableTask(task);
  };

  const handleTaskName = (
    e: ChangeEvent<HTMLInputElement>,
    action: "edit" | "add"
  ) => {
    if (action === "edit") {
      const taskCopy = structuredClone(editableTask);
      (taskCopy as Task).name = e.target.value;
      console.log("taskCopy", taskCopy);
      setEditableTask(taskCopy);
    } else if (action === "add") {
      const newTaskCopy = structuredClone(newTask);
      newTaskCopy.name = e.target.name;
      setNewTask(newTaskCopy);
    }
  };

  const onSave = () => {
    editHandler(editableTask, catKey);
    setEditableTask({ id: 0, name: "" });
  };

  const onCancel = () => {
    setEditableTask({ id: 0, name: "" });
  };

  return (
    <div key={categoryMap[catKey]} className={`task-list ${catKey}`}>
      <div className="task-list__header">
        <h4>{categoryMap[catKey]}</h4>
        <button onClick={() => addTask()}>Add</button>
      </div>
      <div className="task-list__body">
        {taskList[catKey].map((task, index) => (
          <>
            {/* New task */}
            {index === 0 && newTask.cat === catKey && (
              <p className="task" key={`${newTask.cat}-${task.id}`}>
                <>
                  <input
                    value={newTask.name}
                    onChange={() => handleTaskName(e, "add")}
                  />
                </>
                <span>
                  <button onClick={onSave}>Save</button>&nbsp;
                  <button onClick={onCancel}>Cancel</button>
                </span>
              </p>
            )}
            {/* // Previously saved task - edit, delete */}
            <p className="task" key={`${categoryMap[catKey]}-${task.id}`}>
              {editableTask?.id === task.id ? (
                <>
                  <input
                    value={editableTask.name}
                    onChange={() => handleTaskName(e, "edit")}
                  />
                </>
              ) : (
                <span>{task.name}</span>
              )}
              {editableTask.id ? (
                <span>
                  <button onClick={onSave}>Save</button>&nbsp;
                  <button onClick={onCancel}>Cancel</button>
                </span>
              ) : (
                <span>
                  <button onClick={() => openEditor(task)}>Edit</button>
                  &nbsp;
                  <button onClick={() => deleteHandler(task, catKey)}>
                    Delete
                  </button>
                </span>
              )}
            </p>
          </>
        ))}
      </div>
    </div>
  );
};
