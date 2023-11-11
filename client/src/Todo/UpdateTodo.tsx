import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HttpResponse, useHttpGet, useHttpPatch } from "../types/http";
import { useAppDispatch } from "../store";
import { updateTodo } from "../store/todo.slice";

export function UpdateTodo() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const httpGet = useHttpGet();
  const httpPatch = useHttpPatch();
  const [err, setErr] = useState<HttpResponse | null>(null);
  const [form, setForm] = useState<UpdateTodoForm>({
    id: 0,
    todo: "",
    description: "",
  });

  const updateForm = (key: string, value: string) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const update = () => {
    setErr(null);

    httpPatch(`/todo/${id}`, JSON.stringify(form), {
      "CONTENT-TYPE": "application/json",
    }).then((res: HttpResponse) => {
      if (res.error) {
        return setErr(res);
      }

      dispatch(updateTodo(res?.data));
      navigate("/todo");
    });
  };


  useEffect(() => {
    if (!form.id) {
      httpGet(`/todo/${id}`).then((res: HttpResponse) => {
        if (res.error) return setErr(err);
        setForm({
          id,
          ...res.data,
        });
      })
    }
  })

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
          onClick={update}
        >
          Update
        </button>
      </div>
    </div>
  );
}

interface UpdateTodoForm {
  id: number;
  todo: string;
  description: string;
}
