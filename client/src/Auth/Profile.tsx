import { Button, Card } from "flowbite-react";
import { ProfilePicture } from "./ProfilePicture";
import { useAppSelector } from "../store";

export function Component() {
  const loginData = useAppSelector((state) => state.login);
  
  return (
    <div className="flex flex-row items-center justify-center">
      <Card className="max-w-sm">
        <div className="flex flex-col items-center px-10 py-6">

          <ProfilePicture size={20} />

          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {loginData?.info.fullName}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {loginData?.info.email}
          </span>
        </div>

        <Button color="gray" type="submit" href="/logout">
          Edit Profile
        </Button>

        <Button color="warning" type="submit" href="/logout">
          Logout
        </Button>
      </Card>
    </div>
  );
}
