import { useEffect } from "react";
import { useAppDispatch } from "../store";
import { setLogin } from "../store/login.slice";
import { useNavigate } from "react-router-dom";

export function Logout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    localStorage.removeItem(`loginData`);
    dispatch(setLogin(null));
    navigate("/");
  });

  return <></>;
}
