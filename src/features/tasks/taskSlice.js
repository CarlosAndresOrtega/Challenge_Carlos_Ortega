import { createSlice } from "@reduxjs/toolkit";
import { getItem } from "../../utils/localStorage";

/**
 * @typedef {Object} task
 * @property {String} id id de la tarea
 * @property {String} category categoria de la tarea
 * @property {String} description descripcion de la tarea
 * @property {String} state Estado de la tarea puede ser pendiente o finalizada
 *
 */

/**
 * @type {Array<task>} Arreglo con las diferentes tareas creadas al inicio o tomadas del localStorage
 *
 */
const initialState = getItem("tasks") || [
  {
    id: "c0d3978a-ee7f-11ed-a05b-0242ac120003",
    title: "Entrenar en la noche",
    category: "deportes",
    description: "Ir a entrenar futbol en la noche con el equipo",
    state: "pendiente",
  },
  {
    id: "c906c7e2-ee7f-11ed-a05b-0242ac120003",
    title: "Pedir cita medica",
    category: "salud",
    description: "Pedir cita con el endocrino, para control",
    state: "finalizada",
  },
  {
    id: "0ecfa278-ef5a-11ed-a05b-0242ac120003",
    title: "Completar pull request",
    category: "trabajo",
    description: "Subir al repositorio las diferentes tareas que tengo",
    state: "finalizada",
  },
];

/**
 * Slice utilizado para la modificación de las tareas en el estado.
 * @property {String} name nombre del arreglo que contiene las tareas
 * @property {Array<taks>} initialState Arreglo con las diferentes tareas creadas al inicio o tomadas del localStorage
 */
export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    /**
     * Agrega una nueva tarea al estado de tareas
     * @param {*} state Arreglo que contiene las diferentes tareas
     * @param {*} action Objeto que contiene los datos de la nueva tarea
     */
    addTask: (state, action) => {
      state.push(action.payload);
    },

    /**
     * Identifica la tarea que sera editada en sus diferentes campos
     * @param {*} state Arreglo que contiene las diferentes tareas
     * @param {*} action Objeto que contiene los datos de la tarea a editar
     */
    editTask: (state, action) => {
      const { id, title, description, category } = action.payload;

      const foundTask = state.find((task) => task.id === id);

      if (foundTask) {
        foundTask.title = title;
        foundTask.category = category;
        foundTask.description = description;
        foundTask.state = action.payload.state;
      }
    },
    /**
     * Identifica la tarea que sera actualizada en su campo de estado como finalizada o pendiente
     * @param {*} state Arreglo que contiene las diferentes tareas
     * @param {*} action Objeto con el id y estado para actualizar
     */
    updateState: (state, action) => {
      const { id } = action.payload;
      const foundTask = state.find((task) => task.id === id);

      if (foundTask) {
        foundTask.state = action.payload.state;
      }
    },

    /**
     * Elimina una tarea del estado
     * @param {*} state Arreglo que contiene las diferentes tareas
     * @param {*} action Objeto con el id de la tarea a eliminar
     */

    deleteTask: (state, action) => {
      const taskFound = state.find((task) => task.id === action.payload);
      if (taskFound) {
        state.splice(state.indexOf(taskFound), 1);
      }
    },
  },
});
export const { addTask, deleteTask, editTask, updateState } = taskSlice.actions;
export default taskSlice.reducer;
