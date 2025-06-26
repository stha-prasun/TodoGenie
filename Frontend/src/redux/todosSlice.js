import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "user",
  initialState: {
    todos: [],
  },
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
  },
});

export const { setTodos } = todosSlice.actions;
export default todosSlice.reducer;
