import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../features/tasks/taskSlice";
import { Link, useNavigate, useParams } from "react-router-dom";

/**
 *
 * @returns Componente que el formulario utilizado apra actualizar o crear una tarea.
 */

function TasksForm() {
  /**
   * Hook que permite saber que tipo de busqueda se realizara
   * @hook
   * @name useState
   * @function
   *
   * @param {Object} - Objeto vacio que posee los cambios de la tarea
   * @returns {object} información para actualizar en la tarea
   */
  const [Task, setTask] = useState({
    title: "",
    description: "",
    category: "",
    state: "",
  });

  /**
   * Funcion para modificar datos en el redux
   */
  const dispatch = useDispatch();

  /**
   * Funcion para el cambio de rutas en la navegacion del react router
   */
  const navigate = useNavigate();

  /**
   * Datos ingresado a la url
   */
  const params = useParams();

  /**
   * Variable que obtiene las tareas desde redux
   * @type {Array}
   */
  const tasks = useSelector((state) => state.tasks);

  /**
   * Guarda la informacion ingresada por el usuraio para ser utilizada despues
   * @param {Event} e contiene la informacion ingresada por el usuario 
   */
  const handleChange = (e) => {
    setTask({
      ...Task,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Formulario que actualiza o crea una nueva tarea, y redirige al listado de tareas
   * @param {Event} e evento de click, que evita que la pagina se recarge
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (params.id) {
      dispatch(editTask(Task));
    } else {
      dispatch(addTask({ ...Task, id: uuid() }));
    }
    document.getElementById("myform").reset();
    navigate("/");
  };

  /**
   * Valida el estado de la tarea, para marcar en el formulario si esta pendiente o finalizada, cuando se decide actualizar una tarea.
   */
  useEffect(() => {
    if (params.id) {
      const foundTask = tasks.find((task) => task.id === params.id);
      setTask(foundTask);

      if (foundTask.state === "pendiente") {
        document.getElementById("pendiente").checked = true;
      } else if (foundTask.state === "finalizada") {
        document.getElementById("finalizada").checked = true;
      }
    }
  }, [params.id, tasks]);

  return (
    <>
      <form
        id={"myform"}
        onSubmit={handleSubmit}
        className="bg-zinc-800 w-4/6 p-4 max-md:w-full"
      >
        <label
          htmlFor="title"
          className="block text-[#F2ECE7] font-[15px] text-justify mb-2"
        >
          Tarea:{" "}
        </label>
        <input
          type="text"
          name="title"
          value={Task.title}
          placeholder="Título"
          className="w-full bg-neutral-600 text-[#F2ECE7] font-[15px] flex justify-between items-center p-4 rounded-md"
          onChange={handleChange}
          required
        />

        <label
          htmlFor="category"
          className="block text-[#F2ECE7] font-[15px] text-justify mb-2"
        >
          Categoria:{" "}
        </label>
        <input
          type="text"
          name="category"
          value={Task.category}
          placeholder="Categoria"
          className="w-full bg-neutral-600 text-[#F2ECE7] font-[15px] flex justify-between items-center p-4 rounded-md"
          onChange={handleChange}
          required
        />

        <label
          htmlFor="description"
          className="block text-[#F2ECE7] font-[15px] text-justify mb-2"
        >
          Descripción:
        </label>
        <textarea
          name="description"
          value={Task.description}
          placeholder="Descripción"
          className="w-full bg-neutral-600 text-[#F2ECE7] font-[15px] flex justify-between items-center p-4 rounded-md"
          onChange={handleChange}
          required
        ></textarea>

        <div className="flex gap-x-2 items-center mb-2">
          <label className="block text-[#F2ECE7] font-[15px] text-justify ">
            Estado:{" "}
          </label>

          <label className="block text-[#F2ECE7] font-[15px] text-justify">
            Pendiente:{" "}
          </label>
          <input
            id={"pendiente"}
            type="radio"
            name="state"
            value="pendiente"
            required
            onChange={handleChange}
          />

          <label className="block text-[#F2ECE7] font-[15px] text-justify ">
            Finalizada:{" "}
          </label>
          <input
            id={"finalizada"}
            type="radio"
            name="state"
            value="finalizada"
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-x-5">
          <button className="bg-indigo-500 font-medium px-2 py-1  tracking-wide text-center capitalize transition-colors duration-300 transform rounded-[14px] hover:bg-[#F2ECE7] hover:text-[#000000dd] focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80">
            Guardar
          </button>
          <div className="bg-indigo-500 font-medium px-2 py-1  tracking-wide text-center capitalize transition-colors duration-300 transform rounded-[14px] hover:bg-[#F2ECE7] hover:text-[#000000dd] focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80">
            <Link to="/">Atras</Link>
          </div>
        </div>
      </form>
    </>
  );
}
export default TasksForm;
