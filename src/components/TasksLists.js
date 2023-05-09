import React from "react";
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";

function TasksLists() {
  const taskState = useSelector((state) => state.tasks);

  return (
    <>
      <div className="w-4/6">
        <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
          {taskState.map((task) => {
            return (
              <>
                <div
                  key={task.id}
                  className="bg-neutral-800 p-4 rounded-md text-white"
                >
                  <header className="flex justify-between flex-col">
                    <div className="flex justify-between">
                      <h3>{task.title}</h3>
                      <div className="flex gap-x-2">
                        <button
                          className="bg-zinc-500 px-2 py-1 text-xs rounded-md"
                          to={`/edit-task/${task.id}`}
                        >
                          Edit
                        </button>
                        <button className="bg-red-500 px-2 py-1 text-xs rounded-md">
                          Delete
                        </button>
                      </div>
                    </div>
                    <h3 className="card-title">Categoria: {task.category}</h3>
                    <h3 className="card-title">Estado: {task.state}</h3>
                  </header>
                  <p>{task.description}</p>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default TasksLists;
