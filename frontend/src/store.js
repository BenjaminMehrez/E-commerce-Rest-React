import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./redux/reducers/index";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
