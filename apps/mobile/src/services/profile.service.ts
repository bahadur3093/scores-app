import { API_URL } from '../config/urls.config';
import { User } from '../model/Users.model';
import api from '../utils/axiosInstance.util';

export const getUser = async (): Promise<User> => {
  const result = await api.get<User>(API_URL.auth.user);
  return result.data;
};

