import { API_URL } from '../config/urls.config';
import { User } from '../model/Users.model';
import api from '../utils/axiosInstance.util';

export const getUsers = async (): Promise<User[]> => {
  const result = await api.get<{ users: User[] }>(API_URL.users.get());

  return result.data.users;
};

export const createUsers = async (): Promise<User[]> => {
  const result = await api.post<{ users: User[] }>(API_URL.users.post());

  return result.data.users;
};
