export interface TodoState {
  todos: ITodos;
  selected: ITodo | null;
}

export interface ITodo {
  id: number;
  todo: string;
  description: string;
  createAt: string;
  updatedAt: string;
}

export type ITodos = ITodo[];
