import { useEffect, useState } from "react";
import { tasksList } from "./tasks";
import { Category, TaskList } from "../../types/Tasks";
import "./trello.css";
import { TaskComp } from "./Task";

const Trello = () => {
  const [taskList, setTaskList] = useState<TaskList>();

  useEffect(() => {
    setTaskList(tasksList);
  }, []);

  // console.log("Task List: ", taskList);
  // <div className="task-container">

  const editHandler = () => {};

  const deleteHandler = () => {};

  return (
    <div className="task-container">
      {taskList &&
        Object.keys(taskList)?.length > 0 &&
        Object.keys(taskList).map((catKey) => (
          <TaskComp
            catKey={catKey as Category}
            taskList={taskList}
            editHandler={editHandler}
            deleteHandler={deleteHandler}
          />
        ))}
    </div>
  );
};

export default Trello;
