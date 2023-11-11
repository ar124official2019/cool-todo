import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store";
import { HttpResponse, useHttpPost } from "../types/http";

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

  const login = () => {
    setErr(null);

    httpPost("/todo", JSON.stringify(form), {
      "CONTENT-TYPE": "application/json",
    }).then((res: HttpResponse) => {
      if (res.error) {
        return setErr(res);
      }

      navigate("/todo");
    });
  };

  return (
    <div className="form w-25">
      <div className="my-1">
        <b>Todo</b>
        <div>
          <input
            type="text"
            placeholder="What to do?"
            className="w-full p-4 rounded rounded-lg"
            value={form.todo}
            onChange={(e) => updateForm("todo", e.target.value)}
          />
        </div>
      </div>

      <div className="my-1">
        <b>Description</b>
        <div>
          <textarea
            placeholder="More description..."
            className="w-full p-4 rounded rounded-lg"
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

      <div className="my-1">
        <button
          className="bg-blue-700 rounded rounded-lg p-2 px-4 text-white"
          onClick={login}
        >
          Add
        </button>
      </div>
    </div>
  );
}

interface CreateTodoForm {
  todo: string;
  description: string;
}
