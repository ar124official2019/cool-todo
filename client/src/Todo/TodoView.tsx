import { useNavigate } from "react-router-dom";
import { ITodo } from "../types/todo";
import { useAppDispatch } from "../store";
import { deleteTodo } from "../store/todo.slice";
import { useHttpDelete } from "../types/http";

export function TodoView(todo: ITodo) {
  const httpDelete = useHttpDelete();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onDelete = async (id: number) => {
    await httpDelete(`/todo/${id}`);
    dispatch(deleteTodo(id));
  }

  return (
    <div className="p-2 bg-blue-100 mb-1 cursor-pointer hover:bg-blue-200">
      <b>{todo.todo}</b>
      <pre>{todo.description || "No Description"}</pre>

      <div className="text-xs flex flex-row-reverse items-center">
        <i>{new Date(todo.updatedAt).toLocaleString()}</i>

        <span
          className="px-2 cursor-pointer text-red-500 hover:text-red-700"
          onClick={() => onDelete(todo.id)}
        >
          Delete
        </span>

        <span
          className="px-2 cursor-pointer text-blue-500 hover:text-blue-700"
          onClick={() => navigate(`/todo/edit/${todo.id}`)}
        >
          Edit
        </span>
      </div>
    </div>
  );
}