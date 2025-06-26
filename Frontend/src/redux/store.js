import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
import todosSlice from "./todosSlice.js";

const store = configureStore({
  reducer: {
    User: userSlice,
    Todos: todosSlice,
  },
});

export default store;
