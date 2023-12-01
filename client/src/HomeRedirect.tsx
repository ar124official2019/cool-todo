import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function HomeRedirect() {
  const navigate = useNavigate();

  useEffect(() => navigate("/todo"));

  return <Outlet />;
}
