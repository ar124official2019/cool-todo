import { useNavigate } from "react-router-dom";
import { ITodo } from "../types/todo";

export function TodoView(todo: ITodo) {
  const navigate = useNavigate();

  return (
    <div className="p-2 bg-blue-100 mb-1 cursor-pointer hover:bg-blue-200">
      <b>{todo.todo}</b>
      <p>{todo.description || "No Description"}</p>

      <div className="text-xs flex flex-row-reverse items-center">
        <i>{new Date(todo.updatedAt).toLocaleString()}</i>

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