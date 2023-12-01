import { useCallback, useEffect } from "react";
import { useHttpGet } from "../types/http";
import { useAppDispatch, useAppSelector } from "../store";
import { setTodoPage } from "../store/todo.slice";
import { TodoView } from "./TodoView";
import { Pagination, Card, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export function Todos() {
  const navigate = useNavigate();
  const todoData = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();
  const httpGet = useHttpGet();

  const load = useCallback(
    (page: number, limit: number) => {
      httpGet(`/todo?page=${page}&limit=${limit}`).then((res) =>
        dispatch(
          setTodoPage({
            todos: res?.data?.rows,
            page,
            limit,
            total: res?.data?.count,
          }),
        ),
      );
    },
    [dispatch, httpGet],
  );

  const onPageChange = (page: number) => {
    console.log(page);
    load(page, 8);
  };

  useEffect(() => {
    if (!todoData?.page) {
      load(1, 8);
    }

    console.log(todoData);
  }, [todoData, load]);

  return (
    <>
      <div>
        {!todoData?.todos?.length ? (
          <div className="flex flex-row items-center justify-center">
            <Card className="max-w-sm">
              <div className="flex flex-col items-center justify-center p-10 mx-10">
                <img
                  alt="Bonnie image"
                  src="https://cdn.pixabay.com/photo/2016/10/10/01/49/hook-1727484_960_720.png"
                  className="mb-3 w-[96px] h-[96px] rounded-full shadow-lg"
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  Everything Done
                </h5>
                <span className="text-sm text-center text-gray-500 dark:text-gray-400">
                  You caught everything, already done.
                </span>
              </div>

              <Button color="light" type="submit" href="/todo/new">
                Add a new Todo
              </Button>
            </Card>
          </div>
        ) : (
          <div className="p-4 flex flex-row flex-wrap items-center justify-between">
            <Button
              pill
              color="light"
              size={"sm"}
              onClick={() => navigate("/todo/new")}
              title="Add a new todo"
            >
              New Todo
            </Button>

            {todoData?.todos?.length && (
              <div className="p-4 flex flex-row items-center justify-center">
                <div className="flex overflow-x-auto sm:justify-center">
                  <Pagination
                    currentPage={todoData.page || 1}
                    totalPages={Math.ceil(todoData.total / todoData.limit) || 1}
                    onPageChange={onPageChange}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        <div className="p-4 flex flex-row flex-wrap">
          {todoData.todos.map((i) => (
            <div className="p-1 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col-reverse">
              <TodoView {...i}></TodoView>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
