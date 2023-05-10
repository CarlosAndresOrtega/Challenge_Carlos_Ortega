import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask } from "../features/tasks/taskSlice";

function Modal({ id, isOpen, onClose, children }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask(id));
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                {/* {children} */}
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
              </div>
              <div className="bg-gray-50 flex gap-x-2 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="bg-indigo-500 font-medium px-2 py-1  tracking-wide text-center capitalize transition-colors duration-300 transform rounded-[14px] hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-80"
                  onClick={onClose}
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  className="bg-red-500 font-medium px-2 py-1  tracking-wide text-center capitalize transition-colors duration-300 transform rounded-[14px] hover:bg-red-700 hover:text-white focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80"
                  onClick={handleDelete}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
