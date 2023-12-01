import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store";
import { HttpResponse, useHttpPost } from "../types/http";
import { addTodo } from "../store/todo.slice";
import { Card, Label, TextInput, Textarea, Button } from "flowbite-react";

export function NewTodo() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const httpPost = useHttpPost();
  const [err, setErr] = useState<HttpResponse | null>(null);
  const [form, setForm] = useState<CreateTodoForm>({
    todo: "",
    description: "",
  });

  const updateForm = (key: string, value: string) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const onAddTodoSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErr(null);

    httpPost("/todo", JSON.stringify(form), {
      "CONTENT-TYPE": "application/json",
    }).then((res: HttpResponse) => {
      if (res.error) {
        return setErr(res);
      }

      dispatch(addTodo(res.data));
      navigate("/todo");
    });
  };

  return (
    <div className="flex flex-row items-center justify-center">
      <Card className="w-full md:w-[400px]">
        <form className="flex flex-col gap-4" onSubmit={onAddTodoSubmit}>
          <div className="my-1">
            <Label value="Todo" />

            <div>
              <TextInput
                type="text"
                placeholder="What to do?"
                value={form.todo}
                onChange={(e) => updateForm("todo", e.target.value)}
              />
            </div>
          </div>

          <div className="my-1">
            <Label value="Description" />
            <div>
              <Textarea
                rows={4}
                placeholder="Detailed description"
                value={form.description}
                onChange={(e) => updateForm("description", e.target.value)}
              />
            </div>
          </div>

          {err && (
            <div>
              <span className="text-red-700 text-xs">{err?.message}</span>
            </div>
          )}

          <Button color="light" type="submit">
            Add
          </Button>
        </form>
      </Card>
    </div>
  );
}

interface CreateTodoForm {
  todo: string;
  description: string;
}
