import { config } from "../config/config";
import { setProfilePicture } from "../store/login.slice";
import { AppDispatch, RootState, useAppDispatch } from "../store";
import { useEffect } from "react";

export interface User {
  id: string;
  fullName: string;
  email: string;
  profilePicture?: string;
}

export interface UserProfilePicture {
  loading?: boolean;
  url: string;
}

export type Login = {
  token: string;
  info: User;
  profilePicture: UserProfilePicture;
} | null;

export const fetchProfilePicture = async (login: Login): Promise<string> => {
  try {
    const response = await fetch(`${config.API_BASE}/auth/profile-picture`, {
      method: "GET",
      headers: {
        authorization: `bearer ${login?.token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const blob = await response.blob();
    const dataUrl = URL.createObjectURL(blob);

    return dataUrl;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch {
    throw new Error(`Failed to fetch profile picture.`);
  }
};

export const fetchProfilePictureThunk = (
  dispatch: AppDispatch,
  getState: { (): RootState }
) => {
  const state = getState();
  if (state.login?.profilePicture?.loading || state?.login?.profilePicture?.url)
    return;

  dispatch(setProfilePicture({ loading: true, url: "" }));
  fetchProfilePicture(state?.login)
    .then((res) => dispatch(setProfilePicture({ loading: false, url: res })))
    .catch(() => dispatch(setProfilePicture({ loading: false, url: "" })));
};

export const useProfilePicture = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProfilePictureThunk);
  }, [dispatch]);
};
