import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import { updateState } from "../features/tasks/taskSlice";

function TasksLists() {
  const taskState = useSelector((state) => state.tasks);

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

  const HandleCheck =(id)=>{
    if(document.getElementById(id).checked){
      dispatch(updateState({id,state:"pendiente"}));
    }else{
      dispatch(updateState({id,state:"finalizado"}));
    }
  }

  return (
    <>
      <Modal id={id} isOpen={isOpen} onClose={closeModal}>
        <div className="sm:flex sm:items-start">
          <div className="mt-3 text-center sm:mt-0 sm:text-left">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Confirmación
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                ¿Esta seguro de eliminar esta tarea?
              </p>
            </div>
          </div>
        </div>
      </Modal>

      <div className="w-4/6 flex flex-col gap-5">
        <header className="bg-neutral-800 flex justify-between items-center p-4 rounded-md">
          <h1>Cantidad de Tareas: {taskState.length}</h1>
          <Link
            to="/create-task"
            className="bg-indigo-600 px-2 py-1 rounded-sm text-sm "
          >
            Create task
          </Link>
        </header>

        <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
          {taskState.map((task) => (
            <div key={task.id} className="bg-neutral-800 p-4 rounded-md text-white ">
              <div className="max-w-md mx-auto">
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <input  className="hidden" type="checkbox" id={task.id} checked={task.state === "finalizado"}   />
                    <label
                      className="flex flex-col h-full  rounded cursor-pointer"
                      htmlFor={task.id}
                      onClick={()=>HandleCheck(task.id)}
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
                    <p className={`font-bold text-white-700 text-[22px] leading-7 mb-1 text-justify ${task.state === 'finalizado'? 'line-through':''}`}>
                      {task.title}
                    </p>
                  </div>

                  <div className="flex flex-row">
                    <p className={`text-[17px] font-bold text-[#0FB478] ${task.state === 'finalizado'? 'line-through':''}`}>
                      Categoria: {task.category}
                    </p>
                  </div>
                  <div className="mt-4 h-auto">
                    <p className={`text-[#F2ECE7] font-[15px] text-justify ${task.state === 'finalizado'? 'line-through':''}`}>
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
