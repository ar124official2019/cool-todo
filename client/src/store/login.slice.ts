import { createSlice } from "@reduxjs/toolkit";
import { Login, UserProfilePicture } from "../types/user";

let loginData: Login | null = null;
try {
  loginData = JSON.parse(localStorage.getItem(`loginData`) || "null");
} catch {
  // do nothing
}

const loginSlice = createSlice<
  Login,
  {
    setLogin: SetLogin;
    setProfilePicture: (state: Login, action: { payload: UserProfilePicture }) => Login;
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

    setProfilePicture: (state: Login, action: { payload: UserProfilePicture }) => {
      if (state)
        state.profilePicture = action.payload || { loading: false, url: "" };
      
      return state;
    },
  },
});

export const loginReducer = loginSlice.reducer;
export const { setLogin, setProfilePicture } = loginSlice.actions;

interface SetLogin {
  (state: Login, action: { type: string; payload: Login }): void;
}
