import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage.tsx";
import { About } from "./Pages/About.tsx";
import { store } from "./store/index.ts";
import { Provider } from "react-redux";
import { Home } from "./Home.tsx";
import { Signup } from "./Auth/Signup.tsx";
import { Todo } from "./Todo/Todo.tsx";
import { Logout } from "./Auth/Logout.tsx";
import { Todos } from "./Todo/Todos.tsx";
import { NewTodo } from "./Todo/NewTodo.tsx";
import { HomeRedirect } from "./HomeRedirect.tsx";
import { UpdateTodo } from "./Todo/UpdateTodo.tsx";
import { LoginGoogle } from "./Auth/LoginGoogle.tsx";
import { Login } from "./Auth/Login.tsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/profile",
        lazy: () => import("./Auth/Profile.tsx"),
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/login-google",
        element: <LoginGoogle />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },

      {
        path: "/todo",
        element: <Home />,
        children: [
          {
            path: "",
            element: <Todo />,
            children: [
              {
                path: "",
                element: <Todos />,
              },
              {
                path: "new",
                element: <NewTodo />,
              },
              {
                path: "edit/:id",
                element: <NewTodo />,
              },
            ],
          },
        ],
      },

      {
        path: "/",
        element: <HomeRedirect />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  </React.StrictMode>,
);
