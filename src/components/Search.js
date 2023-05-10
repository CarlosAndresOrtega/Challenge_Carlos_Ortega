import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

function Search({ setfiltered }) {
  const tasks = useSelector((state) => state.tasks);
  const refSelect = useRef();
  const [typeSearch, setTypeSearch] = useState("title");

  const handleChange = (e) => {
    const searchOptions = {
      title: "title",
      category: "category",
      state: "state",
    };

    const filter = tasks.filter((task) => {
      const searchProperty = searchOptions[typeSearch];
      const searchValue = e.target.value.toUpperCase();

      if (task[searchProperty].toUpperCase().includes(searchValue)) {
        return task;
      }
    });

    setfiltered(filter);
  };

  useEffect(() => {
    const searchTypeSelect = refSelect.current;

    searchTypeSelect.addEventListener("change", function () {
      const selectedValue = searchTypeSelect.value;
      setTypeSearch(selectedValue);
    });
  }, [typeSearch]);

  return (
    <>
      <div className=" bg-neutral-800 text-[#F2ECE7] font-[15px] flex justify-between items-center p-4 rounded-md">
        <input
          onChange={handleChange}
          className="list-group-item bg-neutral-700 text-zinc-400
            text-lg w-3/6  p-2 rounded-md"
          type="text"
          placeholder={
            typeSearch === "state"
              ? "Buscar con palabras 'Pendiente' o 'Finalizada'"
              : typeSearch === "category"
              ? "Buscar por categoria"
              : typeSearch === "title"
              ? "Buscar por titulo"
              : "Buscar"
          }
        ></input>

        <select
          defaultValue={"title"}
          id="countries"
          ref={refSelect}
          className="bg-neutral-700 border border-gray-300 text-white text-sm rounded-lg
           focus:ring-blue-500 focus:border-blue-500 block w-1/6 p-2.5 dark:bg-gray-700
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
            dark:focus:border-blue-500"
        >
          <option value="title">Título</option>
          <option value="category">Categoria</option>
          <option value="state">Estado</option>
        </select>
      </div>
    </>
  );
}
export default Search;
