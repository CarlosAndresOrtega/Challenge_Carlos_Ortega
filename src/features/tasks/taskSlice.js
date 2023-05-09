import { createSlice } from '@reduxjs/toolkit'
import { getItem } from '../../utils/localStorage';

const initialState = [
    {
        id: "1",
        title: "Task 1",
        description: "Task 1 description",
        completed: false,
    },
    {
        id: "3",
        title: "Task 2",
        description: "Task 2 description",
        completed: false,
    }
] || getItem('tasks');

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
      increment: (state) => {
        state.value += 1    
      },
      decrement: (state) => {
        state.value -= 1
      },
      incrementByAmount: (state, action) => {
        state.value += action.payload
      },
    },
  })

  export default taskSlice.reducer;