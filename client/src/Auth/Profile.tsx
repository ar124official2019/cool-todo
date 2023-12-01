import { useAppSelector } from "../store";
import { Button, Card } from "flowbite-react";

export function Component() {
  const loginData = useAppSelector((state) => state.login);

  return (
    <div className="flex flex-row items-center justify-center">
      <Card className="max-w-sm">
        <div className="flex flex-col items-center p-10 mx-10">
          <img
            alt="Bonnie image"
            src="https://cdn.pixabay.com/photo/2023/11/26/20/58/horse-8414296_960_720.jpg"
            className="mb-3 w-[96px] h-[96px] rounded-full shadow-lg"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {loginData?.info.fullName}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {loginData?.info.email}
          </span>
        </div>

        <Button color="warning" type="submit" href="/logout">
          Logout
        </Button>

        <Button color="light" type="submit" href="/">
          Back to Home 🏠
        </Button>
      </Card>
    </div>
  );
}
