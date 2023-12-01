import { useNavigate } from "react-router-dom";
import { ITodo } from "../types/todo";
import { useAppDispatch } from "../store";
import { deleteTodo } from "../store/todo.slice";
import { useHttpDelete } from "../types/http";
import { AppModal } from "../Components/Modal";
import { useState } from "react";
import { Button, Card } from "flowbite-react";

export function TodoView(todo: ITodo) {
  const [toggleDelete, setToggleDelete] = useState(false);
  const httpDelete = useHttpDelete();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onDelete = async () => {
    await httpDelete(`/todo/${todo.id}`);
    dispatch(deleteTodo(todo.id));
  };

  return (
    <Card className="w-full h-full">
      <b>{todo.todo}</b>
      <p className="flex-1">{todo.description || "No Description"}</p>

      <div className="text-xs flex flex-col-reverse md:flex-row-reverse md:items-center">
        <i>{new Date(todo.updatedAt).toLocaleString()}</i>

        <Button
          size="small"
          color="warning"
          pill
          className="px-4 mr-1 mb-1"
          onClick={() => setToggleDelete(true)}
        >
          Delete
        </Button>

        <Button
          size="small"
          color="light"
          pill
          className="px-4 mr-1 mb-1"
          onClick={() => navigate(`/todo/edit/${todo.id}`)}
        >
          Edit
        </Button>
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
  );
}
