import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../features/tasks/taskSlice";
import { Link, useNavigate, useParams } from "react-router-dom";

function TasksForm() {
  const [Task, setTask] = useState({
    title: "",
    description: "",
    category: "",
    state: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const tasks = useSelector((state) => state.tasks);

  const handleChange = (e) => {
    setTask({
      ...Task,
      [e.target.name]: e.target.value,
    });
  };

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

  useEffect(() => {
    if (params.id) {
      const foundTask = tasks.find((task) => task.id === params.id);
      setTask(foundTask);
      
      if(foundTask.state==="pendiente"){
        document.getElementById("pendiente").checked=true;

      }else if(foundTask.state==="finalizada"){
        document.getElementById("finalizada").checked=true;
      }
    }
  }, [params.id, tasks]);

  return (
    <>
      <form
        id={"myform"}
        onSubmit={handleSubmit}
        className="bg-zinc-800 w-4/6 p-4"
      >
        <label htmlFor="title" className="block text-xs font-bold mb-2">
          Tarea:{" "}
        </label>
        <input
          type="text"
          name="title"
          value={Task.title}
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
          value={Task.category}
          placeholder="category"
          className="w-full p-2 rounded-md bg-zinc-600 mb-2"
          onChange={handleChange}
          required
        />

        <label htmlFor="description" className="block text-xs font-bold mb-2">
          Descripcion:
        </label>
        <textarea
          name="description"
          value={Task.description}
          placeholder="description"
          className="w-full p-2 rounded-md bg-zinc-600 mb-2"
          onChange={handleChange}
          required
        ></textarea>

        <div className="flex gap-x-2 items-center mb-2">
          <label className="block text-xs font-bold ">Estado: </label>

          <label className="block text-xs font-bold">Pendiente: </label>
          <input
            id={"pendiente"}
            type="radio"
            name="state"
            value="pendiente"
            required
            onChange={handleChange}
          />

          <label className="block text-xs font-bold ">Fianlizada: </label>
          <input
            id={"finalizada"}
            type="radio"
            name="state"
            value="finalizada"
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-x-5">
          <button className="bg-indigo-600 px-2 py-1">Guardar</button>
          <button className="bg-indigo-600 px-2 py-1">
            <Link to="/">Atras</Link>
          </button>
        </div>
      </form>
    </>
  );
}
export default TasksForm;
