import React, { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "./Modal";
import { Link } from "react-router-dom";

function TasksLists() {
  const taskState = useSelector((state) => state.tasks);

  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");

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
                      <Link to={`/edit-task/${task.id}`}>Edit</Link>
                    </button>
                    <button
                      className="bg-red-500 px-2 py-1 text-xs rounded-md"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <h3 className="card-title">Categoria: {task.category}</h3>
                <h3 className="card-title">Estado: {task.state}</h3>
              </header>
              <p>{task.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TasksLists;
