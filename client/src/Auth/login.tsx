import { useEffect, useState } from "react";
import { HttpResponse } from "../types/http";
import { config } from "../config/config";
import { useAppDispatch, useAppSelector } from "../store";
import { setLogin } from "../store/login.slice";
import { useNavigate } from "react-router-dom";
import { setSignupSuccess } from "../store/auth.slice";

export function Login() {
  const navigate = useNavigate();
  const loginData = useAppSelector((state) => state.login);
  const signupSuccess = useAppSelector((state) => state.auth.signupSuccess);
  const dispatch = useAppDispatch();
  const [err, setErr] = useState<HttpResponse | null>(null);
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const updateForm = (key: string, value: string) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const login = () => {
    dispatch(setSignupSuccess(false));
    setErr(null);
    fetch(`${config.API_BASE}/auth/login`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
      },
    })
      .then(async (res) => {
        if (!res.ok) throw res;
        setErr(null);
        const loginResponse = await res.json();
        localStorage.setItem(`loginData`, JSON.stringify(loginResponse?.data));
        dispatch(setLogin(loginResponse.data));
      })
      .catch(async (err) => {
        const data = await err.json();
        setErr(data);
      });
  };

  useEffect(() => {
    if (loginData) navigate("/");
    console.log(loginData);
  }, [loginData]);

  return (
    <>
      <div className="rounded rounded-lg bg-blue-300 p-4">
        <h1 className="font-bold text-center uppercase text-2xl">Login</h1>

        {signupSuccess && (
          <div>
            <span className="text-green-700 text-xs">
              You have successfully signed up. Login to continue!
            </span>
          </div>
        )}

        <div className="form w-25">
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
                placeholder="Your Password!"
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
              onClick={login}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

interface LoginForm {
  email: string;
  password: string;
}
