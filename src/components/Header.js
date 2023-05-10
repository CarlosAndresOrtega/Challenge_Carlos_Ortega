import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header() {
  const taskState = useSelector((state) => state.tasks);
  return (
    <header className="bg-neutral-800 text-[#F2ECE7] font-[15px] flex justify-between items-center p-4 rounded-md">
      <h1 className="font-bold text-white-700 text-[22px] leading-7 mb-1 text-justify">
        Cantidad de Tareas: {taskState.length}
      </h1>
      <Link
        to="/create-task"
        className="bg-indigo-500 font-medium px-2 py-1  tracking-wide text-center capitalize transition-colors duration-300 transform rounded-[14px] hover:bg-[#F2ECE7] hover:text-[#000000dd] focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80"
      >
        Create task
      </Link>
    </header>
  );
}

export default Header;
