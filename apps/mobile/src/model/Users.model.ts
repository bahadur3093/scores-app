export interface User {
  name: string;
  email: string;
  createdAt: string;
  role: string;
}

export interface IRegisterUserPayload {
  name: string;
  email: string;
  password: string;
}

export interface IRegisterUserResult {
  success: boolean;
  message: string;
  token: string;
  alreadyRegistered: boolean;
}
