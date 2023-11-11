import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../config/config";
import { HttpResponse } from "../types/http";
import { useAppDispatch } from "../store";
import { setSignupSuccess } from "../store/auth.slice";

export function Signup() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [err, setErr] = useState<HttpResponse | null>(null);
  const [form, setForm] = useState<SignupForm>({
    fullName: "",
    email: "",
    password: "",
  });

  const updateForm = (key: string, value: string) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const signup = () => {
    fetch(`${config.API_BASE}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
      },
    })
      .then(async (res) => {
        if (!res.ok) throw res;
        setErr(null);
        dispatch(setSignupSuccess(true));
        navigate("/login");
      })
      .catch(async (err) => {
        const data = await err.json();
        setErr(data);
      });
  };

  return (
    <>
      <div className="rounded rounded-lg bg-blue-300 p-4">
        <h1 className="font-bold text-center uppercase text-2xl">Signup</h1>

        <div className="form w-25">
          <div className="my-1">
            <b>Full Name</b>
            <div>
              <input
                type="text"
                placeholder="Your full name!"
                className="w-full p-4 rounded rounded-lg"
                value={form.fullName}
                onChange={(e) => updateForm("fullName", e.target.value)}
              />
            </div>
          </div>

          <div className="my-1">
            <b>Email</b>
            <div>
              <input
                type="email"
                placeholder="Your email!"
                className="w-full p-4 rounded rounded-lg"
                value={form.email}
                onChange={(e) => updateForm("email", e.target.value)}
              />
            </div>
          </div>

          <div className="my-1">
            <b>Password</b>
            <div>
              <input
                type="password"
                placeholder="New password!"
                className="w-full p-4 rounded rounded-lg"
                value={form.password}
                onChange={(e) => updateForm("password", e.target.value)}
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
              onClick={signup}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

interface SignupForm {
  fullName: string;
  email: string;
  password: string;
}
