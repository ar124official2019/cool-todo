import { useEffect, useState } from "react";
import * as Yup from "yup";
import { HttpResponse } from "../types/http";
import { config } from "../config/config";
import { useAppDispatch, useAppSelector } from "../store";
import { setLogin } from "../store/login.slice";
import { useNavigate } from "react-router-dom";
import { setSignupSuccess } from "../store/auth.slice";
import { useFormik } from "formik";
import { Card, Label, TextInput, Button } from "flowbite-react";

const loginFormSchema = Yup.object({
  email: Yup.string()
    .max(256)
    .email("Please enter a valid email.")
    .required("Please enter email."),
  password: Yup.string()
    .min(8, "Password must be at-least 8 characters long.")
    .required("Please enter password."),
});

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
  }

  const loginWithGoogle = () => {
    window.location.href = "http://localhost:3000/api/v1/auth/login/google";
  };

  useEffect(() => {
    if (loginData) navigate("/");
  }, [loginData, navigate]);

  return (
    <>
      <div className="flex flex-row items-center justify-center">
        <Card className="w-full md:w-[400px]">
          {signupSuccess && (
            <span className="text-green-700 text-xs">
              You have successfully signed up. Login to continue!
            </span>
          )}

          <form className="flex flex-col gap-4" onSubmit={form.handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label value="Your email" />
              </div>

              <TextInput
                type="Email"
                placeholder="Enter email"
                {...form.getFieldProps("email")}
              />

              {form.touched.email && form.errors.email && (
                <div>
                  <span className="px-2 text-red-600 text-xs">
                    {form.errors.email}
                  </span>
                </div>
              )}
            </div>

            <div>
              <div className="mb-2 block">
                <Label value="Your password" />
              </div>
              <TextInput
                type="password"
                placeholder="Enter password"
                {...form.getFieldProps("password")}
              />

              {form.touched.password && form.errors.password && (
                <div>
                  <span className="px-2 text-red-600 text-xs">
                    {form.errors.password}
                  </span>
                </div>
              )}
            </div>

            {err && (
              <span className="text-green-700 text-xs">
                {err?.message || "Something went wrong!"}
              </span>
            )}

            <Button type="submit" color="light">
              Login
            </Button>

            <Button type="button" onClick={loginWithGoogle} color="light">
              Login with Google
            </Button>

            <Button
              type="button"
              onClick={() => navigate("/signup")}
              color="light"
            >
              Signup, instead
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
}
