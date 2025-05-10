import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_URL } from '../config/urls.config';
import { getToken } from '../utils/auth.utils';
import api from '../utils/axiosInstance.util';
import {
  IRegisterUserPayload,
  IRegisterUserResult,
} from '../model/Users.model';

export const getLoginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ token: string }> => {
  const user = await api.post(API_URL.auth.login, {
    email,
    password,
  });
  return user.data;
};

export const logoutUser = async (): Promise<{ message: string }> => {
  const token = await getToken();
  const user = await api.get(API_URL.auth.logout, {
    headers: { Authorization: `Bearer ${token}` },
  });
  await AsyncStorage.removeItem('userToken');
  return user.data;
};

export const registerUser = async ({
  name,
  email,
  password,
}: IRegisterUserPayload): Promise<IRegisterUserResult> => {
  const user = await api.post(API_URL.auth.register(), {
    name,
    email,
    password,
  });
  return user.data;
};

export const getUserProfile = async (): Promise<{ user: any }> => {
  const token = await getToken();
  const user = await api.get(API_URL.auth.profile(), {
    headers: { Authorization: `Bearer ${token}` },
  });
  return user.data;
};

export const validateToken = async (
  token: string
): Promise<{ valid: boolean }> => {
  try {
    const response = await api.get(API_URL.auth.user, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error validating token:', error);
    throw error;
  }
};
