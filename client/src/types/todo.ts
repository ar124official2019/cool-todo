export interface TodoState {
  todos: ITodos;
  page: number;
  limit: number;
  total: number;
  next: number;
  previous: number;
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
