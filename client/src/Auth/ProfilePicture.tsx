import { useAppSelector } from "../store";
import { FaUser } from "react-icons/fa6";
import { useProfilePicture } from "../types/user";

export function ProfilePicture({
  size,
  hidden,
}: {
  size?: number;
  hidden?: boolean;
}) {
  const loginData = useAppSelector((state) => state.login);
  useProfilePicture();

  return loginData?.profilePicture?.url && !hidden ? (
    <img
      alt="Bonnie image"
      src={
        loginData?.profilePicture?.url ||
        "https://cdn.pixabay.com/photo/2023/11/26/20/58/horse-8414296_960_720.jpg"
      }
      className={`mb-3 w-${size} h-${size} rounded-full shadow-lg`}
    />
  ) : hidden ? (
    <></>
  ) : (
    <>
      <FaUser
        className={`mb-3 w-${size} h-${size} rounded-full shadow-md`}
        color="gray"
      />
    </>
  );
}
