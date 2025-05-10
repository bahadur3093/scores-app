import { User } from "./Users.model";

export interface IAuthUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface IAuthUserResponse {
  user: User;
  token: string;
}
