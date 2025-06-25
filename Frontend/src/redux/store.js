import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";

const store = configureStore({
  reducer: {
    User: userSlice,
  },
});

export default store;
