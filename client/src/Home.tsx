import { useEffect } from "react";
import { useAppSelector } from "./store";
import { Outlet } from "react-router-dom";

export function Home() {
  const login = useAppSelector((state) => state.login);
  
  useEffect(() => () => {
    if (!login) {
      window.location.href = "/login";
    }
  });

  return <Outlet />;
}
