export interface User {
  id: string;
  fullName: string;
  email: string;
}

export type Login = {
  token: string;
  info: User;
} | null;
