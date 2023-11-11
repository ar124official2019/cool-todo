import { createSlice } from "@reduxjs/toolkit";
import { Login } from "../types/user";

let loginData: Login | null = null;
try {
  loginData = JSON.parse(localStorage.getItem(`loginData`) || "null");
} catch {}

interface SetLogin {
  (state: Login, action: { type: string; payload: Login }): void;
}

const loginSlice = createSlice<
  Login,
  {
    setLogin: SetLogin;
  },
  "login"
>({
  name: "login",

  initialState: loginData,

  reducers: {
    setLogin: (state: Login, action: { payload: Login }) => {
      state = action.payload;
      return state;
    },
  },
});

export const loginReducer = loginSlice.reducer;
export const { setLogin } = loginSlice.actions;
