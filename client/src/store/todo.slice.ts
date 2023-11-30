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

interface TodoAction<Payloadtype> {
  (state: TodoState, action: { type: string; payload: Payloadtype }): void;
}

type AddTodo = TodoAction<ITodo>;
type UpdateTodo = TodoAction<ITodo>;
type SelectTodo = TodoAction<ITodo>;
type DeleteTodo = TodoAction<number>;

export const todoSlice = createSlice<
  TodoState,
  {
    setTodoPage: SetTodoPage;
    selectTodo: SelectTodo;
    addTodo: AddTodo;
    updateTodo: UpdateTodo;
    deleteTodo: DeleteTodo
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

    updateTodo: (state, action) => ({
      ...state,
      todos: [action.payload].concat(
        state.todos.filter((i) => i.id != action.payload.id)
      ),
    }),

    deleteTodo: (state, action) => ({
      ...state,
      todos: state.todos.filter((i) => i.id != action.payload),
    }),
  },
});

export const { setTodoPage, selectTodo, addTodo, updateTodo, deleteTodo } =
  todoSlice.actions;
export const todoReducer = todoSlice.reducer;
