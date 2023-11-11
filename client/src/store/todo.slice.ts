import { createSlice } from "@reduxjs/toolkit";
import { ITodo, ITodos, TodoState } from "../types/todo";

interface SetTodoPage {
  (
    state: TodoState,
    action: {
      type: string;
      payload: { todos: ITodos; page: number; limit: number; total: number };
    }
  ): TodoState | undefined;
}

interface SelectTodo {
  (state: TodoState, action: { type: string; payload: ITodo }): void;
}

type AddTodo = SelectTodo;

export const todoSlice = createSlice<
  TodoState,
  {
    setTodoPage: SetTodoPage;
    selectTodo: SelectTodo;
    addTodo: AddTodo;
  },
  "todo"
>({
  name: "todo",

  initialState: {
    todos: [],
    page: 0,
    limit: 0,
    total: 0,
    next: 0,
    previous: 0,
    selected: null,
  },

  reducers: {
    setTodoPage: (state, action) => {
      const next =
        action.payload.page * action.payload.limit < action.payload.total
          ? action.payload.page + 1
          : 0;

      const previous = action.payload.page > 1 ? action.payload.page - 1 : 0;

      return {
        ...state,
        next,
        previous,
        ...action.payload,
      };
    },

    selectTodo: (state, action) => ({
      ...state,
      selected: action.payload || [],
    }),

    addTodo: (state, action) => ({
      ...state,
      todos: [action.payload, ...state.todos],
    }),
  },
});

export const { setTodoPage, selectTodo, addTodo } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
