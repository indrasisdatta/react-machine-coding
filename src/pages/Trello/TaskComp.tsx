import { ChangeEvent, DragEvent, FC, useState } from "react";
import { categoryMap } from "./tasks";
import { Category, Task, TaskList } from "../../types/Tasks";

type ActionType = "edit" | "add";

export const TaskComp: FC<{
  catKey: Category;
  taskList: TaskList;
  setTaskList: void;
  addHandler: (task: Task, catKey: Category) => void;
  editHandler: (task: Task, catKey: Category) => void;
  deleteHandler: (task: Task, catKey: Category) => void;
}> = ({
  catKey,
  taskList,
  setTaskList,
  addHandler,
  editHandler,
  deleteHandler,
}) => {
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

  // const [draggedTask, setDraggedTask] = useState({
  //   task: null,
  //   category: null,
  // });

  const addTask = () => {
    setNewTask({
      id: 0,
      name: "",
      cat: catKey,
    });
  };

  const getTask = (sourceCat, sourceId) => {
    // return taskList[sourceCat].find((t) => t.id === Number(sourceId));
    let sourceIndex, sourceTask;
    taskList[sourceCat].forEach((t, index) => {
      if (t.id === Number(sourceId)) {
        sourceIndex = Number(index);
        sourceTask = t;
        return;
      }
    });
    return { sourceIndex, sourceTask };
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
    // catKey: Category, task: Task
    e.dataTransfer?.setData("text/plain", e.target?.id);
    console.log("Drag start: ", e.target?.id);
    // setDraggedTask({ task, category: catKey });
  };

  /**
   * TODO:
   * !Different category logic
   * !Same cat logic - optimize loop code
   * @param e
   * @param targetCat
   */
  const onDropHandler = async (
    e: DragEvent<HTMLDivElement>,
    targetCat: Category
  ) => {
    let targetEl = e.target;
    if ((e.target as HTMLInputElement).nodeName === "SPAN") {
      targetEl = (e.target as HTMLInputElement).parentElement;
    }
    console.log("Check target: ", e.target, targetEl);
    console.log("Target index attr: ", targetEl?.getAttribute("data-index"));
    const targetIndex = Number(targetEl?.getAttribute("data-index"));
    console.log("Target index: ", targetIndex);
    const [sourceCat, sourceId] = e.dataTransfer
      .getData("text/plain")
      .split("-");
    const { sourceIndex, sourceTask } = getTask(sourceCat, sourceId);
    console.log("Drop handler debug: ", {
      targetCat,
      targetIndex,
      sourceCat,
      sourceIndex,
      sourceTask,
    });

    /**
     * Case 1: Same category
     */
    if (sourceCat === targetCat) {
      /**
       * Initial: 3  4  5  6  7  8 9 10 11 12
       *                   (4) -> dragged here (s=1, t=3)
       *  Result:  3  5  6  4  7 8 9 10 11 12
       */
      const taskCopy = structuredClone(taskList[sourceCat]);
      let start = Number(sourceIndex),
        end = targetIndex;
      if (Number(sourceIndex) < targetIndex) {
        for (let i = start; i <= end; i++) {
          taskCopy[i] = taskCopy[i + 1];
        }
      } else {
        /**
         * Initial: 3  4  5  6  7  8 9 10 11 12
         *                 (10) -> dragged here (s=7, t=3)
         *  3 4 5 |  6 7 8 9 10 | 11 12
         *        | 10 6 7 8 9  |
         *  Result:  3  4  5  10 6  7 8 9 11 12
         */
        start = targetIndex;
        end = Number(sourceIndex);
        const slicedTask = taskCopy.slice(start, end);
        console.log("Sliced task", slicedTask);
        for (let i = start + 1; i <= end; i++) {
          if (typeof i === "undefined" || typeof (i - 1) === "undefined") {
            continue;
          }
          console.log("loop check", taskCopy[i], slicedTask[i - 1]);
          taskCopy[i] = slicedTask[i - 1];
        }
        taskCopy[targetIndex] = taskCopy[sourceIndex];
      }

      taskCopy[targetIndex] = sourceTask;
      console.log("Sorted task: ", taskCopy);
      setTaskList((prev) => ({ ...prev, [sourceCat]: taskCopy }));
    }

    /**
     * Case 2: Different category
     *  Initial:
     *    In prog: 1  2  7  8
     *    To do:   3  4  5  6
     *               (2) dragged here
     *  Result:
     *    In prog: 1  7  8 (remove 2, reset indexes)
     *    To do:   3  4  2  5  6 (2 inserted after 4)
     */
  };

  // console.log("Check draggedTask state >> ", draggedTask);

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
        onDrop={(e) => onDropHandler(e, catKey)}
      >
        {taskList[catKey].map((task, index) => (
          <div key={`${categoryMap[catKey]}-${task.id}`}>
            {/* New task */}
            {index === 0 && newTask.cat === catKey && (
              <p
                className="task"
                key={`${newTask.cat}-${task.id}`}
                id={`${newTask.cat}-${task.id}-${index}`}
                data-index={index}
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
              id={`${catKey}-${task.id}-${index}`}
              data-index={index}
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
