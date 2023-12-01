import { useState } from "react";
import * as Yup from "yup";
import { HttpResponse, useHttpPost } from "../types/http";
import { useAppDispatch } from "../store";
import { useNavigate } from "react-router-dom";
import { setSignupSuccess } from "../store/auth.slice";
import { useFormik } from "formik";
import { Card, Label, TextInput, Button } from "flowbite-react";

const signupFormSchema = Yup.object({
  fullName: Yup.string()
    .max(256)
    .required("Please enter full name."),
  email: Yup.string()
    .max(256)
    .email("Please enter a valid email.")
    .required("Please enter email."),
  password: Yup.string()
    .min(8, "Password must be at-least 8 characters long.")
    .required("Please enter password."),
});

export function Signup() {
  const httpPost = useHttpPost();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [err, setErr] = useState<HttpResponse | null>(null);

  const form = useFormik({
    initialValues: { fullName: "", email: "", password: "" },
    validationSchema: signupFormSchema,
    onSubmit: signup,
  });

  function signup() {
    dispatch(setSignupSuccess(false));
    setErr(null);
    httpPost(`/auth/signup`, JSON.stringify(form.values), {
      "content-type": "application/json",
    })
      .then(async () => {
        dispatch(setSignupSuccess(true));
        navigate("/login");
      })
      .catch(async (err) => {
        const data = await err.json();
        setErr(data);
      });
  }

  return (
    <>
      <div className="flex flex-row items-center justify-center">
        <Card className="w-full md:w-[400px]">
          <form className="flex flex-col gap-4" onSubmit={form.handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label value="Your full name" />
              </div>

              <TextInput
                type="text"
                placeholder="Enter your full name"
                {...form.getFieldProps("fullName")}
              />

              {form.touched.fullName && form.errors.fullName && (
                <div>
                  <span className="px-2 text-red-600 text-xs">
                    {form.errors.fullName}
                  </span>
                </div>
              )}
            </div>

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
              Signup
            </Button>

            <Button
              type="button"
              onClick={() => navigate("/login")}
              color="light"
            >
              Login, instead
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
}
