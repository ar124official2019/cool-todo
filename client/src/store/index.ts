import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./login.slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authReducer } from "./auth.slice";
import { todoReducer } from "./todo.slice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    auth: authReducer,
    todo: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
