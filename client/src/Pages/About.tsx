import { Button, Card } from "flowbite-react";
import { AppRow } from "../Components/Row";
import { FaGithub, FaReact, FaNodeJs, FaDocker, FaGit } from "react-icons/fa6";
import { SiNestjs, SiTypescript, SiMysql } from "react-icons/si";

export function About() {
  return (
    <div className="flex flex-row items-center justify-center">
      <Card className="max-w-sm">
        <div className="flex flex-col items-center p-10 mx-10">
          <img
            alt="Bonnie image"
            src="https://cdn.pixabay.com/photo/2016/10/10/01/49/hook-1727484_960_720.png"
            className="mb-3 w-[96px] h-[96px] rounded-full shadow-lg"
          />

          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            Cool Todo
          </h5>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            A very cool todo app!
          </span>

          <hr className="w-full my-4"></hr>

          <div
            className="flex flex-row items-center gap-4"
            title="Made with TypeScript, React.js, Node.js, Nest.js and MySQL"
          >
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
          </div>
        </div>
      </Card>
    </div>
  );
}
