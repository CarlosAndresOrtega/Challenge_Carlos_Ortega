import { createSlice } from "@reduxjs/toolkit";
import { getItem } from "../../utils/localStorage";

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
    id:"0ecfa278-ef5a-11ed-a05b-0242ac120003",
    title: "Completar pull request",
    category: "trabajo",
    description: "Subir al repositorio las diferentes tareas que tengo",
    state: "finalizada",
  }
];

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
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
    updateState: (state, action) => {
      const { id } = action.payload;
      const foundTask = state.find((task) => task.id === id);

      if (foundTask) {
        foundTask.state = action.payload.state;
      }
    },
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
