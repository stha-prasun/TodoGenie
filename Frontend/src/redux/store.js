import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
import todosSlice from "./todosSlice.js";
import todoSlice from "./todoSlice.js";

const store = configureStore({
  reducer: {
    User: userSlice,
    Todos: todosSlice,
    Todo: todoSlice,
  },
});

export default store;
