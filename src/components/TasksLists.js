import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import { updateState } from "../features/tasks/taskSlice";
import Search from "./Search";
import Header from "./Header";

function TasksLists() {
  const taskState = useSelector((state) => state.tasks);
  const [fileredTasks, setfileredTasks] = useState(taskState);

  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");

  const dispatch = useDispatch();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDelete = (id) => {
    openModal();
    setId(id);
  };

  useEffect(() => {
    setfileredTasks(taskState);
  }, [taskState]);

  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      dispatch(updateState({ id: event.target.id, state: "finalizada" }));
    } else {
      dispatch(updateState({ id: event.target.id, state: "pendiente" }));
    }
  };


  return (
    <>
      <Modal id={id} isOpen={isOpen} onClose={closeModal} />

      <div className="w-4/6 flex flex-col gap-5">
        <Header />
        <Search setfiltered={setfileredTasks} />

        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1 max-xl:grid-cols-2">
          {fileredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-neutral-800 p-4 rounded-md text-white "
            >
              <div className="max-w-md mx-auto">
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <input
                      className="hidden"
                      type="checkbox"
                      id={task.id}
                      checked={task.state === "finalizada"}
                      onChange={handleCheckboxChange}
                    />
                    <label
                      className="flex flex-col h-full  rounded cursor-pointer"
                      htmlFor={task.id}
                    >
                      <span className="flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-300 rounded-full">
                        <svg
                          className="w-4 h-4 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </label>
                    <div className="flex gap-x-2 ">
                      <button
                        className="bg-zinc-500 font-medium px-2 py-1 tracking-wide text-center capitalize transition-colors duration-300 transform rounded-[14px] hover:bg-[#F2ECE7] hover:text-[#000000dd] focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80"
                        to={`/edit-task/${task.id}`}
                      >
                        <Link to={`/edit-task/${task.id}`}>Edit</Link> 
                      </button>
                      <button
                        className="bg-red-500 font-medium px-2 py-1  tracking-wide text-center capitalize transition-colors duration-300 transform rounded-[14px] hover:bg-[#F2ECE7] hover:text-[#000000dd] focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80"
                        onClick={() => handleDelete(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <p
                      className={`font-bold text-white-700 text-[22px] leading-7 mb-1 text-justify ${
                        task.state === "finalizada" ? "line-through" : ""
                      }`}
                    >
                      {task.title}
                    </p>
                  </div>

                  <div className="flex flex-row">
                    <p
                      className={`text-[17px] font-bold text-[#0FB478] ${
                        task.state === "finalizada" ? "line-through" : ""
                      }`}
                    >
                      Categoria: {task.category}
                    </p>
                  </div>
                  <div className="flex flex-row">
                    <p
                      className={`text-[15px] font-bold text-[#0FB478] ${
                        task.state === "finalizada" ? "line-through" : ""
                      }`}
                    >
                      Estado: {task.state}
                    </p>
                  </div>
                  <div className="mt-4 h-auto">
                    <p
                      className={`text-[#F2ECE7] font-[15px] text-justify ${
                        task.state === "finalizada" ? "line-through" : ""
                      }`}
                    >
                      {task.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TasksLists;
