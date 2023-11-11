import { useEffect, useState } from "react";
import { HttpResponse } from "../types/http";
import { config } from "../config/config";
import { useAppDispatch, useAppSelector } from "../store";
import { setLogin } from "../store/login.slice";
import { useNavigate } from "react-router-dom";
import { setSignupSuccess } from "../store/auth.slice";

export function LoginGoogle() {
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
    fetch(`${config.API_BASE}/auth/login/google/persist`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) throw res;
        if (res.redirected) return (window.location.href = res.url);
        
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
    else login();
  }, [loginData]);

  return (
    <>
      <div className="rounded rounded-lg bg-blue-300 p-4">
        <h1 className="font-bold text-center uppercase text-2xl">Login</h1>
        <p className="text-xs text-center">Please wait while we login you...</p>
      </div>
    </>
  );
}

interface LoginForm {
  email: string;
  password: string;
}
