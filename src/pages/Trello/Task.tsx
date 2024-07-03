import { ChangeEvent, FC, useState } from "react";
import { categoryMap } from "./tasks";
import { Category, Task, TaskList } from "../../types/Tasks";

type ActionType = "edit" | "add";

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
    action: ActionType
  ) => {
    if (action === "edit") {
      const taskCopy = structuredClone(editableTask);
      (taskCopy as Task).name = e.target.value;
      console.log("taskCopy", taskCopy);
      setEditableTask(taskCopy);
    } else if (action === "add") {
      const newTaskCopy = structuredClone(newTask);
      newTaskCopy.name = e.target.value;
      setNewTask(newTaskCopy);
    }
  };

  const onSave = (op: ActionType) => {
    if (op === "edit") {
      editHandler(editableTask, catKey);
      setEditableTask({ id: 0, name: "" });
    } else if (op === "add") {
      addHandler(newTask, catKey);
      setNewTask({ id: 0, name: "", cat: "" });
    }
  };

  const onCancel = (op: ActionType) => {
    if (op === "edit") {
      setEditableTask({ id: 0, name: "" });
    }
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
  };

  const onDropHandler = (e) => {
    const sourceId = e.dataTransfer.getData("text/plain");
    const sourceEl = document.getElementById(sourceId);
    const sourceParent = sourceEl?.parentElement;
    let targetParent = null,
      targetHtml = null;
    if (e.target.nodeName === "SPAN") {
      targetParent = e.target?.parentElement?.parentElement;
      targetHtml = e.target.parentElement.innerHTML;
    } else {
      targetParent = e.target?.parentElement;
      targetHtml = e.target.innerHTML;
    }
    console.log("On drop handler", sourceId, e);
    console.log(
      "Compare source and target parent: ",
      sourceParent?.id,
      targetParent.id
    );
    if (sourceParent?.id === targetParent.id) {
      let tempEl = sourceEl?.innerHTML;
      sourceEl.innerHTML = targetHtml;
      targetHtml = tempEl;
    }
  };

  return (
    <div key={categoryMap[catKey]} className={`task-list ${catKey}`}>
      <div className="task-list__header">
        <h4>{categoryMap[catKey]}</h4>
        <button onClick={() => addTask()}>Add</button>
      </div>
      <div className="task-list__body">
        {taskList[catKey].map((task, index) => (
          <div
            key={`${categoryMap[catKey]}-${task.id}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDropHandler}
            id={catKey}
          >
            {/* New task */}
            {index === 0 && newTask.cat === catKey && (
              <p
                className="task"
                key={`${newTask.cat}-${task.id}`}
                id={`${newTask.cat}-${task.id}`}
              >
                <>
                  <input
                    value={newTask.name}
                    onChange={(e) => handleTaskName(e, "add")}
                  />
                </>
                <span>
                  <button onClick={() => onSave("add")}>Save</button>&nbsp;
                  <button onClick={() => onCancel("add")}>Cancel</button>
                </span>
              </p>
            )}
            {/* Previously saved task - edit, delete */}
            <p
              className="task"
              key={`${catKey}-${task.id}`}
              id={`${catKey}-${task.id}`}
              draggable={true}
              onDragStart={handleDragStart}
            >
              {editableTask?.id === task.id ? (
                <>
                  <input
                    value={editableTask.name}
                    onChange={(e) => handleTaskName(e, "edit")}
                  />
                </>
              ) : (
                <span>{task.name}</span>
              )}
              {editableTask.id ? (
                <span>
                  <button onClick={() => onSave("edit")}>Save</button>&nbsp;
                  <button onClick={() => onCancel("edit")}>Cancel</button>
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
          </div>
        ))}
      </div>
    </div>
  );
};
