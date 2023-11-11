import { useAppSelector } from "../store";

export function Profile() {
  const loginData = useAppSelector((state) => state.login);

  return (
    <>
      <div className="rounded rounded-lg bg-blue-300 p-4">
        <h1 className="font-bold text-center uppercase text-2xl">Profile</h1>

        <div>
          <b className="font-bold">Full Name:</b>
          <span className="pl-2">{loginData?.info?.fullName}</span>
        </div>

        <div>
          <b className="font-bold">Email Address:</b>
          <span className="pl-2">{loginData?.info?.email}</span>
        </div>
      </div>
    </>
  );
}
