import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { config } from "../config/config";
import { HttpResponse } from "../types/http";
import { useAppDispatch } from "../store";
import { setSignupSuccess } from "../store/auth.slice";
import { useFormik } from "formik";

const signupFormSchema = Yup.object({
  fullName: Yup.string()
    .max(256, "Name should not be longer than 256 characters.")
    .required("Please enter full name."),
  email: Yup.string()
    .max(256, "Email should not be longer than 256 characters.")
    .email("Please enter a valid email.")
    .required("Please enter email."),
  password: Yup.string()
    .min(8, "Password must be at-least 8 characters long.")
    .max(16, "Password must be at-most 16 characters long.")
    .required("Please enter password."),
});

type SignupForm = Yup.InferType<typeof signupFormSchema>;

export function Signup() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [err, setErr] = useState<HttpResponse | null>(null);

  const form = useFormik<SignupForm>({
    initialValues: { fullName: "", email: "", password: "" },
    validationSchema: signupFormSchema,
    onSubmit: signup,
  });

  function signup() {
    fetch(`${config.API_BASE}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(form.values),
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

        <form onSubmit={form.handleSubmit} className="form w-25">
          <div className="my-1">
            <b>Full Name</b>
            <div>
              <input
                type="text"
                placeholder="Your full name!"
                className="w-full p-4 rounded rounded-lg"
                {...form.getFieldProps("fullName")}
              />
            </div>

            {form.touched.fullName && form.errors.fullName && (
              <div>
                <span className="px-2 text-red-600">
                  {form.errors.fullName}
                </span>
              </div>
            )}
          </div>

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
                placeholder="New password!"
                className="w-full p-4 rounded rounded-lg"
                {...form.getFieldProps("password")}
              />
            </div>

            {form.touched.password && form.errors.password && (
              <div>
                <span className="px-2 text-red-600">
                  {form.errors.password}
                </span>
              </div>
            )}
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
              type="submit"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

