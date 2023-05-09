import { createSlice } from "@reduxjs/toolkit";
import { getItem } from "../../utils/localStorage";

const initialState = getItem("tasks") || [
  {
    id: "c0d3978a-ee7f-11ed-a05b-0242ac120003",
    title: "Task 1",
    category: "deportes",
    description: "Task 1 description",
    state: "pendiente",
  },  
  {
    id: "c906c7e2-ee7f-11ed-a05b-0242ac120003",
    title: "Task 2",
    category: "salud",
    description: "Task 2 description",
    state: "finalizado",  
  },
];

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask:(state, action)=>{
      state.push(action.payload)
  },
    decrement: (state) => {
      state.value -= 1;
    },
    deleteTask: (state, action)=>{
      const taskFound = state.find(task => task.id ===action.payload)
      if(taskFound){
          state.splice(state.indexOf(taskFound), 1);
      }
  }
  },
});
export const { addTask, deleteTask} = taskSlice.actions;
export default taskSlice.reducer;
