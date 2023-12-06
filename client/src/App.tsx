import { NavLink, Outlet } from "react-router-dom";
import "./App.css";
import { useAppSelector } from "./store";
import { Avatar, Dropdown, Navbar, Footer } from "flowbite-react";
import { FaGithub, FaReact, FaNodeJs, FaGit, FaDocker } from "react-icons/fa6";
import { SiNestjs, SiTypescript, SiMysql } from "react-icons/si";
import { useProfilePicture } from "./types/user";

function App() {
  const login = useAppSelector((state) => state.login);
  useProfilePicture();

  return (
    <>
      <div className="app">
        <Navbar fluid className="nav">
          <Navbar.Brand href="/">
            <img
              src="https://cdn.pixabay.com/photo/2016/10/10/01/49/hook-1727484_960_720.png"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite React Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Cool Todo
            </span>
          </Navbar.Brand>

          <div className="flex md:order-2 gap-2">
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  img={login?.profilePicture?.url || ""}
                  size="sm"
                  rounded
                />
              }
            >
              {login ? (
                <>
                  <Dropdown.Header>
                    <span className="block text-sm">
                      {login?.info.fullName}
                    </span>
                    <span className="block truncate text-sm font-medium">
                      {login?.info?.email}
                    </span>
                  </Dropdown.Header>

                  <Dropdown.Item color="warning">
                    <NavLink to={"/logout"} className={"pl-2"}>
                      Logout
                    </NavLink>
                  </Dropdown.Item>
                </>
              ) : (
                <>
                  <Dropdown.Item>
                    <NavLink to={"/login"} className={"pl-2"}>
                      Login
                    </NavLink>
                  </Dropdown.Item>

                  <Dropdown.Item>
                    <NavLink to={"/signup"} className={"pl-2"}>
                      Signup
                    </NavLink>
                  </Dropdown.Item>
                </>
              )}
            </Dropdown>
            <Navbar.Toggle />
          </div>

          <Navbar.Collapse>
            <NavLink to={"/"} className={"pl-2"}>
              Home
            </NavLink>
            <NavLink to={"/about"} className={"pl-2"}>
              About
            </NavLink>
            {!login ? (
              <></>
            ) : (
              <>
                <NavLink to={"/profile"} className={"pl-2"}>
                  Profile
                </NavLink>
              </>
            )}
          </Navbar.Collapse>
        </Navbar>

        <main className="text-left my-4">
          <Outlet />
        </main>

        <div className="footer">
          <Footer container>
            <Footer.Copyright
              href="mailto:pro.se.ahmad.raza.1@gmail.com"
              by="Ahmad Raza<pro.se.ahmad.raza.1@gmail.com>"
              year={2022}
            />

            <Footer.LinkGroup className="py-4 sm:py-0 flex flex-row items-center gap-2">
              <SiTypescript />
              <FaReact />
              <FaNodeJs />
              <SiNestjs />
              <SiMysql />
              <FaDocker />
              <FaGit />
              <a
                href="https://github.com/ar124official2019/cool-todo"
                target="_blank"
              >
                <FaGithub />
              </a>
            </Footer.LinkGroup>
          </Footer>
        </div>
      </div>
    </>
  );
}

export default App;
