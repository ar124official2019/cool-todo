import { createSlice } from "@reduxjs/toolkit";
import { ITodo, ITodos, TodoState } from "../types/todo";

interface SetTodos {
  (state: TodoState, action: { type: string; payload: ITodos }): void;
}

interface SelectTodo {
  (state: TodoState, action: { type: string; payload: ITodo }): void;
}

export const todoSlice = createSlice<
  TodoState,
  {
    setTodos: SetTodos;
    selectTodo: SelectTodo;
  },
  "todo"
>({
  name: "todo",

  initialState: {
    todos: [],
    selected: null,
  },

  reducers: {
    setTodos: (state, action) => ({ ...state, todos: action.payload || [] }),
    selectTodo: (state, action) => ({
      ...state,
      selected: action.payload || [],
    }),
  },
});

export const { setTodos, selectTodo } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;