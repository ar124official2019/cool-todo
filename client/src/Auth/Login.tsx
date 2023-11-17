import { useEffect, useState } from "react";
import * as Yup  from "yup";
import { HttpResponse } from "../types/http";
import { config } from "../config/config";
import { useAppDispatch, useAppSelector } from "../store";
import { setLogin } from "../store/login.slice";
import { useNavigate } from "react-router-dom";
import { setSignupSuccess } from "../store/auth.slice";
import { useFormik } from "formik";

const loginFormSchema = Yup.object({
  email: Yup.string()
    .max(256)
    .email("Please enter a valid email.")
    .required("Please enter email."),
  password: Yup.string()
    .min(8, "Password must be at-least 8 characters long.")
    .required("Please enter password."),
});

type LoginForm = Yup.InferType<typeof loginFormSchema>;

export function Login() {
  const navigate = useNavigate();
  const loginData = useAppSelector((state) => state.login);
  const signupSuccess = useAppSelector((state) => state.auth.signupSuccess);
  const dispatch = useAppDispatch();
  const [err, setErr] = useState<HttpResponse | null>(null);

  const form = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginFormSchema,
    onSubmit: login,
  });

  function login() {
    dispatch(setSignupSuccess(false));
    setErr(null);
    fetch(`${config.API_BASE}/auth/login`, {
      method: "POST",
      body: JSON.stringify(form.values),
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

  const loginWithGoogle = () => {
    window.location.href = "http://localhost:3000/api/v1/auth/login/google";
  };

  useEffect(() => {
    if (loginData) navigate("/");
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

        <form className="form w-25" onSubmit={form.handleSubmit}>
          <div className="my-1">
            <b>Email</b>
            <div>
              <input
                type="email"
                placeholder="Your email!"
                className="w-full p-4 rounded rounded-lg"
                {...form.getFieldProps("email")}
              />
            </div>

            {form.touched.email && form.errors.email && (
              <div>
                <span className="px-2 text-red-600">{form.errors.email}</span>
              </div>
            )}
          </div>

          <div className="my-1">
            <b>Password</b>
            <div>
              <input
                type="password"
                placeholder="Your Password!"
                className="w-full p-4 rounded rounded-lg"
                {...form.getFieldProps("password")}
              />
            </div>

            {form.touched.password && form.errors.password && (
              <div>
                <span className="px-2 text-red-600">{form.errors.password}</span>
              </div>
            )}
          </div>

          {err && (
            <div>
              <span className="text-red-700 text-xs">{err?.message}</span>
            </div>
          )}

          <div className="flex flex-row my-2">
            <button
              className="bg-blue-700 rounded rounded-lg p-2 px-4 text-white"
              onClick={login}
            >
              Login
            </button>

            <div className="mx-1"></div>

            <button
              className="bg-blue-700 rounded rounded-lg p-2 px-4 text-white"
              onClick={loginWithGoogle}
              type="submit"
            >
              Login with Google
            </button>
          </div>

          <span
            className="px-2 text-blue-500 hover:text-blue-700 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Create an account, instead
          </span>
        </form>
      </div>
    </>
  );
}
