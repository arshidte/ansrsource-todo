import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { fetchUserReducer, registerUserReducer } from "./slices/userSlice";
import { addTodoReducer } from "./slices/todoSlice";

const store = configureStore({
  reducer: {
    fetchUserReducer,
    registerUserReducer,
    addTodoReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// Custom hooks for dispatch and selector
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
