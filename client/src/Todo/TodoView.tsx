import { useNavigate } from "react-router-dom";
import { ITodo } from "../types/todo";
import { useAppDispatch } from "../store";
import { deleteTodo, selectTodo, updateTodo } from "../store/todo.slice";
import { useHttpDelete, useHttpPatch } from "../types/http";
import { AppModal } from "../Components/Modal";
import { useEffect, useRef, useState } from "react";
import { Button, Card, Badge } from "flowbite-react";
import { HiCheck, HiX, HiPencil, HiTrash } from "react-icons/hi";

export function TodoView(todo: ITodo) {
  const [toggleDelete, setToggleDelete] = useState(false);
  const httpDelete = useHttpDelete();
  const httpPatch = useHttpPatch();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [mouseOver, setMouseOver] = useState(false);
  const ref = useRef(null);

  const onEdit = () => {
    dispatch(selectTodo(todo));
    navigate(`/todo/edit/${todo.id}`);
  }

  const onDelete = async () => {
    await httpDelete(`/todo/${todo.id}`);
    dispatch(deleteTodo(todo.id));
  };

  const onDone =async (done: boolean) => {
    await httpPatch(`/todo/${todo.id}`, JSON.stringify({ ...todo, done }), {
      "content-type": "application/json",
    });

    dispatch(updateTodo({ ...todo, done }));
  }

  useEffect(() => {
    if (ref?.current) {
      const current = ref.current as HTMLDivElement;
      
      current.addEventListener("mouseover", () => {
        setMouseOver(true);
      });

      current.addEventListener("mouseleave", () => {
        setMouseOver(false);
      });
    }
  }, [ref]);

  return (
    <div className="w-full h-full" ref={ref}>
      <Card className="w-full h-full relative">
        {mouseOver && (
          <div className="actions absolute top-4 right-4 flex flex-row gap-2">
            {todo.done ? (
              <Badge
                className="cursor-pointer hover:bg-warning-300"
                icon={HiX}
                color="warning"
                title="Mark as Undone"
                onClick={() => onDone(false)}
              />
            ) : (
              <Badge
                className="cursor-pointer hover:bg-slate-300"
                icon={HiCheck}
                color="light"
                title="Mark as done"
                onClick={() => onDone(true)}
              />
            )}

            <Badge
              className="cursor-pointer hover:bg-slate-300"
              icon={HiPencil}
              color="light"
              onClick={onEdit}
            />

            <Badge
              className="cursor-pointer hover:bg-slate-300"
              icon={HiTrash}
              color="red"
              onClick={() => setToggleDelete(true)}
            />
          </div>
        )}

        <b>{todo.todo}</b>
        <p className="flex-1">{todo.description || "No Description"}</p>

        <div className="text-xs flex flex-col-reverse md:flex-row-reverse md:items-center gap-1">
          <i>{new Date(todo.updatedAt).toLocaleString()}</i>

          {todo.done && (
            <Badge
              className="hover:bg-green-700 hover:text-white"
              icon={HiCheck}
              color="success"
              title="This todo has been done!"
            />
          )}
        </div>

        <AppModal
          title="Delete Todo"
          visible={toggleDelete}
          onClose={() => setToggleDelete(false)}
          actions={[
            <Button color="warning" onClick={() => onDelete()}>
              Delete
            </Button>,
          ]}
        >
          <p>
            Do you really want to delete todo{" "}
            <b>
              <i>"{todo.todo}"</i>
            </b>
            ?
          </p>
        </AppModal>
      </Card>
    </div>
  );
}
