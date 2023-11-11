import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage.tsx";
import { About } from "./Pages/About.tsx";
import { store } from "./store/index.ts";
import { Provider } from "react-redux";
import { Login } from "./Auth/Login.tsx";
import { Home } from "./Home.tsx";
import { Signup } from "./Auth/Signup.tsx";
import { Profile } from "./Auth/Profile.tsx";
import { Todo } from "./Todo/Todo.tsx";
import { Logout } from "./Auth/Logout.tsx";
import { Todos } from "./Todo/Todos.tsx";

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
        element: <Profile />,
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
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/",
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
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  </React.StrictMode>
);
