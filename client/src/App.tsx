import { NavLink, Outlet } from "react-router-dom";
import "./App.css";
import { useAppSelector } from "./store";

function App() {
  const login = useAppSelector((state) => state.login);

  return (
    <>
      <header className="flex flex-row bg-blue-500 text-white p-4">
        <h1 className="text-bold uppercase font-bold text-xl">Todo App</h1>

        <nav className="ml-4 flex-1 flex flex-row">
          <NavLink to={"/"} className={"pl-2"}>
            Home
          </NavLink>
          <NavLink to={"/about"} className={"pl-2"}>
            About
          </NavLink>
          {!login ? (
            <>
              <NavLink to={"/login"} className={"pl-2"}>
                Login
              </NavLink>

              <NavLink to={"/signup"} className={"pl-2"}>
                Signup
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to={"/profile"} className={"pl-2"}>
                Profile
              </NavLink>

              <NavLink to={"/logout"} className={"pl-2"}>
                Logout
              </NavLink>
            </>
          )}
        </nav>

        <div>
          <span>{ login?.info?.fullName }</span>
        </div>
      </header>

      <main className="text-left my-4">
        <Outlet />
      </main>
    </>
  );
}

export default App;
