import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types/auth";

interface SetSignupSuccess {
  (state: AuthState, action: { type: string; payload: boolean }): void;
}

const authSlice = createSlice<
  AuthState,
  {
    setSignupSuccess: SetSignupSuccess;
  },
  "auth"
>({
  name: "auth",

  initialState: {
    signupSuccess: false,
  },

  reducers: {
    setSignupSuccess: (state: AuthState, action: { payload: boolean }) => {
      state.signupSuccess = action.payload;
      return state;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setSignupSuccess } = authSlice.actions;
