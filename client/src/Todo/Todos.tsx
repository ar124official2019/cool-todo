import { useEffect } from "react"
import { useHttpGet } from "../types/http";
import { useAppDispatch, useAppSelector } from "../store";
import { setTodoPage } from "../store/todo.slice";
import { TodoView } from "./TodoView";

export function Todos() {
  const todoData = useAppSelector((state)=>state.todo);
  const dispatch = useAppDispatch();
  const httpGet = useHttpGet();

  const load = (page: number, limit: number) => {
    httpGet(`/todo?page=${page}&limit=${limit}`).then((res) =>
      dispatch(
        setTodoPage({
          todos: res?.data?.rows,
          page,
          limit,
          total: res?.data?.count,
        })
      )
    );
  }

  useEffect(() => {
    if (!todoData?.page) {
      load(1, 5);
    }
  }, [todoData])

  return (
    <>
      <div className="flex flex-col">
        {todoData.todos.map((i) => (
          <TodoView {...i}></TodoView>
        ))}

        <div className="p-4 flex flex-row items-center justify-center">
          {todoData.previous ? (
            <button
              className="bg-blue-700 rounded rounded-lg text-xs p-2 px-4 text-white"
              onClick={() => load(todoData.previous, todoData.limit)}
            >
              &lt; Previous
            </button>
          ) : (
            <></>
          )}

          <div className="text-xs mx-2">
            <span>Page No<b>&nbsp;{todoData.page}</b></span>
            <span>&nbsp;-&nbsp;</span>
            <span>Per Page<b>&nbsp;{todoData.limit}</b></span>
            <span>&nbsp;-&nbsp;</span>
            <span>Total<b>&nbsp;{todoData.total}</b></span>
          </div>

          {todoData.next ? (
            <button
              className="bg-blue-700 rounded rounded-lg text-xs p-2 px-4 text-white"
              onClick={() => load(todoData.next, todoData.limit)}
            >
              Next &gt;
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}