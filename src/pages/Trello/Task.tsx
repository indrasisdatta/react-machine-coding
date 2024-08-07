import { ChangeEvent, DragEvent, FC, SyntheticEvent, useState } from "react";
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

  const handleDragStart = (e: DragEvent) => {
    e.dataTransfer?.setData("text/plain", e.target?.id);
  };

  const onDropHandler = (e: DragEvent<HTMLDivElement>) => {
    const sourceId = e?.dataTransfer.getData("text/plain");
    const sourceEl = document.getElementById(sourceId);
    const sourceParent = sourceEl?.parentElement;
    const sourceCat = sourceEl?.closest(".task-list__body")?.id;
    let targetParent = null,
      targetEl = null,
      targetHtml = null,
      targetCat = null;

    if ((e.target as HTMLInputElement).nodeName === "SPAN") {
      targetParent = (e.target as HTMLInputElement).parentElement
        ?.parentElement;
      targetEl = (e.target as HTMLInputElement).parentElement;
    } else {
      targetParent = (e.target as HTMLInputElement)?.parentElement;
      targetEl = e.target as HTMLInputElement;
    }
    targetCat = targetEl?.closest(".task-list__body")?.id;
    targetHtml = targetEl?.innerHTML;
    // console.log("On drop handler", sourceId, e);
    // console.log("Compare source and target cat: ", sourceCat, targetCat);
    // console.log("Source/Target HTML", sourceEl?.innerHTML, targetHtml);
    /* Ordering within same category */
    if (sourceCat === targetCat) {
      let tempEl = sourceEl?.innerHTML;
      if (e.target && (e.target as HTMLInputElement)?.nodeName === "SPAN") {
        sourceEl.innerHTML = (e.target as HTMLInputElement).parentElement
          ?.innerHTML as string;
        e.target.parentElement.innerHTML = tempEl;
        tempEl = null;
      } else {
        sourceEl.innerHTML = e.target.innerHTML;
        (e.target as HTMLInputElement).innerHTML = tempEl;
        tempEl = null;
      }
    } else {
      /* Ordering within different category */
      // targetParent.insertBefore(sourceEl, targetEl.nextsibling);
      targetParent?.appendChild(sourceEl);
    }
  };

  return (
    <div key={categoryMap[catKey]} className={`task-list ${catKey}`}>
      <div className="task-list__header">
        <h4>{categoryMap[catKey]}</h4>
        <button onClick={() => addTask()}>Add</button>
      </div>
      <div
        className="task-list__body"
        id={catKey}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDropHandler}
      >
        {taskList[catKey].map((task, index) => (
          <div key={`${categoryMap[catKey]}-${task.id}`}>
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
