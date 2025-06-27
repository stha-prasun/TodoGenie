import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todo: [],
  },
  reducers: {
    setTodo: (state, action) => {
      state.todo = action.payload;
    },
  },
});

export const { setTodo } = todoSlice.actions;
export default todoSlice.reducer;
