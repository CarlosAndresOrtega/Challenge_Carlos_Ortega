import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function TasksLists() {
  const taskState = useSelector((state) => state.tasks);

  return (
    <>
      {taskState.map((task) => {
        return (
          <>
            <div key={task.id} className="bg-neutral-800 p-4 rounded-md">
              <header className="flex justify-between">
                <h3>{task.title}</h3>
                <div className="flex gap-x-2">
                </div>
              </header>
              <p>{task.description}</p>
            </div>
          </>
        );
      })}
    </>
  );
}

export default TasksLists;
