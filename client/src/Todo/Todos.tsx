import { useEffect, useState } from "react"
import { useHttpGet } from "../types/http";
import { useAppDispatch, useAppSelector } from "../store";
import { setTodos } from "../store/todo.slice";
import { TodoView } from "./TodoView";

export function Todos() {
  const [active, setActive] = useState(0);
  const todos = useAppSelector((state)=>state.todo.todos);
  const dispatch = useAppDispatch();
  const httpGet = useHttpGet();

  useEffect(() => {
    if (!active) {
      setActive(1);
      httpGet("/todo").then((res) => dispatch(setTodos(res?.data || [])));
    }
  }, [active])

  return (
    <>
      <div className="flex flex-col">
        {todos.map((i) => (
          <TodoView {...i}></TodoView>
        ))}
      </div>
    </>
  );
}