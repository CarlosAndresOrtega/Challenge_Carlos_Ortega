import React, { useState } from "react";
import { v4 as uuid } from 'uuid';
import { useDispatch } from "react-redux";
import { addTask } from '../features/tasks/taskSlice'

function TasksForm() {

  const [Task, setTask] = useState({
    title: "",
    description: "",
    category: "",
    state: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask({ ...Task, id: uuid() }))
  };
  const handleChange = (e) => {
    setTask({
      ...Task,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-zinc-800 w-4/6 p-4">
        <label htmlFor="title" className="block text-xs font-bold mb-2">
          Tarea:{" "}
        </label>
        <input
          type="text"
          name="title"
          placeholder="title"
          className="w-full p-2 rounded-md bg-zinc-600 mb-2"
          onChange={handleChange}
          required
        />

        <label htmlFor="category" className="block text-xs font-bold mb-2">
          Categoria:{" "}
        </label>
        <input
          type="text"
          name="category"
          placeholder="category"
          className="w-full p-2 rounded-md bg-zinc-600 mb-2"
          onChange={handleChange}
          required
        />

        <label htmlFor="description" className="block text-xs font-bold mb-2">
          Descripcion:{" "}
        </label>
        <textarea
          name="description"
          placeholder="description"
          className="w-full p-2 rounded-md bg-zinc-600 mb-2"
          onChange={handleChange}
          required
        ></textarea>

        <div className="flex gap-x-2 items-center mb-2">
          <label className="block text-xs font-bold ">Estado:{" "} </label>

          <label className="block text-xs font-bold">Pendiente:{" "}</label>
          <input type="radio" name="state" value="pendiente"  required onChange={handleChange}/>

          <label className="block text-xs font-bold ">Fianlizada:{" "}</label>
          <input type="radio" name="state" value="finalizada" onChange={handleChange} />

        </div>

        <button className="bg-indigo-600 px-2 py-1">Guardar</button>
      </form>
    </>
  );
}
export default TasksForm;
